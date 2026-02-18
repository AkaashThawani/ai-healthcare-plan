"""
Pydantic models for patient input validation and care plan output structure.
"""

from datetime import date

from pydantic import BaseModel, Field, field_validator


class Medication(BaseModel):
    """Medication information."""

    name: str = Field(..., description="Medication name")
    dosage: str = Field(..., description="Dosage (e.g., '10mg', '500mg')")
    frequency: str = Field(..., description="Frequency (e.g., 'BID', 'TID', 'QD')")


class PatientInput(BaseModel):
    """Patient information input for care plan generation."""

    # Basic Information
    name: str = Field(..., min_length=1, description="Patient full name")
    age: int = Field(..., ge=0, le=120, description="Patient age")
    gender: str = Field(..., description="Patient gender (Male/Female/Other)")
    admission_date: date = Field(..., description="Date of admission")
    facility: str = Field(..., min_length=1, description="Facility name")

    # Medical History
    primary_diagnosis: str = Field(..., min_length=1, description="Primary diagnosis")
    comorbidities: list[str] = Field(
        default_factory=list, description="List of comorbidities"
    )

    # Current Vitals
    blood_pressure: str = Field(..., description="Blood pressure (e.g., '120/80')")
    heart_rate: int = Field(..., ge=20, le=300, description="Heart rate in BPM")
    temperature: float = Field(
        ..., ge=90.0, le=110.0, description="Temperature in Fahrenheit"
    )
    oxygen_saturation: int = Field(
        ..., ge=0, le=100, description="O2 saturation percentage"
    )
    pain_level: int = Field(..., ge=0, le=10, description="Pain level (0-10 scale)")

    # Medications & Allergies
    current_medications: list[Medication] = Field(
        default_factory=list, description="List of current medications"
    )
    allergies: list[str] = Field(default_factory=list, description="Known allergies")

    # Clinical Status
    symptoms: list[str] = Field(default_factory=list, description="Current symptoms")
    mobility_level: str = Field(
        ..., description="Mobility level (ambulatory/wheelchair/bedbound)"
    )
    adl_independence: str = Field(
        ..., description="Activities of daily living independence level"
    )
    fall_risk_factors: list[str] = Field(
        default_factory=list, description="Fall risk factors"
    )
    cognitive_status: str = Field(..., description="Cognitive status description")

    # Special Considerations
    isolation_precautions: str | None = Field(
        None, description="Isolation precautions if any"
    )
    diet_restrictions: str | None = Field(
        None, description="Diet restrictions if any"
    )

    @field_validator("gender")
    @classmethod
    def validate_gender(cls, v: str) -> str:
        """Validate gender field."""
        valid_genders = ["male", "female", "other", "m", "f"]
        if v.lower() not in valid_genders:
            raise ValueError("Gender must be Male, Female, or Other")
        return v.title()

    @field_validator("mobility_level")
    @classmethod
    def validate_mobility(cls, v: str) -> str:
        """Validate mobility level."""
        valid_levels = ["ambulatory", "wheelchair", "bedbound", "walker"]
        if v.lower() not in valid_levels:
            raise ValueError(
                f"Mobility level must be one of: {', '.join(valid_levels)}"
            )
        return v.lower()

    class Config:
        """Pydantic model configuration."""

        json_schema_extra = {
            "example": {
                "name": "John Doe",
                "age": 78,
                "gender": "Male",
                "admission_date": "2024-01-15",
                "facility": "Sunrise Senior Living",
                "primary_diagnosis": "Stroke (CVA) with right-sided weakness",
                "comorbidities": ["Type 2 Diabetes", "Hypertension", "Hyperlipidemia"],
                "blood_pressure": "145/88",
                "heart_rate": 78,
                "temperature": 98.6,
                "oxygen_saturation": 96,
                "pain_level": 3,
                "current_medications": [
                    {"name": "Metformin", "dosage": "500mg", "frequency": "BID"},
                    {"name": "Lisinopril", "dosage": "10mg", "frequency": "QD"},
                    {"name": "Aspirin", "dosage": "81mg", "frequency": "QD"},
                ],
                "allergies": ["Penicillin"],
                "symptoms": [
                    "Right-sided weakness",
                    "Difficulty with speech",
                    "Confusion",
                ],
                "mobility_level": "wheelchair",
                "adl_independence": "Requires assistance with all ADLs",
                "fall_risk_factors": [
                    "History of falls",
                    "Impaired mobility",
                    "Confusion",
                ],
                "cognitive_status": "Alert but confused, follows simple commands",
                "isolation_precautions": None,
                "diet_restrictions": "Diabetic diet, thickened liquids",
            }
        }


class CarePlanOutput(BaseModel):
    """Care plan output structure."""

    patient_name: str = Field(..., description="Patient name")
    care_plan_html: str = Field(..., description="Generated care plan in HTML format")
    generated_at: str = Field(..., description="Timestamp of generation")

    class Config:
        """Pydantic model configuration."""

        json_schema_extra = {
            "example": {
                "patient_name": "John Doe",
                "care_plan_html": "<div><h1>Care Plan</h1>...</div>",
                "generated_at": "2024-01-15T10:30:00Z",
            }
        }


class HealthCheckResponse(BaseModel):
    """Health check endpoint response."""

    status: str = Field(..., description="Service status")
    environment: str = Field(..., description="Environment name")
    version: str = Field(..., description="Application version")

    class Config:
        """Pydantic model configuration."""

        json_schema_extra = {
            "example": {
                "status": "healthy",
                "environment": "development",
                "version": "1.0.0",
            }
        }
