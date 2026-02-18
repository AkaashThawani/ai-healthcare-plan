# Testing Guide

This guide covers testing strategies and how to run tests for the Care Plan Generator application.

## Overview

- **Backend**: pytest + FastAPI TestClient
- **Frontend**: Vitest + React Testing Library
- **Coverage**: Available for both frontend and backend

---

## Backend Testing (Python + pytest)

### Setup

```bash
cd backend

# Ensure virtual environment is activated
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install test dependencies
pip install pytest pytest-cov
```

### Running Backend Tests

```bash
# Run all tests
pytest

# Run with verbose output
pytest -v

# Run specific test file
pytest tests/test_api.py

# Run specific test class
pytest tests/test_api.py::TestHealthEndpoint

# Run specific test method
pytest tests/test_api.py::TestHealthEndpoint::test_health_check_success

# Run with coverage
pytest --cov=app --cov-report=html

# View coverage report
# Open htmlcov/index.html in browser

# Skip tests that require API key
pytest -m "not requires_api_key"

# Run only tests that require API key
pytest -m "requires_api_key"
```

### Backend Test Structure

```
backend/tests/
├── __init__.py              # Makes tests a package
├── conftest.py              # Pytest configuration and fixtures
└── test_api.py              # API endpoint tests
```

### Test Categories

**Unit Tests:**

- Validation (Pydantic models)
- Individual functions
- No external dependencies

**Integration Tests:**

- API endpoints (TestClient)
- Health check
- Care plan generation (mocked API)

**Full Integration Tests** (require API key):

- End-to-end care plan generation
- Real Claude API calls
- Marked with `@pytest.mark.requires_api_key`

### Writing New Backend Tests

Example test structure:

```python
import pytest
from fastapi.testclient import TestClient

def test_example(test_client):
    """Test description."""
    response = test_client.get("/endpoint")

    assert response.status_code == 200
    data = response.json()
    assert "expected_field" in data
```

### Backend Test Fixtures

Available fixtures (see `conftest.py`):

- `test_client` - FastAPI TestClient instance
- `sample_patient_minimal` - Minimal valid patient data
- `sample_patient_comprehensive` - Complete patient data with all fields

---

## Frontend Testing (Vitest + React Testing Library)

### Setup

```bash
cd frontend

# Install test dependencies
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event @vitest/ui jsdom
```

### Running Frontend Tests

```bash
# Run all tests (watch mode)
npm run test

# Run tests once (CI mode)
npm run test:run

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage

# View coverage report
# Open coverage/index.html in browser
```

### Frontend Test Structure

```
frontend/src/
├── __tests__/
│   └── App.test.tsx         # App component tests
├── components/
│   └── __tests__/           # Component-specific tests (add as needed)
│       ├── PatientForm.test.tsx
│       └── CarePlanDisplay.test.tsx
└── setupTests.ts            # Test setup and global mocks
```

### Test Categories

**Component Tests:**

- Rendering tests
- User interaction tests
- State management tests

**Integration Tests:**

- Full workflow tests
- API integration (mocked)
- Navigation tests

**Accessibility Tests:**

- ARIA attributes
- Keyboard navigation
- Screen reader support

### Writing New Frontend Tests

Example test structure:

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(
      <BrowserRouter>
        <MyComponent />
      </BrowserRouter>
    );

    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  it('handles user interaction', () => {
    render(
      <BrowserRouter>
        <MyComponent />
      </BrowserRouter>
    );

    const button = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(button);

    expect(screen.getByText('Clicked!')).toBeInTheDocument();
  });
});
```

### Mocking API Calls

```typescript
import { vi } from 'vitest';

// Mock the entire module
vi.mock('../services/api', () => ({
  generateCarePlan: vi.fn(),
}));

