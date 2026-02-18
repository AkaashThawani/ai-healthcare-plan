# AI-Powered Care Plan Generator

> A production-ready AI healthcare application for skilled nursing facilities. Healthcare staff input patient data, and Claude AI generates comprehensive care plans with interventions, monitoring schedules, and clinical guidelines.

## 🏗️ Tech Stack

**Frontend:**
- React 18 + Vite
- TypeScript
- Tailwind CSS
- Axios

**Backend:**
- Python FastAPI
- Anthropic Claude API (Sonnet 4)
- Pydantic for validation
- Uvicorn server

**Infrastructure:**
- GitHub Actions CI/CD
- Sentry (error tracking & performance)
- Render (backend deployment)
- Vercel (frontend deployment)

## 📋 Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.11+
- **Anthropic API Key** ([Get one here](https://console.anthropic.com))
- **Git**

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd care-plan-generator
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
```

Create `backend/.env` file:
```
ANTHROPIC_API_KEY=your_key_here
CORS_ORIGINS=http://localhost:5173
ENVIRONMENT=development
LOG_LEVEL=INFO
```

Run the backend:
```bash
uvicorn app.main:app --reload
```

Backend will be available at `http://localhost:8000`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create `frontend/.env` file:
```
VITE_API_URL=http://localhost:8000
VITE_ENVIRONMENT=development
```

Run the frontend:
```bash
npm run dev
```

Frontend will be available at `http://localhost:5173`

## 🧪 Testing

### Backend
```bash
cd backend
pytest
```

### Frontend
```bash
cd frontend
npm run test
```

## 📚 API Documentation

Once the backend is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## 🏥 Mock Patient Data

The application includes 5 realistic patient examples for testing:
1. Post-stroke patient with diabetes
2. CHF exacerbation with renal disease
3. Hip fracture post-surgery
4. COPD with pneumonia
5. Dementia with UTI

Load these from the frontend to test the care plan generation.

## 🔧 Development Workflow

1. **Linting:**
   - Backend: `ruff check backend/`
   - Frontend: `npm run lint`

2. **Type Checking:**
   - Backend: `mypy backend/app`
   - Frontend: `npm run type-check`

3. **Code Formatting:**
   - Backend: `ruff format backend/`
   - Frontend: `npm run format`

## 📦 Deployment

### Backend (Render)

1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Set build command: `pip install -r backend/requirements.txt`
4. Set start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables from `backend/.env.example`

### Frontend (Vercel)

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `cd frontend && vercel`
3. Follow the prompts
4. Add environment variables from `frontend/.env.example`

## 🔐 Security

- API keys stored in environment variables only
- CORS properly configured
- Input validation with Pydantic
- No sensitive data in logs
- Rate limiting on endpoints

## 📖 Project Structure

```
care-plan-generator/
├── frontend/          # React application
├── backend/           # FastAPI application
├── .github/           # CI/CD workflows
└── docs/              # Additional documentation
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Troubleshooting

**Backend won't start:**
- Check Python version: `python --version` (needs 3.11+)
- Verify virtual environment is activated
- Check `.env` file exists and has valid `ANTHROPIC_API_KEY`

**Frontend won't connect to backend:**
- Verify backend is running on port 8000
- Check `VITE_API_URL` in frontend `.env`
- Check browser console for CORS errors

**Care plan generation fails:**
- Verify Anthropic API key is valid
- Check API key has sufficient credits
- Review backend logs for error details

## 📧 Support

For issues and questions, please open a GitHub issue.

---

Built with ❤️ using Claude AI
