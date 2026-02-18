"""
FastAPI application entry point for Care Plan Generator.
Simple, clean implementation with health check and care plan generation endpoints.
"""
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
from typing import AsyncGenerator

from app.config import settings
from app.models import PatientInput, CarePlanOutput, HealthCheckResponse
from app.services.care_plan_service import generate_care_plan
from app.utils.logger import setup_logger, log_api_request, log_api_response, log_error

# Setup logger
logger = setup_logger(__name__, settings.log_level)


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """Application lifespan manager for startup and shutdown events."""
    # Startup
    logger.info(f"Starting {settings.app_name} v{settings.app_version}")
    logger.info(f"Environment: {settings.environment}")
    logger.info(f"CORS Origins: {settings.cors_origins_list}")
    yield
    # Shutdown
    logger.info("Shutting down application")


# Create FastAPI application
app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="AI-powered care plan generator for skilled nursing facilities",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def log_requests(request: Request, call_next):
    """Middleware to log all HTTP requests and responses."""
    # Log request
    log_api_request(
        logger,
        request.method,
        request.url.path,
        client=request.client.host if request.client else "unknown",
    )

    # Process request
    try:
        response = await call_next(request)
        # Log response
        log_api_response(logger, request.method, request.url.path, response.status_code)
        return response
    except Exception as e:
        log_error(logger, e, context=f"{request.method} {request.url.path}")
        raise


@app.get("/", tags=["Root"])
async def root() -> dict[str, str]:
    """Root endpoint - API information."""
    return {
        "name": settings.app_name,
        "version": settings.app_version,
        "status": "running",
        "docs": "/docs",
    }


@app.get("/health", response_model=HealthCheckResponse, tags=["Health"])
async def health_check() -> HealthCheckResponse:
    """
    Health check endpoint to verify service is running.

    Returns:
        HealthCheckResponse with status, environment, and version
    """
    logger.debug("Health check requested")
    return HealthCheckResponse(
        status="healthy", environment=settings.environment, version=settings.app_version
    )


@app.post(
    "/generate-care-plan",
    response_model=CarePlanOutput,
    tags=["Care Plan"],
    summary="Generate AI-powered care plan",
    description="Submit patient data and receive a comprehensive AI-generated nursing care plan",
)
async def create_care_plan(patient: PatientInput) -> CarePlanOutput:
    """
    Generate a comprehensive care plan for a patient using AI.

    Args:
        patient: Patient information including demographics, vitals, medications, etc.

    Returns:
        CarePlanOutput with generated HTML care plan

    Raises:
        HTTPException: If care plan generation fails
    """
    try:
        logger.info(f"Care plan generation requested for: {patient.name}")

        # Generate care plan
        care_plan = await generate_care_plan(patient)

        logger.info(f"Care plan generated successfully for: {patient.name}")
        return care_plan

    except ValueError as e:
        # Validation errors
        logger.warning(f"Validation error for patient {patient.name}: {str(e)}")
        raise HTTPException(status_code=422, detail=str(e))

    except Exception as e:
        # Unexpected errors
        log_error(logger, e, context=f"Care plan generation for {patient.name}")
        raise HTTPException(
            status_code=500,
            detail="An error occurred while generating the care plan. Please try again.",
        )


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    """Global exception handler for unhandled exceptions."""
    log_error(logger, exc, context=f"{request.method} {request.url.path}")
    return JSONResponse(
        status_code=500,
        content={"detail": "An internal server error occurred. Please contact support."},
    )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.is_development,
        log_level=settings.log_level.lower(),
    )
