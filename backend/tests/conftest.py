"""
Pytest configuration file.
Contains fixtures and configuration for all tests.
"""

from collections.abc import Generator

import pytest
from fastapi.testclient import TestClient

from app.main import app


@pytest.fixture(scope="session")
def test_client() -> Generator[TestClient, None, None]:
    """
    Create a test client for the FastAPI application.

    This fixture is session-scoped, meaning it's created once
    for the entire test session.
    """
    with TestClient(app) as client:
        yield client


@pytest.fixture
def sample_patient_minimal():
    """Fixture providing minimal valid patient data."""
    return {
        "name": "Test Patient",
        "age": 70,
        "gender": "Male",
        "admission_date": "2026-02-17",
        "facility": "Test Facility",
        "primary_diagnosis": "Test Diagnosis",
        "comorbidities": [],
        "blood_pressure": "120/80",
        "heart_rate": 72,
        "temperature": 98.6,
        "oxygen_saturation": 98,
        "pain_level": 0,
        "current_medications": [],
        "allergies": [],
        "symptoms": [],
        "mobility_level": "Independent",
        "adl_independence": "Independent",
        "fall_risk_factors": [],
        "cognitive_status": "Alert",
    }


@pytest.fixture
def sample_patient_comprehensive():
    """Fixture providing comprehensive patient data."""
    return {
        "name": "Comprehensive Test Patient",
        "age": 82,
        "gender": "Female",
        "admission_date": "2026-02-10",
        "facility": "Test Skilled Nursing Facility",
        "primary_diagnosis": "Congestive Heart Failure (CHF) Exacerbation",
        "comorbidities": [
            "Chronic Kidney Disease Stage 3",
            "Type 2 Diabetes Mellitus",
            "Hypertension",
        ],
        "blood_pressure": "152/88",
        "heart_rate": 92,
        "temperature": 98.4,
        "oxygen_saturation": 92,
        "pain_level": 4,
        "current_medications": [
            {
                "name": "Furosemide (Lasix)",
                "dosage": "40mg",
                "frequency": "twice daily",
            },
            {"name": "Lisinopril", "dosage": "20mg", "frequency": "once daily"},
            {"name": "Metformin", "dosage": "1000mg", "frequency": "twice daily"},
        ],
        "allergies": ["Sulfa drugs"],
        "symptoms": ["Shortness of breath", "Bilateral leg edema", "Fatigue"],
        "mobility_level": "Wheelchair dependent",
        "adl_independence": "Requires extensive assistance with ADLs",
        "fall_risk_factors": ["Weakness", "Diuretic use", "Age > 80"],
        "cognitive_status": "Alert and oriented x3, mild forgetfulness",
        "isolation_precautions": None,
        "diet_restrictions": "2g sodium restriction, diabetic diet, fluid restriction 1500mL/day",
    }


# Pytest markers
def pytest_configure(config):
    """Configure custom pytest markers."""
    config.addinivalue_line(
        "markers", "requires_api_key: mark test as requiring Anthropic API key"
    )
    config.addinivalue_line("markers", "slow: mark test as slow running")
    config.addinivalue_line("markers", "integration: mark test as integration test")
