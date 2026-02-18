@echo off
REM Backend API Testing Script for Windows
REM Tests the care plan generation endpoint with mock patient data

echo Testing Care Plan Generator Backend API
echo ==========================================
echo.

set BASE_URL=http://localhost:8000

REM Test 1: Health Check
echo Test 1: Health Check Endpoint
echo ------------------------------
curl -s %BASE_URL%/health
echo.
echo.

REM Test 2: Generate Care Plan
echo Test 2: Generate Care Plan - Margaret Johnson (Post-Stroke)
echo -----------------------------------------------------------
curl -X POST %BASE_URL%/generate-care-plan ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Margaret Johnson\",\"age\":78,\"gender\":\"Female\",\"admission_date\":\"2024-01-15\",\"facility\":\"Sunrise Senior Living Center\",\"primary_diagnosis\":\"Ischemic Stroke (CVA) with right-sided hemiparesis\",\"comorbidities\":[\"Type 2 Diabetes Mellitus\",\"Hypertension\"],\"blood_pressure\":\"148/90\",\"heart_rate\":82,\"temperature\":98.4,\"oxygen_saturation\":96,\"pain_level\":3,\"current_medications\":[{\"name\":\"Metformin\",\"dosage\":\"500mg\",\"frequency\":\"BID\"},{\"name\":\"Lisinopril\",\"dosage\":\"10mg\",\"frequency\":\"QD\"}],\"allergies\":[\"Penicillin\"],\"symptoms\":[\"Right-sided weakness\",\"Mild dysarthria\"],\"mobility_level\":\"wheelchair\",\"adl_independence\":\"Requires moderate to maximum assistance with all ADLs\",\"fall_risk_factors\":[\"History of falls\",\"Impaired mobility\"],\"cognitive_status\":\"Alert but occasionally confused\",\"isolation_precautions\":null,\"diet_restrictions\":\"Diabetic diet, pureed texture\"}"

echo.
echo.
echo ==========================================
echo Testing complete!
echo.
echo To test all 5 mock patients, use the frontend at:
echo http://localhost:5173
echo.
pause
