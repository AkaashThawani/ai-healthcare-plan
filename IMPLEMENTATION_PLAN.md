# AI-Powered Care Plan Generator - Implementation Plan

## Context
Building a production-ready AI healthcare application for skilled nursing facilities. Healthcare staff input patient data, and Claude AI generates comprehensive care plans with interventions, monitoring schedules, and clinical guidelines.

**Why this project?**
- Demonstrates AI-native healthcare development with full observability
- Shows best practices for production-ready prototypes
- Integrates modern DevOps, monitoring, and code quality tools
- Serves as a portfolio piece for healthcare + AI development

## Project Scope

### Core Application
- **Frontend**: React + Vite + TypeScript + Tailwind CSS + shadcn/ui
- **Backend**: Python FastAPI + Anthropic Claude API
- **AI Model**: claude-sonnet-4-20250514

### Infrastructure & Tooling
- **Monitoring**: Sentry (frontend + backend error tracking, performance)
- **CI/CD**: GitHub Actions (linting, type checking, security scanning)
- **Code Quality**: ESLint, Ruff, MyPy, TypeScript, Snyk, CodeRabbit
- **Deployment**: Render (backend), Vercel (frontend)
- **Version Control**: GitHub with branch protection and PR templates

### Key Features
1. Patient data input form with comprehensive validation
2. AI-powered care plan generation using Claude
3. Structured care plan output (diagnoses, goals, interventions, risks)
4. Print-friendly formatting
5. Mock patient examples for testing
6. Health check endpoints
7. Comprehensive error handling and logging

## Architecture Decisions (User Confirmed)

### Repository Structure
**✅ MONOREPO**: Single repository with `/frontend` and `/backend` directories
- Easier to manage for prototype
- Single CI/CD pipeline
- Unified version control
- Simple deployment coordination

### Complexity Level
**✅ KEEP IT SIMPLE**: Clean, minimal implementations
- No over-engineering
- Standard patterns, no fancy abstractions
- Focus on clarity over cleverness
- Modular structure for easy enhancement later

### Modularity Approach
**✅ BUILD FOR EXTENSIBILITY**: Simple now, extensible later
- Backend: Separate services (`claude_client.py`, `care_plan_service.py`)
- Frontend: Component-based (easy to add features)
- Clear separation of concerns
- Easy to add complexity/depth when needed

### Build Order
**✅ BACKEND FIRST, THEN FRONTEND**:
1. **Phase 1**: Project foundation (repo setup, structure)
2. **Phase 2**: Backend complete and tested (API working with Postman/curl)
3. **Phase 3**: Frontend complete (connects to working backend)
4. **Phase 4**: Local testing end-to-end
5. **Phases 5-11**: Infrastructure, monitoring, docs

## Simplified Project Structure (Monorepo)

```
care-plan-generator/                 # Root (monorepo)
├── .git/                           # Version control
├── .github/
│   └── workflows/
│       └── ci.yml                  # CI/CD pipeline (both FE + BE)
├── frontend/                       # React application
│   ├── src/
│   │   ├── components/            # Simple, reusable components
│   │   ├── services/              # API client (modular)
│   │   ├── types/                 # TypeScript types
│   │   ├── data/                  # Mock data
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── .env.example
│   └── vercel.json
├── backend/                        # FastAPI application
│   ├── app/
│   │   ├── main.py                # Entry point (simple, clean)
│   │   ├── models.py              # Pydantic models
│   │   ├── config.py              # Configuration
│   │   ├── services/              # Modular services
│   │   │   ├── claude_client.py   # Anthropic API wrapper
│   │   │   └── care_plan_service.py  # Business logic
│   │   └── utils/
│   │       └── logger.py          # Logging utility
│   ├── tests/
│   │   └── test_api.py            # Example test
│   ├── requirements.txt
│   ├── pyproject.toml             # Ruff config
│   ├── .env.example
│   └── render.yaml
├── .gitignore                      # Root gitignore
├── .coderabbit.yaml               # Code review config
└── README.md                       # Comprehensive docs
```

## Implementation Phases (11 Total)

### **Phase 1: Project Foundation** (30 min)
- Initialize git repository
- Create folder structure (frontend/, backend/)
- Root .gitignore
- README.md skeleton
- .env.example files

### **Phase 2: Backend Development** ⭐ (1-2 hours)
- FastAPI setup
- Pydantic models (modular, clean)
- Claude API integration (separate service)
- Care plan generation logic (simple prompt, extensible)
- Health check endpoint
- CORS configuration
- Basic logging (no Sentry yet)
- Test with Postman/curl
- **Checkpoint**: Backend working independently

### **Phase 3: Frontend Development** (1-2 hours)
- Vite + React + TypeScript setup
- Simple form component
- API service (modular, easy to extend)
- Care plan display (clean, readable)
- Basic error handling
- Loading states
- **Checkpoint**: End-to-end flow working locally

### **Phase 4: Local Testing & Mock Data** (30 min)
- 3-5 realistic patient examples
- Test complete flow
- Fix bugs
- Print formatting

### **Phase 5: CI/CD Pipeline** (1 hour)
- GitHub Actions workflow
- Linting jobs (ruff, eslint)
- Type checking jobs (mypy, tsc)
- Security scanning setup (Snyk)

### **Phase 6: Monitoring Integration** (1 hour)
- Sentry SDK integration (backend + frontend)
- Error tracking configuration
- Performance monitoring

### **Phase 7: Code Quality Tools** (30 min)
- Pre-commit hooks configuration
- CodeRabbit configuration
- PR template creation

### **Phase 8: Deployment Configuration** (45 min)
- render.yaml for backend
- vercel.json for frontend
- Environment variable documentation

### **Phase 9: Documentation** (1-2 hours)
- Comprehensive README.md
- Code comments and docstrings
- API documentation

### **Phase 10: Example Tests** (30 min)
- Backend: Example pytest file
- Frontend: Example test file
- Test running instructions

### **Phase 11: Final Polish** (30 min)
- Code review and cleanup
- Verify all configs
- Final end-to-end testing

## Estimated Time
- **Phases 1-4 (Core App)**: 6-8 hours
- **Phases 5-11 (Infrastructure)**: 2-3 hours
- **Total**: 8-11 hours

## Success Criteria
- ✅ Application runs locally without errors
- ✅ Can submit patient data and receive AI-generated care plan
- ✅ Care plan is well-structured and clinically reasonable
- ✅ All linting and type checking passes
- ✅ CI/CD pipeline runs successfully
- ✅ README is comprehensive and easy to follow
- ✅ Code is simple, modular, and well-commented

---

**Plan Status**: Approved ✅
**Last Updated**: 2026-02-17
**Build Order**: Backend First → Frontend → Infrastructure
