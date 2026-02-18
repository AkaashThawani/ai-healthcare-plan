# Mock Data Guide

Your application includes comprehensive mock patient data for testing.

## 📊 Available Mock Patients (5 Scenarios)

### 1. Margaret Johnson - Post-Stroke with Diabetes
**Complexity:** High
**Key Features:**
- Ischemic stroke with right-sided weakness
- Multiple comorbidities (diabetes, hypertension, a-fib)
- Complex medication regimen (5 medications)
- Wheelchair-bound, high fall risk
- Dietary restrictions (diabetic, pureed, thickened liquids)

**Use Case:** Tests complex multi-system care planning, stroke rehabilitation, diabetes management, fall prevention

---

### 2. Robert Williams - CHF Exacerbation
**Complexity:** High
**Key Features:**
- Congestive heart failure exacerbation
- Chronic kidney disease (CKD Stage 3)
- Multiple cardiac medications (6 medications)
- Fluid and sodium restrictions
- Respiratory compromise (O2 sat 92%)

**Use Case:** Tests cardiac care planning, fluid management, medication management, kidney disease considerations

---

### 3. Dorothy Martinez - Hip Fracture Post-Surgery
**Complexity:** Medium-High
**Key Features:**
- Recent ORIF surgery (5 days post-op)
- High pain level (6/10)
- Fall risk with cognitive impairment
- Pain management with opioids
- Mobility limitations, wheelchair-bound

**Use Case:** Tests post-surgical care, pain management, fall prevention, rehabilitation planning, dementia considerations

---

### 4. James Anderson - COPD with Pneumonia
**Complexity:** Medium
**Key Features:**
- Active respiratory infection
- COPD exacerbation
- Low oxygen saturation (90%)
- Productive cough, respiratory symptoms
- Droplet precautions required

**Use Case:** Tests respiratory care planning, infection control, oxygen management, antibiotic therapy monitoring

---

### 5. Eleanor Thompson - Dementia with UTI
**Complexity:** Medium
**Key Features:**
- Moderate Alzheimer's disease
- Delirium due to UTI
- Confusion, agitation, wandering risk
- IV antibiotic therapy
- High fall risk due to confusion

**Use Case:** Tests cognitive impairment care, infection management, behavioral management, safety planning

---

## 🎯 How to Use Mock Data

### **Option A: Frontend (Recommended)**

1. **Start the application** (see QUICK_START.md)
2. **Open** http://localhost:5173
3. **Click** "Load Mock Patient" dropdown (top-right)
4. **Select** any patient
5. **Click** "Generate Care Plan"

✅ **Easiest way to test!**

---

### **Option B: Backend API Testing**

#### Using curl (Command Line)

**Windows:**
```bash
cd backend
test_backend.bat
```

**macOS/Linux:**
```bash
cd backend
chmod +x test_backend.sh
./test_backend.sh
```

#### Manual curl command:
```bash
curl -X POST http://localhost:8000/generate-care-plan \
  -H "Content-Type: application/json" \
  -d @test_data.json
```

#### Using Postman:
1. Import `backend/test_data.json`
2. POST to `http://localhost:8000/generate-care-plan`
3. Copy any patient's "data" field to request body
4. Send request

---

### **Option C: Python Script**

```python
import requests
import json

# Load mock data
with open('backend/test_data.json', 'r') as f:
    data = json.load(f)

# Get first patient
patient = data['mock_patients'][0]['data']

# Send request
response = requests.post(
    'http://localhost:8000/generate-care-plan',
    json=patient
)

# Print care plan
print(response.json())
```

---

## 📝 Testing Scenarios

### Scenario 1: Happy Path Testing
**Goal:** Verify basic functionality works
**Steps:**
1. Load "Margaret Johnson" (simplest to start)
2. Generate care plan without modifications
3. Verify care plan includes:
   - Patient summary
   - Nursing diagnoses
   - Goals (short-term & long-term)
   - Interventions
   - Risk assessments
   - Monitoring schedule
