# Backend Testing Guide

## Setup

1. **Create virtual environment:**
```bash
cd backend
python -m venv venv
```

2. **Activate virtual environment:**
```bash
# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

4. **Create .env file:**
```bash
# Copy the example and add your API key
cp .env.example .env

# Edit .env and add your Anthropic API key:
ANTHROPIC_API_KEY=sk-ant-your-actual-key-here
CORS_ORIGINS=http://localhost:5173
ENVIRONMENT=development
LOG_LEVEL=INFO
```

5. **Run the server:**
```bash
uvicorn app.main:app --reload
```

Server will start at: `http://localhost:8000`

## Test Endpoints

### 1. Health Check
```bash
curl http://localhost:8000/health
```

Expected response:
```json
{
  "status": "healthy",
  "environment": "development",
  "version": "1.0.0"
}
```

### 2. API Documentation
Open in browser:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### 3. Generate Care Plan
```bash
curl -X POST http://localhost:8000/generate-care-plan \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "age": 78,
    "gender": "Male",
    "admission_date": "2024-01-15",
    "facility": "Sunrise Senior Living",
    "primary_diagnosis": "Stroke (CVA) with right-sided weakness",
    "comorbidities": ["Type 2 Diabetes", "Hypertension"],
    "blood_pressure": "145/88",
    "heart_rate": 78,
    "temperature": 98.6,
    "oxygen_saturation": 96,
    "pain_level": 3,
    "current_medications": [
      {"name": "Metformin", "dosage": "500mg", "frequency": "BID"},
      {"name": "Lisinopril", "dosage": "10mg", "frequency": "QD"}
    ],
    "allergies": ["Penicillin"],
    "symptoms": ["Right-sided weakness", "Confusion"],
    "mobility_level": "wheelchair",
    "adl_independence": "Requires assistance with all ADLs",
    "fall_risk_factors": ["History of falls", "Impaired mobility"],
    "cognitive_status": "Alert but confused",
    "isolation_precautions": null,
    "diet_restrictions": "Diabetic diet"
  }'
```

## Troubleshooting

**"Connection refused":**
- Make sure the server is running
- Check that you're using the correct port (8000)

**"Anthropic API key not found":**
- Verify `.env` file exists in backend directory
- Check that `ANTHROPIC_API_KEY` is set correctly
- Restart the server after changing .env

**"Module not found" errors:**
- Ensure virtual environment is activated
- Run `pip install -r requirements.txt` again

**CORS errors:**
- Check `CORS_ORIGINS` in .env file
- Ensure frontend URL is included (http://localhost:5173)
