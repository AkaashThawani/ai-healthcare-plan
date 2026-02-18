# AI-Powered Care Plan Generator 🏥

> A production-ready AI healthcare application for skilled nursing facilities. Healthcare staff input patient data, and Claude AI generates comprehensive, evidence-based care plans with interventions, monitoring schedules, and clinical guidelines.

[![CI](https://img.shields.io/badge/CI-GitHub%20Actions-blue)](https://github.com/your-repo/actions)
[![Backend](https://img.shields.io/badge/Backend-FastAPI-009688)](https://fastapi.tiangolo.com/)
[![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB)](https://vitejs.dev/)
[![AI](https://img.shields.io/badge/AI-Claude%20Sonnet%204-8B5CF6)](https://anthropic.com/)

---

## 📖 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Development Guide](#-development-guide)
- [Testing](#-testing)
- [Code Quality](#-code-quality)
- [Monitoring](#-monitoring)
- [Deployment](#-deployment)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)

---

## ✨ Features

### Core Functionality
- ✅ **Comprehensive Patient Input** - Demographics, vitals, medications, allergies, symptoms, fall risks
- ✅ **AI-Powered Care Plans** - Claude Sonnet 4 generates evidence-based nursing care plans
- ✅ **NANDA Nursing Diagnoses** - 3-5 diagnoses per care plan
- ✅ **Structured Output** - Goals, interventions, risk assessments, monitoring schedules
- ✅ **Mock Patient Data** - 5 realistic patient scenarios for testing
- ✅ **Print-Friendly Formatting** - Professional output for clinical use

### User Experience
- ✅ **Searchable Selects** - Type-to-filter for symptoms, comorbidities, medications, allergies
- ✅ **Preset Options** - 40+ symptoms, 30+ fall risks, 40+ comorbidities, 20+ allergies
- ✅ **Custom Entries** - Add items not in presets
- ✅ **Form Validation** - Client and server-side validation
- ✅ **Loading States** - Clear feedback during AI generation
- ✅ **Error Handling** - User-friendly error messages
- ✅ **Responsive Design** - Works on desktop and tablet

### Infrastructure
- ✅ **CI/CD Pipeline** - Automated linting, type checking, security scanning
- ✅ **Error Tracking** - Sentry integration for frontend + backend
- ✅ **Performance Monitoring** - Real-time metrics and alerts
- ✅ **Code Quality Tools** - Pre-commit hooks, CodeRabbit AI review
- ✅ **Security Scanning** - Snyk vulnerability detection
- ✅ **Production Ready** - Deployment configs for Render + Vercel

---

## 🏗️ Tech Stack

### Frontend
- **React 18** - UI library with hooks
- **Vite 5** - Fast build tool and dev server
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Lucide React** - Icon library

### Backend
- **FastAPI** - Modern Python web framework
- **Anthropic Claude API** - AI model (Sonnet 4)
- **Pydantic** - Data validation and settings
- **Uvicorn** - ASGI server
- **Python 3.11+** - Programming language

### Infrastructure & DevOps
- **GitHub Actions** - CI/CD automation
- **Sentry** - Error tracking and performance monitoring
- **Snyk** - Security vulnerability scanning
- **CodeRabbit** - AI-powered code review
- **Pre-commit** - Git hooks for code quality
- **Render** - Backend hosting
- **Vercel** - Frontend hosting

### Code Quality
- **Ruff** - Fast Python linter and formatter
- **Black** - Python code formatter
- **MyPy** - Python static type checker
- **ESLint** - JavaScript/TypeScript linter
- **Prettier** - Code formatter
- **TypeScript** - Static type checking

---

## 🏛️ Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         User Browser                         │
│                  (Healthcare Staff Interface)                │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTPS
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (Vercel)                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  React + Vite + TypeScript + Tailwind CSS            │  │
│  │  - PatientForm component (searchable inputs)         │  │
│  │  - CarePlanDisplay component (structured output)     │  │
│  │  - React Router (client-side navigation)             │  │
│  │  - Sentry (error tracking)                           │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ REST API (JSON)
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    Backend (Render)                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  FastAPI + Uvicorn                                   │  │
│  │  - POST /generate-care-plan (main endpoint)          │  │
│  │  - GET /health (health check)                        │  │
│  │  - Pydantic validation (patient data)                │  │
│  │  - CORS middleware                                   │  │
│  │  - Sentry (error tracking)                           │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ Anthropic API
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   Claude AI (Anthropic)                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Claude Sonnet 4 (claude-sonnet-4-20250514)          │  │
│  │  - Receives: Patient data (formatted prompt)         │  │
│  │  - Generates: Comprehensive care plan (HTML)         │  │
│  │  - NANDA diagnoses, goals, interventions, risks      │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **User Input** → Healthcare staff fills patient form
2. **Validation** → Client-side TypeScript + Server-side Pydantic
3. **API Call** → Frontend sends POST request to backend
4. **Prompt Engineering** → Backend formats patient data into structured prompt
5. **AI Generation** → Claude Sonnet 4 generates care plan
6. **Response** → Backend returns HTML-formatted care plan
7. **Display** → Frontend renders care plan with professional styling
8. **Navigation** → User can go back to create new care plan

### Monorepo Structure

```
care-plan-generator/
├── frontend/              # React + Vite application
├── backend/               # FastAPI application
├── .github/               # CI/CD workflows
└── docs/                  # Setup guides and documentation
```

---

## 📋 Prerequisites

### Required Software

| Tool | Version | Purpose | Download |
|------|---------|---------|----------|
| **Node.js** | 18+ | Frontend runtime | [nodejs.org](https://nodejs.org/) |
| **Python** | 3.11+ | Backend runtime | [python.org](https://www.python.org/) |
| **Git** | Latest | Version control | [git-scm.com](https://git-scm.com/) |
| **npm** | 9+ | Package manager | Included with Node.js |
| **pip** | Latest | Python package manager | Included with Python |

### Required Accounts & API Keys

| Service | Purpose | Free Tier | Sign Up |
|---------|---------|-----------|---------|
| **Anthropic** | Claude AI API | Pay-per-use (~$1-5/month for testing) | [console.anthropic.com](https://console.anthropic.com) |
| **Sentry** (Optional) | Error tracking | 5,000 errors/month | [sentry.io](https://sentry.io) |
| **Render** (Deploy) | Backend hosting | 750 hours/month | [render.com](https://render.com) |
| **Vercel** (Deploy) | Frontend hosting | 100 GB bandwidth/month | [vercel.com](https://vercel.com) |
| **Snyk** (Optional) | Security scanning | Unlimited for open source | [snyk.io](https://snyk.io) |

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/care-plan-generator.git
cd care-plan-generator
```

### 2. Get Your Anthropic API Key

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up or log in
3. Navigate to **API Keys** section
4. Click **"Create Key"**
5. Give it a name (e.g., "Care Plan Generator Dev")
6. Copy the key (starts with `sk-ant-...`)
7. ⚠️ **IMPORTANT**: Save it now - you can't view it again!

### 3. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
# Copy .env.example and fill in your API key
```

Create `backend/.env`:
```bash
ANTHROPIC_API_KEY=sk-ant-your-key-here
CORS_ORIGINS=http://localhost:5173
ENVIRONMENT=development
LOG_LEVEL=INFO
```

**Start the backend:**
```bash
uvicorn app.main:app --reload --host 0.0.0.0
```

✅ Backend running at **http://localhost:8000**

### 4. Frontend Setup

Open a **new terminal** (keep backend running):

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
# Copy .env.example
```

Create `frontend/.env`:
```bash
VITE_API_URL=http://localhost:8000
VITE_ENVIRONMENT=development
```

**Start the frontend:**
```bash
npm run dev
```

✅ Frontend running at **http://localhost:5173**

### 5. Test the Application

1. Open **http://localhost:5173** in your browser
2. Click **"Load Example"** to fill the form with mock patient data
3. Click **"Generate Care Plan"**
4. Wait 5-10 seconds for AI generation
5. View the comprehensive care plan!

**Try the 5 mock patients:**
- Sarah Johnson (Post-stroke + diabetes)
- Robert Martinez (CHF + renal disease)
- Margaret Williams (Hip fracture post-surgery)
- James Brown (COPD + pneumonia)
- Dorothy Anderson (Dementia + UTI)

---

## 🛠️ Development Guide

### Project Structure

```
care-plan-generator/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── PatientForm.tsx        # Main input form
│   │   │   ├── CarePlanDisplay.tsx    # Care plan output
│   │   │   └── SearchableSelect.tsx   # Custom dropdown component
│   │   ├── services/
│   │   │   └── api.ts                 # API client
│   │   ├── data/
│   │   │   ├── mockPatients.ts        # 5 test patients
│   │   │   └── presets.ts             # Preset options (symptoms, risks, etc.)
│   │   ├── types/
│   │   │   └── index.ts               # TypeScript types
│   │   ├── App.tsx                    # Main component + routing
│   │   ├── main.tsx                   # Entry point
│   │   └── index.css                  # Global styles
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── vercel.json                    # Vercel deployment config
│   └── .env.example
│
├── backend/
│   ├── app/
│   │   ├── main.py                    # FastAPI entry point
│   │   ├── config.py                  # Configuration management
│   │   ├── models.py                  # Pydantic models
│   │   ├── services/
│   │   │   ├── claude_client.py       # Anthropic API wrapper
│   │   │   └── care_plan_service.py   # Business logic
│   │   └── utils/
│   │       └── logger.py              # Logging utility
│   ├── tests/
│   │   └── test_api.py                # API tests (example)
│   ├── requirements.txt
│   ├── pyproject.toml                 # Ruff configuration
│   ├── render.yaml                    # Render deployment config
│   └── .env.example
│
├── .github/
│   ├── workflows/
│   │   └── ci.yml                     # CI/CD pipeline
│   └── SNYK_SETUP.md                  # Snyk setup guide
│
├── .coderabbit.yaml                   # CodeRabbit configuration
├── .pre-commit-config.yaml            # Pre-commit hooks
├── CODE_QUALITY_SETUP.md              # Code quality tools guide
├── SENTRY_SETUP.md                    # Sentry monitoring guide
├── DEPLOYMENT_GUIDE.md                # Production deployment guide
├── README.md                          # This file
└── .gitignore
```

### Development Commands

#### Backend Commands

```bash
# Activate virtual environment first!
cd backend

# Run development server
uvicorn app.main:app --reload --host 0.0.0.0

# Run linting
ruff check .

# Run formatting
ruff format .

# Run type checking
mypy app/

# Run tests
pytest

# Update dependencies
pip freeze > requirements.txt
```

#### Frontend Commands

```bash
cd frontend

# Run development server
npm run dev

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Run type checking
npm run type-check

# Format code
npm run format

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables

#### Backend (`.env`)

```bash
# Required
ANTHROPIC_API_KEY=sk-ant-your-key-here          # From console.anthropic.com

# CORS (comma-separated origins)
CORS_ORIGINS=http://localhost:5173,http://localhost:3000

# Environment
ENVIRONMENT=development                          # development | production
LOG_LEVEL=INFO                                   # DEBUG | INFO | WARNING | ERROR

# Optional - Monitoring
SENTRY_DSN=https://your-dsn@sentry.io/project    # From sentry.io (see SENTRY_SETUP.md)
```

#### Frontend (`.env`)

```bash
# Required
VITE_API_URL=http://localhost:8000              # Backend URL

# Environment
VITE_ENVIRONMENT=development                     # development | production

# Optional - Monitoring
VITE_SENTRY_DSN=https://your-dsn@sentry.io/project  # From sentry.io (see SENTRY_SETUP.md)
```

---

## 🧪 Testing

### Manual Testing with Mock Patients

The application includes **5 comprehensive mock patients** for testing:

1. **Load Example**: Click "Load Example" button in the form
2. **Select Patient**: Choose from dropdown (Sarah, Robert, Margaret, James, Dorothy)
3. **Review Data**: All fields auto-filled with realistic data
4. **Generate**: Click "Generate Care Plan"
5. **Verify Output**: Check for NANDA diagnoses, goals, interventions, risk assessments

### Backend Testing

```bash
cd backend
pytest                          # Run all tests
pytest -v                       # Verbose output
pytest tests/test_api.py       # Run specific file
pytest --cov=app               # With coverage report
```

**Test Health Check:**
```bash
curl http://localhost:8000/health
# Expected: {"status":"healthy","environment":"development"}
```

**Test Care Plan Generation:**
```bash
# See backend/tests/mock_patients/ for full curl examples
curl -X POST http://localhost:8000/generate-care-plan \
  -H "Content-Type: application/json" \
  -d @backend/tests/mock_patients/patient1.json
```

### Frontend Testing

```bash
cd frontend
npm run test                    # Run tests
npm run test:watch             # Watch mode
npm run test:coverage          # With coverage
```

---

## ✅ Code Quality

This project uses **comprehensive code quality tools** to maintain high standards.

### Pre-commit Hooks (Automated)

**What it does**: Runs linting, formatting, and type checking before each commit.

**Setup** (one-time):
```bash
# Install pre-commit
pip install pre-commit

# Install hooks
pre-commit install
```

**Usage**: Just commit normally! Hooks run automatically.
```bash
git add .
git commit -m "feat: add new feature"
# Hooks run automatically and auto-fix issues
```

### CodeRabbit (AI Code Review)

**What it does**: AI reviews your pull requests for security, performance, best practices.

**Setup**: See [CODE_QUALITY_SETUP.md](./CODE_QUALITY_SETUP.md) for detailed instructions.

### Manual Code Quality Checks

```bash
# Backend
cd backend
ruff check .          # Linting
ruff format .         # Formatting
mypy app/             # Type checking

# Frontend
cd frontend
npm run lint          # Linting (ESLint)
npm run format        # Formatting (Prettier)
npm run type-check    # Type checking (TypeScript)
```

### CI/CD Pipeline

**Automated checks on every push and PR:**
- ✅ Backend linting (Ruff)
- ✅ Frontend linting (ESLint)
- ✅ Backend type checking (MyPy)
- ✅ Frontend type checking (TypeScript)
- ✅ Security scanning (Snyk)
- ✅ Build testing

**See full pipeline**: `.github/workflows/ci.yml`

### Code Standards

**Python (Backend):**
- PEP 8 style guide
- Type hints for all functions
- Maximum line length: 100 characters
- Docstrings for public functions (Google style)
- Cyclomatic complexity < 10

**TypeScript/React (Frontend):**
- Airbnb style guide (via ESLint)
- TypeScript strict mode
- CamelCase for variables/functions
- PascalCase for components
- Functional components with hooks

**Git Commits:**
- Conventional commits format: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`
- Keep messages concise and descriptive

**For complete code quality setup guide**: See [CODE_QUALITY_SETUP.md](./CODE_QUALITY_SETUP.md)

---

## 📊 Monitoring

### Sentry Integration (Error Tracking + Performance)

**What it monitors:**
- ✅ Backend API errors and exceptions
- ✅ Frontend JavaScript errors
- ✅ React component errors
- ✅ Network request failures
- ✅ Performance metrics (slow endpoints, page loads)
- ✅ User session replay (see what user did before error)

**Setup**: See [SENTRY_SETUP.md](./SENTRY_SETUP.md) for step-by-step instructions.

**Quick Summary:**
1. Create Sentry account at [sentry.io](https://sentry.io)
2. Create **two projects**: backend (Python) and frontend (React)
3. Get DSN keys for both
4. Add to `.env` files (both backend and frontend)
5. Uncomment Sentry initialization code
6. Restart servers

**Free Tier**: 5,000 errors/month, 10,000 performance units

---

## 🚀 Deployment

### Production Deployment (Render + Vercel)

**Complete deployment guide**: See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

### Quick Deployment Summary

#### Backend → Render

1. **Sign up**: [render.com](https://render.com) with GitHub
2. **Create Web Service**: Connect repository, select `care-plan-generator`
3. **Configure**:
   - Root Directory: `backend`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. **Environment Variables**: Add `ANTHROPIC_API_KEY`, `CORS_ORIGINS`, etc.
5. **Deploy**: Automatic from `main` branch

**Backend URL**: `https://your-app.onrender.com`

#### Frontend → Vercel

1. **Sign up**: [vercel.com](https://vercel.com) with GitHub
2. **Import Project**: Select `care-plan-generator` repository
3. **Configure**:
   - Framework: `Vite`
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **Environment Variables**: Add `VITE_API_URL`, `VITE_SENTRY_DSN`
5. **Deploy**: Automatic from `main` branch

**Frontend URL**: `https://your-app.vercel.app`

#### Update CORS

After deployment, update backend `CORS_ORIGINS` in Render:
```
CORS_ORIGINS=https://your-app.vercel.app
```

### Deployment Checklist

- [ ] Anthropic API key obtained
- [ ] Backend deployed to Render
- [ ] Frontend deployed to Vercel
- [ ] Environment variables configured (both services)
- [ ] CORS properly set (frontend URL in backend CORS_ORIGINS)
- [ ] Health check works: `https://your-backend.onrender.com/health`
- [ ] End-to-end test successful
- [ ] (Optional) Sentry monitoring enabled
- [ ] (Optional) Custom domain configured

**For detailed deployment instructions**: See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

---

## 📚 API Documentation

### Automatic API Docs (FastAPI)

Once the backend is running, visit:

- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
  - Interactive API documentation
  - Test endpoints directly in browser
  - See request/response schemas

- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)
  - Clean, readable documentation
  - Better for reference

### Endpoints

#### `GET /health`
Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "environment": "development"
}
```

#### `POST /generate-care-plan`
Generate AI care plan from patient data.

**Request Body**: See `PatientInput` model in `backend/app/models.py`

**Response**: HTML-formatted care plan string

**Example**: See mock patients in `frontend/src/data/mockPatients.ts`

---

## 🗂️ Project Structure

### Backend Architecture

```
backend/app/
├── main.py                     # FastAPI app + CORS + routes
├── config.py                   # Settings (from .env)
├── models.py                   # Pydantic models (validation)
├── services/
│   ├── claude_client.py        # Anthropic API wrapper
│   └── care_plan_service.py    # Prompt engineering + logic
└── utils/
    └── logger.py               # Structured logging
```

**Key Design Decisions:**
- **Modular services**: Easy to swap AI providers or add features
- **Pydantic validation**: Strong typing + automatic validation
- **Configuration management**: All settings in one place
- **Separation of concerns**: API, business logic, AI client are separate

### Frontend Architecture

```
frontend/src/
├── main.tsx                    # Entry point (React root)
├── App.tsx                     # Main component + routing
├── components/
│   ├── PatientForm.tsx         # Input form with validation
│   ├── CarePlanDisplay.tsx     # Care plan output display
│   └── SearchableSelect.tsx    # Custom dropdown component
├── services/
│   └── api.ts                  # API client (Axios)
├── data/
│   ├── mockPatients.ts         # 5 test patients
│   └── presets.ts              # Preset options (40+ symptoms, etc.)
├── types/
│   └── index.ts                # TypeScript types
└── index.css                   # Global styles + Tailwind
```

**Key Design Decisions:**
- **Component-based**: Reusable, testable components
- **React Router**: Proper browser navigation (back/forward works)
- **Type safety**: Full TypeScript coverage
- **Preset data**: Faster, more consistent data entry
- **Custom components**: SearchableSelect for better UX

---

## 🆘 Troubleshooting

### Common Issues

#### Backend Issues

**Problem**: `ModuleNotFoundError` when starting backend
```bash
# Solution: Ensure virtual environment is activated
cd backend
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Then install dependencies again:
pip install -r requirements.txt
```

**Problem**: Backend returns 500 error on `/generate-care-plan`
```bash
# Check backend logs for detailed error
# Common causes:
# 1. Invalid/expired Anthropic API key → Check .env file
# 2. SSL certificate issues → See backend/app/services/claude_client.py (SSL verification disabled for local dev)
# 3. Insufficient API credits → Check console.anthropic.com
```

**Problem**: `ImportError: No module named 'anthropic'`
```bash
# Solution: Install dependencies
pip install -r requirements.txt

# If still failing, try upgrading pip:
python -m pip install --upgrade pip
pip install -r requirements.txt
```

#### Frontend Issues

**Problem**: `ERR_CONNECTION_REFUSED` when accessing localhost:5173
```bash
# Solution: Start frontend with --host flag
cd frontend
npm run dev -- --host 0.0.0.0

# Then access via IP address shown in terminal
# Example: http://10.5.0.2:5173 or http://172.20.1.128:5173
```

**Problem**: CORS error when calling backend
```bash
# Solution: Check CORS_ORIGINS in backend .env
# Must include frontend URL
CORS_ORIGINS=http://localhost:5173

# If using IP address, update:
CORS_ORIGINS=http://10.5.0.2:5173,http://localhost:5173
```

**Problem**: Environment variables not loading
```bash
# Solution: Restart dev server after changing .env
# Vite loads .env only on startup

# Check .env file is named correctly (not .env.txt)
# Check .env is in frontend/ directory
```

**Problem**: Build fails with TypeScript errors
```bash
# Solution: Run type checking to see errors
npm run type-check

# Fix type errors, then build again
npm run build
```

#### API Key Issues

**Problem**: "Invalid API key" error
```bash
# Solution: Verify API key in backend/.env
# Key should start with sk-ant-

# Test API key separately:
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: your-key-here" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{"model":"claude-sonnet-4-20250514","max_tokens":100,"messages":[{"role":"user","content":"Hello"}]}'

# If this fails, regenerate API key at console.anthropic.com
```

**Problem**: "Insufficient credits" error
```bash
# Solution: Add credits to your Anthropic account
# Go to console.anthropic.com → Billing → Add credits
# Minimum: $5 (enough for ~500 care plan generations)
```

#### Development Issues

**Problem**: Pre-commit hooks failing
```bash
# Solution: Run hooks manually to see errors
pre-commit run --all-files

# Auto-fix many issues:
ruff check --fix backend/
npm run lint:fix  # in frontend/

# Then commit again
```

**Problem**: Tests failing
```bash
# Backend tests:
cd backend
pytest -v  # See detailed output

# Frontend tests:
cd frontend
npm run test  # See errors
```

### Getting More Help

1. **Check logs**:
   - Backend: Terminal running uvicorn
   - Frontend: Browser console (F12)
   - Sentry: Dashboard at sentry.io

2. **Enable debug logging**:
   ```bash
   # Backend .env
   LOG_LEVEL=DEBUG
   ```

3. **API Documentation**: [http://localhost:8000/docs](http://localhost:8000/docs)

4. **Setup Guides**:
   - [CODE_QUALITY_SETUP.md](./CODE_QUALITY_SETUP.md)
   - [SENTRY_SETUP.md](./SENTRY_SETUP.md)
   - [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
   - [.github/SNYK_SETUP.md](./.github/SNYK_SETUP.md)

5. **GitHub Issues**: Open an issue with:
   - Error message
   - Steps to reproduce
   - Backend/frontend logs
   - Environment (OS, Python/Node versions)

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Development Workflow

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub
   git clone https://github.com/your-username/care-plan-generator.git
   cd care-plan-generator
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

3. **Make your changes**
   - Follow code style guidelines (see [Code Quality](#-code-quality))
   - Add tests for new features
   - Update documentation if needed

4. **Run quality checks**
   ```bash
   # Backend
   cd backend
   ruff check .
   mypy app/
   pytest

   # Frontend
   cd frontend
   npm run lint
   npm run type-check
   npm run test
   ```

5. **Commit with conventional commits**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   # or: fix:, docs:, refactor:, test:, chore:
   ```

6. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   # Then create Pull Request on GitHub
   ```

7. **Wait for CI checks**
   - GitHub Actions runs all checks automatically
   - CodeRabbit reviews your code (if configured)
   - Address any feedback

8. **Get approval and merge**

### Code Style

- **Backend**: PEP 8, type hints, docstrings (Google style)
- **Frontend**: Airbnb style guide, TypeScript strict mode
- **Commits**: Conventional commits (`feat:`, `fix:`, etc.)

### What to Contribute

- 🐛 Bug fixes
- ✨ New features (discuss in issue first)
- 📝 Documentation improvements
- 🧪 Tests (increase coverage)
- 🎨 UI/UX enhancements
- ♿ Accessibility improvements
- 🌐 Internationalization

### Code of Conduct

- Be respectful and professional
- Provide constructive feedback
- Focus on the code, not the person
- Help others learn and grow

---

## 📄 License

MIT License - See [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Anthropic** - For Claude AI API
- **FastAPI** - For the excellent Python framework
- **Vite** - For lightning-fast build tooling
- **React** - For the UI library
- **Healthcare Professionals** - For domain expertise

---

## 📧 Support

- **Documentation**: You're reading it! 📖
- **Issues**: [GitHub Issues](https://github.com/your-username/care-plan-generator/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/care-plan-generator/discussions)

---

## 🗺️ Roadmap

Future enhancements (not in current scope):

- [ ] User authentication (login/logout)
- [ ] Save care plans to database
- [ ] Care plan history and versioning
- [ ] Export to PDF
- [ ] Email care plans
- [ ] Multi-language support
- [ ] Voice input for patient data
- [ ] Integration with EHR systems
- [ ] Mobile app (React Native)
- [ ] Offline mode (PWA)

---

**Built with ❤️ using Claude AI**

**Project Status**: ✅ Production Ready (Phase 9 Complete)

**Last Updated**: 2026-02-17

---

## 📊 Project Statistics

- **Backend**: ~800 lines of Python
- **Frontend**: ~1,200 lines of TypeScript/TSX
- **Mock Data**: 5 comprehensive patient scenarios
- **Preset Options**: 150+ medical terms (symptoms, risks, comorbidities, allergies)
- **Documentation**: 2,000+ lines across guides
- **Test Coverage**: Backend tests included, frontend test structure ready
- **CI/CD**: 6 automated checks (linting, type checking, security)
- **Deployment**: Production-ready configs for Render + Vercel

---

**Quick Links:**
- [Getting Started](#-quick-start)
- [API Documentation](http://localhost:8000/docs)
- [Code Quality Setup](./CODE_QUALITY_SETUP.md)
- [Sentry Monitoring](./SENTRY_SETUP.md)
- [Deployment Guide](./DEPLOYMENT_GUIDE.md)
- [Snyk Security](./github/SNYK_SETUP.md)
