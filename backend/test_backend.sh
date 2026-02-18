#!/bin/bash
# Backend API Testing Script
# Tests the care plan generation endpoint with mock patient data

echo "🧪 Testing Care Plan Generator Backend API"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

BASE_URL="http://localhost:8000"

# Test 1: Health Check
echo "Test 1: Health Check Endpoint"
echo "------------------------------"
response=$(curl -s -w "\n%{http_code}" ${BASE_URL}/health)
http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | sed '$d')

if [ "$http_code" -eq 200 ]; then
    echo -e "${GREEN}✓ Health check passed${NC}"
    echo "Response: $body"
else
    echo -e "${RED}✗ Health check failed (HTTP $http_code)${NC}"
    echo "Response: $body"
fi
echo ""

# Test 2: Generate Care Plan - Simple Patient
echo "Test 2: Generate Care Plan - Margaret Johnson (Post-Stroke)"
echo "-----------------------------------------------------------"
curl -X POST ${BASE_URL}/generate-care-plan \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Margaret Johnson",
    "age": 78,
    "gender": "Female",
    "admission_date": "2024-01-15",
    "facility": "Sunrise Senior Living Center",
    "primary_diagnosis": "Ischemic Stroke (CVA) with right-sided hemiparesis",
    "comorbidities": ["Type 2 Diabetes Mellitus", "Hypertension"],
    "blood_pressure": "148/90",
    "heart_rate": 82,
    "temperature": 98.4,
    "oxygen_saturation": 96,
    "pain_level": 3,
    "current_medications": [
      {"name": "Metformin", "dosage": "500mg", "frequency": "BID"},
      {"name": "Lisinopril", "dosage": "10mg", "frequency": "QD"}
    ],
    "allergies": ["Penicillin"],
    "symptoms": ["Right-sided weakness", "Mild dysarthria"],
    "mobility_level": "wheelchair",
    "adl_independence": "Requires moderate to maximum assistance with all ADLs",
    "fall_risk_factors": ["History of falls", "Impaired mobility"],
    "cognitive_status": "Alert but occasionally confused",
    "isolation_precautions": null,
    "diet_restrictions": "Diabetic diet, pureed texture"
  }' \
  -w "\n\nHTTP Status: %{http_code}\n" \
  -o /tmp/care_plan_response.json

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Care plan generated successfully${NC}"
    echo "Response saved to: /tmp/care_plan_response.json"
else
    echo -e "${RED}✗ Care plan generation failed${NC}"
fi
echo ""

echo "=========================================="
echo "Testing complete!"
echo ""
echo "To test all 5 mock patients, use the frontend at:"
echo "http://localhost:5173"
