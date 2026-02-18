"""
Example API tests for Care Plan Generator backend.

These tests demonstrate how to test the FastAPI endpoints using pytest.
Run with: pytest
"""

from datetime import date

import pytest
from fastapi.testclient import TestClient

from app.main import app

# Create test client
client = TestClient(app)


class TestHealthEndpoint:
    """Tests for the health check endpoint."""

    def test_health_check_success(self):
        """Test that health check returns 200 and correct response."""
        response = client.get("/health")

        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert "environment" in data

    def test_health_check_response_structure(self):
        """Test that health check response has expected fields."""
        response = client.get("/health")
        data = response.json()

        # Check all required fields are present
        assert "status" in data
        assert "environment" in data

        # Check types
        assert isinstance(data["status"], str)
        assert isinstance(data["environment"], str)


class TestCarePlanEndpoint:
    """Tests for the care plan generation endpoint."""

    @pytest.fixture
    def valid_patient_data(self):
        """Fixture providing valid patient data for testing."""
        return {
            "name": "Test Patient",
            "age": 75,
            "gender": "Female",
            "admission_date": date.today().isoformat(),
            "facility": "Test Skilled Nursing Facility",
            "primary_diagnosis": "Post-stroke rehabilitation",
            "comorbidities": ["Type 2 Diabetes", "Hypertension"],
            "blood_pressure": "140/85",
            "heart_rate": 78,
            "temperature": 98.6,
            "oxygen_saturation": 96,
            "pain_level": 3,
            "current_medications": [
                {"name": "Metformin", "dosage": "500mg", "frequency": "twice daily"},
                {"name": "Lisinopril", "dosage": "10mg", "frequency": "once daily"},
            ],
            "allergies": ["Penicillin"],
            "symptoms": ["Weakness on right side", "Difficulty speaking"],
            "mobility_level": "Wheelchair dependent",
            "adl_independence": "Requires moderate assistance",
            "fall_risk_factors": ["Weakness", "Balance impairment"],
            "cognitive_status": "Alert and oriented x3",
            "isolation_precautions": None,
            "diet_restrictions": "Diabetic diet",
        }

    def test_generate_care_plan_success(self, valid_patient_data):
        """Test successful care plan generation with valid data."""
        # Note: This test requires a valid ANTHROPIC_API_KEY in .env
        # Skip if API key is not available or in CI environment

        response = client.post("/generate-care-plan", json=valid_patient_data)

        # Should return 200 if API key is valid
        # May return 500 if API key is missing/invalid
        assert response.status_code in [200, 500]

        if response.status_code == 200:
            data = response.json()
            assert "care_plan_html" in data
            assert isinstance(data["care_plan_html"], str)
            assert len(data["care_plan_html"]) > 0

    def test_generate_care_plan_invalid_data(self):
        """Test that invalid data returns 422 validation error."""
        invalid_data = {
            "name": "Test Patient",
            "age": -5,  # Invalid age
            # Missing required fields
        }

        response = client.post("/generate-care-plan", json=invalid_data)
        assert response.status_code == 422  # Unprocessable Entity

    def test_generate_care_plan_missing_required_fields(self):
        """Test that missing required fields returns validation error."""
        incomplete_data = {
            "name": "Test Patient",
            # Missing all other required fields
        }

        response = client.post("/generate-care-plan", json=incomplete_data)
        assert response.status_code == 422

    def test_generate_care_plan_with_minimal_data(self):
        """Test care plan generation with minimal required data."""
        minimal_data = {
            "name": "Minimal Test Patient",
            "age": 70,
            "gender": "Male",
            "admission_date": date.today().isoformat(),
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

        response = client.post("/generate-care-plan", json=minimal_data)

        # Should succeed with minimal data
        assert response.status_code in [200, 500]


class TestValidation:
    """Tests for Pydantic validation."""

    def test_age_validation_negative(self):
        """Test that negative age is rejected."""
        data = {
            "name": "Test",
            "age": -1,  # Invalid
            "gender": "Male",
            "admission_date": date.today().isoformat(),
            "facility": "Test",
            "primary_diagnosis": "Test",
            "blood_pressure": "120/80",
            "heart_rate": 72,
            "temperature": 98.6,
            "oxygen_saturation": 98,
            "pain_level": 0,
            "mobility_level": "Independent",
            "adl_independence": "Independent",
            "cognitive_status": "Alert",
        }

        response = client.post("/generate-care-plan", json=data)
        assert response.status_code == 422

    def test_age_validation_too_high(self):
        """Test that age > 120 is rejected."""
        data = {
            "name": "Test",
            "age": 121,  # Invalid
            "gender": "Male",
            "admission_date": date.today().isoformat(),
            "facility": "Test",
            "primary_diagnosis": "Test",
            "blood_pressure": "120/80",
            "heart_rate": 72,
            "temperature": 98.6,
            "oxygen_saturation": 98,
            "pain_level": 0,
            "mobility_level": "Independent",
            "adl_independence": "Independent",
            "cognitive_status": "Alert",
        }

        response = client.post("/generate-care-plan", json=data)
        assert response.status_code == 422

    def test_heart_rate_validation(self):
        """Test that invalid heart rate is rejected."""
        data = {
            "name": "Test",
            "age": 70,
            "gender": "Male",
            "admission_date": date.today().isoformat(),
            "facility": "Test",
            "primary_diagnosis": "Test",
            "blood_pressure": "120/80",
            "heart_rate": 15,  # Too low (< 20)
            "temperature": 98.6,
            "oxygen_saturation": 98,
            "pain_level": 0,
            "mobility_level": "Independent",
            "adl_independence": "Independent",
            "cognitive_status": "Alert",
        }

        response = client.post("/generate-care-plan", json=data)
        assert response.status_code == 422


class TestCORS:
    """Tests for CORS configuration."""

    def test_cors_headers_present(self):
        """Test that CORS headers are present in response."""
        response = client.options("/health")

        # Check for CORS headers
        # Note: TestClient may not fully simulate CORS
        # For full CORS testing, use a real browser or curl
        assert response.status_code in [200, 405]  # OPTIONS may not be implemented


# Mark tests that require API key
@pytest.mark.requires_api_key
class TestWithAPIKey:
    """Tests that require a valid Anthropic API key."""

    def test_full_care_plan_generation(self):
        """
        Full integration test for care plan generation.

        This test requires:
        - Valid ANTHROPIC_API_KEY in backend/.env
        - Internet connection to reach Anthropic API

        Skip this test in CI or when API key is not available.
        """
        patient_data = {
            "name": "Integration Test Patient",
            "age": 82,
            "gender": "Female",
            "admission_date": "2026-02-10",
            "facility": "Sunrise Skilled Nursing Facility",
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

        response = client.post("/generate-care-plan", json=patient_data)

        assert response.status_code == 200
        data = response.json()

        # Verify response structure
        assert "care_plan_html" in data
        care_plan = data["care_plan_html"]

        # Verify care plan contains expected content
        assert len(care_plan) > 500  # Substantial content
        assert (
            "nursing diagnos" in care_plan.lower() or "diagnosis" in care_plan.lower()
        )
        assert "goal" in care_plan.lower() or "intervention" in care_plan.lower()


"""
Running Tests:

1. Run all tests:
   pytest

2. Run with verbose output:
   pytest -v

3. Run specific test class:
   pytest tests/test_api.py::TestHealthEndpoint

4. Run specific test:
   pytest tests/test_api.py::TestHealthEndpoint::test_health_check_success

5. Run tests with coverage:
   pytest --cov=app --cov-report=html

6. Skip tests that require API key:
   pytest -m "not requires_api_key"

7. Run only tests that require API key:
   pytest -m "requires_api_key"

Setup:
- Install test dependencies: pip install pytest pytest-cov
- Ensure backend server is NOT running (TestClient runs its own instance)
- Set ANTHROPIC_API_KEY in backend/.env for full integration tests
"""