4. Test print functionality

---

### Scenario 2: All Patient Types
**Goal:** Ensure AI handles different medical conditions
**Steps:**
1. Test each of the 5 mock patients
2. Verify care plans are condition-specific:
   - Stroke patient → neuro assessments, mobility interventions
   - CHF patient → cardiac monitoring, fluid restrictions
   - Hip fracture → pain management, PT/OT
   - COPD patient → respiratory interventions, O2 management
   - Dementia patient → safety measures, behavioral strategies

---

### Scenario 3: Form Validation
**Goal:** Test input validation
**Steps:**
1. Try submitting empty form → should show validation errors
2. Enter invalid age (e.g., 150) → should be rejected
3. Enter invalid blood pressure format → should handle gracefully
4. Add/remove medications → should update correctly

---

### Scenario 4: Error Handling
**Goal:** Test error scenarios
**Steps:**
1. Stop backend server → should show "Cannot connect" error
2. Invalid API key → should show API error
3. Malformed data → should show validation error

---

### Scenario 5: Multiple Care Plans
**Goal:** Test sequential usage
**Steps:**
1. Generate care plan for Patient #1
2. Click "Generate New Care Plan"
3. Load Patient #2
4. Generate care plan
5. Repeat for all 5 patients
6. Verify no memory leaks or performance issues

---

## 🔍 What to Look For in Generated Care Plans

### ✅ Good Care Plan Indicators:

1. **Condition-Specific Content**
   - Mentions patient's diagnosis
   - Addresses stated symptoms
   - References listed medications

2. **NANDA Nursing Diagnoses**
   - Uses proper nursing terminology
   - Prioritized (3-5 diagnoses)
   - Related to patient condition

3. **Realistic Interventions**
   - Specific frequencies (Q4H, BID, etc.)
   - Appropriate for skilled nursing facility
   - Evidence-based

4. **Comprehensive Sections**
   - All required sections present
   - Well-organized HTML structure
   - Print-friendly formatting

5. **Safety Considerations**
   - Fall risk addressed
   - Infection control mentioned (if applicable)
   - Special precautions noted

---

## 🐛 Troubleshooting Mock Data

### Issue: "Load Mock Patient" dropdown doesn't work
**Solution:** Check browser console for errors, ensure JavaScript is enabled

### Issue: Mock data doesn't populate form
**Solution:** Clear browser cache, hard refresh (Ctrl+Shift+R)

### Issue: Care plan generation fails with mock data
**Solution:**
- Check backend is running
- Verify API key in backend .env
- Check backend console for errors

### Issue: Mock patients missing or incomplete
**Solution:**
- Verify `frontend/src/data/mockPatients.ts` exists
- Check no build errors in frontend terminal

---

## 📁 File Locations

- **Frontend Mock Data:** `frontend/src/data/mockPatients.ts`
- **Backend Test Data:** `backend/test_data.json`
- **Backend Test Scripts:**
  - Windows: `backend/test_backend.bat`
  - Unix: `backend/test_backend.sh`

---

## ➕ Adding Your Own Mock Patients

Edit `frontend/src/data/mockPatients.ts`:

```typescript
export const mockPatients: PatientInput[] = [
  // ... existing patients ...
  {
    name: "Your Patient Name",
    age: 70,
    gender: "Female",
    // ... rest of fields
  }
];
```

Or create a new JSON file in `backend/` for API testing.

---

## 📊 Expected Results

After testing all 5 mock patients, you should see:

- ✅ 5 unique, comprehensive care plans
- ✅ Condition-specific interventions
- ✅ Professional medical formatting
- ✅ All sections present (summary, diagnoses, goals, interventions, etc.)
- ✅ No errors or crashes
- ✅ Reasonable generation time (10-30 seconds per plan)

---

**Ready to test?** Follow QUICK_START.md to set up and start testing! 🚀