// In test
const { generateCarePlan } = await import('../services/api');
vi.mocked(generateCarePlan).mockResolvedValue({
  care_plan_html: '<h1>Test Care Plan</h1>',
});
```

---

## Test Coverage Goals

### Backend Coverage Targets

- **Overall**: 80%+
- **Critical paths** (care plan generation): 95%+
- **Utilities**: 90%+
- **Config/Models**: 100%

### Frontend Coverage Targets

- **Components**: 70%+
- **Critical workflows**: 90%+
- **Utilities**: 80%+

### Viewing Coverage

**Backend:**

```bash
cd backend
pytest --cov=app --cov-report=html
# Open htmlcov/index.html
```

**Frontend:**

```bash
cd frontend
npm run test:coverage
# Open coverage/index.html
```

---

## Continuous Integration (CI)

Tests run automatically on every push and pull request via GitHub Actions.

See `.github/workflows/ci.yml` for CI configuration.

### CI Test Jobs

- ✅ Backend linting (Ruff)
- ✅ Frontend linting (ESLint)
- ✅ Backend type checking (MyPy)
- ✅ Frontend type checking (TypeScript)
- ✅ Backend tests (pytest)
- ✅ Frontend tests (Vitest)
- ✅ Security scanning (Snyk)

---

## Manual Testing

### Testing Locally

1. **Start Backend:**

   ```bash
   cd backend
   uvicorn app.main:app --reload --host 0.0.0.0
   ```

2. **Start Frontend:**

   ```bash
   cd frontend
   npm run dev
   ```

3. **Test Workflow:**
   - Load example patient
   - Verify form fields are populated
   - Click "Generate Care Plan"
   - Verify care plan displays
   - Check for errors in console
   - Test navigation (back/forward)

### Test All Mock Patients

Test each of the 5 mock patients:

1. **Sarah Johnson** - Post-stroke + diabetes
2. **Robert Martinez** - CHF + renal disease
3. **Margaret Williams** - Hip fracture post-surgery
4. **James Brown** - COPD + pneumonia
5. **Dorothy Anderson** - Dementia + UTI

**For each patient:**

- ✅ Loads correctly
- ✅ Generates care plan
- ✅ Care plan is clinically reasonable
- ✅ No errors in console
- ✅ Print formatting looks professional

### Testing API Directly

**Health Check:**

```bash
curl http://localhost:8000/health
```

**Generate Care Plan:**

```bash
curl -X POST http://localhost:8000/generate-care-plan \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Patient",
    "age": 75,
    "gender": "Female",
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
    "cognitive_status": "Alert"
  }'
```

---

## Troubleshooting Tests

### Backend Test Issues

**Problem:** `ModuleNotFoundError` when running pytest

```bash
# Solution: Ensure virtual environment is activated and dependencies installed
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
pip install pytest pytest-cov
```

**Problem:** Tests fail with "API key not found"

```bash
# Solution: Add API key to backend/.env or skip tests requiring API key
pytest -m "not requires_api_key"
```

**Problem:** Import errors in tests

```bash
# Solution: Ensure PYTHONPATH includes backend directory
export PYTHONPATH="${PYTHONPATH}:$(pwd)"  # Run from backend directory
```

### Frontend Test Issues

**Problem:** `Cannot find module` errors

```bash
# Solution: Ensure dependencies are installed
npm install
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

**Problem:** Tests fail with "document is not defined"

```bash
# Solution: Ensure vitest.config.ts has environment: 'jsdom'
# Check that vitest.config.ts exists in frontend directory
```

**Problem:** Mock not working

```bash
# Solution: Check mock is defined before test runs
# Use vi.clearAllMocks() in beforeEach
```

---

## Best Practices

### Writing Good Tests

1. **Test Behavior, Not Implementation**
   - Focus on what users see and do
   - Don't test internal state

2. **Use Descriptive Test Names**
   - Good: `test_health_check_returns_200_and_correct_status`
   - Bad: `test1`

3. **Arrange, Act, Assert (AAA)**

   ```python
   # Arrange
   patient_data = {...}

   # Act
   response = client.post("/generate-care-plan", json=patient_data)

   # Assert
   assert response.status_code == 200
   ```

4. **Keep Tests Independent**
   - Each test should run in isolation
   - Don't depend on other tests
   - Use fixtures for shared setup

5. **Test Edge Cases**
   - Valid data
   - Invalid data
   - Missing data
   - Boundary values (age 0, 120, etc.)

### Code Coverage

- **Don't chase 100% coverage** - Focus on critical paths
- **Meaningful tests > High coverage** - Quality over quantity
- **Test failure scenarios** - Not just happy paths

### Continuous Testing

- **Run tests before commits** - Use pre-commit hooks
- **Fix failing tests immediately** - Don't let them accumulate
- **Update tests with code changes** - Keep them in sync

---

## Test Cheat Sheet

### Backend (pytest)

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=app

# Run specific test
pytest tests/test_api.py::test_health_check_success

# Skip slow tests
pytest -m "not slow"

# Debug test
pytest -vv --pdb
```

### Frontend (Vitest)

```bash
# Run tests (watch mode)
npm run test

# Run once (CI)
npm run test:run

# Run with UI
npm run test:ui

# Run with coverage
npm run test:coverage

# Run specific file
npm run test App.test.tsx
```

---

## Adding New Tests

### Backend

1. Create test file in `backend/tests/`
2. Name it `test_<feature>.py`
3. Import TestClient and fixtures
4. Write tests using pytest conventions
5. Run and verify

### Frontend

1. Create test file next to component or in `__tests__/`
2. Name it `<Component>.test.tsx`
3. Import testing utilities
4. Write tests using Vitest/RTL
5. Run and verify

---

## Resources

- **pytest**: <https://docs.pytest.org>
- **FastAPI Testing**: <https://fastapi.tiangolo.com/tutorial/testing/>
- **Vitest**: <https://vitest.dev/>
- **React Testing Library**: <https://testing-library.com/react>
- **Testing Best Practices**: <https://kentcdodds.com/blog/common-mistakes-with-react-testing-library>

---

**Test Status:** ✅ Example tests included, ready to expand

**Last Updated:** 2026-02-17
