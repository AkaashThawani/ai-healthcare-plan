# Quick Start Guide - Testing Your Care Plan Generator

Follow these steps to get your application running locally for Phase 4 testing.

## Prerequisites Checklist

- ✅ Python 3.11 or higher
- ✅ Node.js 18 or higher
- ✅ Anthropic API Key ([Get one here](https://console.anthropic.com/settings/keys))

## Step 1: Backend Setup (5 minutes)

### 1.1 Navigate to backend directory

```bash
cd backend
```

### 1.2 Create and activate virtual environment

**Windows:**

```bash
python -m venv venv
venv\Scripts\activate
```

**macOS/Linux:**

```bash
python3 -m venv venv
source venv/bin/activate
```

### 1.3 Install Python dependencies

```bash
pip install -r requirements.txt
```

### 1.4 Create .env file

Create a file named `.env` in the `backend/` directory:

```env
ANTHROPIC_API_KEY=your-actual-api-key-here
CORS_ORIGINS=http://localhost:5173
ENVIRONMENT=development
LOG_LEVEL=INFO
```

**IMPORTANT:** Replace `your-actual-api-key-here` with your real Anthropic API key!

### 1.5 Start the backend server

```bash
uvicorn app.main:app --reload
```

✅ Backend should now be running at: `http://localhost:8000`

**Verify it's working:**

- Open `http://localhost:8000/docs` in your browser
- You should see the FastAPI Swagger documentation

---

## Step 2: Frontend Setup (5 minutes)

**Open a NEW terminal window** (keep the backend running!)

### 2.1 Navigate to frontend directory

```bash
cd frontend
```

### 2.2 Install Node dependencies

```bash
npm install
```

This will take 1-2 minutes to download all packages.

### 2.3 Create .env file

Create a file named `.env` in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:8000
VITE_ENVIRONMENT=development
```

### 2.4 Start the frontend development server

```bash
npm run dev
```

✅ Frontend should now be running at: `http://localhost:5173`

---

## Step 3: Test the Application! 🎉

### 3.1 Open the app

Go to: `http://localhost:5173`

You should see the **AI Care Plan Generator** interface.

### 3.2 Load a mock patient

1. Click the **"Load Mock Patient"** dropdown at the top-right of the form
2. Select any patient (e.g., "Margaret Johnson")
3. The form will auto-populate with realistic patient data

### 3.3 Generate a care plan

1. Review the populated data (or modify as needed)
2. Click **"Generate Care Plan"** button at the bottom
3. Wait 10-20 seconds for AI to generate the care plan
4. You'll see a comprehensive care plan appear!

### 3.4 Test other features

- **Print:** Click the "Print" button to see print-friendly formatting
- **Generate New:** Click to create another care plan for a different patient
- **Try all 5 mock patients** to see different medical scenarios

---

## Testing Checklist ✅

Test each of these scenarios:

### Scenario 1: Post-Stroke Patient (Margaret Johnson)

- [ ] Load mock patient "Margaret Johnson"
- [ ] Generate care plan
- [ ] Verify care plan includes stroke-specific interventions
- [ ] Check for fall risk assessment
- [ ] Verify medications are mentioned

### Scenario 2: CHF Patient (Robert Williams)

- [ ] Load mock patient "Robert Williams"
- [ ] Generate care plan
- [ ] Verify cardiac-specific monitoring schedule
- [ ] Check for fluid restriction recommendations
- [ ] Verify multiple medications are addressed

### Scenario 3: Hip Fracture Patient (Dorothy Martinez)

- [ ] Load mock patient "Dorothy Martinez"
- [ ] Generate care plan
- [ ] Verify pain management plan
- [ ] Check for post-surgical care instructions
- [ ] Verify fall precautions

### Scenario 4: COPD/Pneumonia Patient (James Anderson)

- [ ] Load mock patient "James Anderson"
- [ ] Generate care plan
- [ ] Verify respiratory interventions
- [ ] Check for oxygen management
- [ ] Verify infection control measures

### Scenario 5: Dementia/UTI Patient (Eleanor Thompson)

- [ ] Load mock patient "Eleanor Thompson"
- [ ] Generate care plan
- [ ] Verify cognitive status addressed
- [ ] Check for confusion management strategies
- [ ] Verify family education points

### Additional Tests

- [ ] Test error handling: Submit form with missing required fields
- [ ] Test print functionality
- [ ] Verify responsive design (resize browser window)
- [ ] Test generating multiple care plans in sequence

---

## Troubleshooting

### Backend Issues

**"Module not found" error:**

```bash
# Make sure virtual environment is activated
# You should see (venv) in your terminal prompt

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

# Then reinstall
pip install -r requirements.txt
```

**"Anthropic API key not found":**

- Check that `.env` file exists in `backend/` directory
- Verify `ANTHROPIC_API_KEY` is set correctly
- Restart the backend server after changing .env

**Port 8000 already in use:**

```bash
# Kill the process using port 8000 (Windows)
netstat -ano | findstr :8000
taskkill /PID <PID_NUMBER> /F

# Or use a different port
uvicorn app.main:app --reload --port 8001
# Then update frontend .env: VITE_API_URL=http://localhost:8001
```

### Frontend Issues

**"npm install" fails:**

```bash
# Clear npm cache
npm cache clean --force

# Try again
npm install
```

**"Cannot connect to backend" error:**

- Verify backend is running at `http://localhost:8000`
- Check backend terminal for errors
- Visit `http://localhost:8000/health` directly
- Verify CORS settings in backend .env

**Port 5173 already in use:**

```bash
# Vite will automatically try the next available port (5174, 5175, etc.)
# Just use the URL that Vite shows in the terminal
```

### Care Plan Generation Issues

**"API key invalid" error:**

- Verify your Anthropic API key is correct
- Check you have credits remaining at console.anthropic.com
- Make sure there are no extra spaces in the .env file

**Takes too long (over 60 seconds):**

- This is unusual - check your internet connection
- Check Anthropic API status
- Try with a simpler mock patient first

**Care plan looks incomplete:**

- This is the AI's output - it may vary
- Try generating again with the same patient
- Verify the prompt in `backend/app/services/care_plan_service.py`

---

## What's Next?

Once you've successfully tested all 5 mock patients:

✅ **Phase 4 Complete!**

You now have a working AI-powered care plan generator with:

- ✅ Functional backend API
- ✅ Beautiful, responsive frontend
- ✅ 5 realistic test cases
- ✅ Error handling
- ✅ Print functionality

**Ready for Phase 5-11** (CI/CD, monitoring, documentation, deployment)

---

## Quick Commands Reference

### Backend

```bash
cd backend
venv\Scripts\activate          # Windows
source venv/bin/activate       # macOS/Linux
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm run dev
```

### Stop Servers

- Backend: Press `Ctrl+C` in backend terminal
- Frontend: Press `Ctrl+C` in frontend terminal
