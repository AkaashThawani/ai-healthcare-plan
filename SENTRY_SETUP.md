# Sentry Monitoring Setup

Sentry provides real-time error tracking and performance monitoring for both frontend and backend.

## Why Sentry?

- ✅ Real-time error notifications
- ✅ Stack traces and context
- ✅ Performance monitoring
- ✅ User session replay (frontend)
- ✅ Free tier (up to 5,000 errors/month)

## Setup Steps

### 1. Create Sentry Account

1. Go to [sentry.io](https://sentry.io/signup/)
2. Sign up (free for small projects)
3. Choose **"Create a new organization"** or use existing

### 2. Create Projects

You need **TWO** projects (one for backend, one for frontend):

#### Backend Project

1. Click **"Create Project"**
2. Platform: **Python**
3. Project name: `care-plan-generator-backend`
4. Click **Create Project**
5. **Copy the DSN** (looks like: `https://xxxxx@o123456.ingest.sentry.io/7654321`)
6. Save this as `BACKEND_SENTRY_DSN`

#### Frontend Project

1. Click **"Create Project"** again
2. Platform: **React**
3. Project name: `care-plan-generator-frontend`
4. Click **Create Project**
5. **Copy the DSN** (different from backend!)
6. Save this as `FRONTEND_SENTRY_DSN`

### 3. Add DSN to Environment Variables

#### Backend (.env)

```bash
cd backend
# Edit .env file
SENTRY_DSN=https://your-backend-dsn@sentry.io/project-id
```

#### Frontend (.env)

```bash
cd frontend
# Edit .env file
VITE_SENTRY_DSN=https://your-frontend-dsn@sentry.io/project-id
```

### 4. Install Sentry SDKs

#### Backend

```bash
cd backend
# Uncomment sentry-sdk in requirements.txt
pip install sentry-sdk[fastapi]
```

#### Frontend

```bash
cd frontend
npm install @sentry/react
```

### 5. Initialize Sentry (Code Already Prepared)

The code is ready, just needs your DSN!

#### Backend (`backend/app/main.py`)

```python
# Uncomment these lines:
import sentry_sdk
from sentry_sdk.integrations.fastapi import FastApiIntegration

sentry_sdk.init(
    dsn=settings.sentry_dsn,
    environment=settings.environment,
    traces_sample_rate=1.0,
    integrations=[FastApiIntegration()],
)
```

#### Frontend (`frontend/src/main.tsx`)

```typescript
// Add at the top:
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.VITE_ENVIRONMENT,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
```

### 6. Test Error Tracking

#### Test Backend

```bash
# Add a test endpoint (or trigger an error)
curl http://localhost:8000/sentry-debug
```

#### Test Frontend

```javascript
// Add a button to trigger test error:
throw new Error("Sentry test error!");
```

Check your Sentry dashboard - you should see the error appear!

## What Sentry Tracks

### Backend

- ✅ API errors and exceptions
- ✅ Performance of endpoints
- ✅ Request/response context
- ✅ User context (if available)
- ✅ Environment info

### Frontend

- ✅ JavaScript errors
- ✅ React component errors
- ✅ Network errors (failed API calls)
- ✅ Performance metrics
- ✅ User session replay (see what user did before error)
- ✅ Breadcrumbs (user actions leading to error)

## Viewing Errors in Sentry

1. Go to [sentry.io](https://sentry.io)
2. Select your project
3. Click **Issues** to see errors
4. Click on an issue to see:
   - Full stack trace
   - User context
   - Device/browser info
   - Breadcrumbs (user actions)
   - Session replay (if enabled)

## Performance Monitoring

### Backend

Track slow API endpoints:

- Response times
- Database queries
- External API calls

### Frontend

Track slow page loads:

- Component render times
- Network requests
- User interactions

## Alerts

Set up alerts in Sentry:

1. Go to **Alerts** → **Create Alert**
2. Choose trigger (e.g., "New issue created")
3. Choose action (e.g., email, Slack, webhook)
4. Save alert

Get notified immediately when errors occur!

## Optional: Disable for Development

If you don't want Sentry in development:

**Backend (.env)**

```bash
SENTRY_DSN=  # Leave empty
```

**Frontend (.env)**

```bash
VITE_SENTRY_DSN=  # Leave empty
```

The code will check if DSN exists before initializing.

## Cost

- **Free Tier**: 5,000 errors/month, 10,000 performance units
- **Paid Tiers**: Start at $26/month for more volume

For this prototype, free tier is more than enough!

## Troubleshooting

**Errors not showing up:**

- Check DSN is correct
- Verify Sentry is initialized before app code runs
- Check network requests in browser dev tools
- Ensure CORS allows sentry.io

**Too many errors:**

- Adjust sample rates (tracesSampleRate, etc.)
- Add filters in Sentry dashboard
- Ignore known issues

## Security

- ⚠️ Don't commit DSN to git (use .env files)
- ⚠️ DSN is public in frontend (that's OK, it's design)
- ⚠️ Don't log sensitive data (passwords, tokens)

## Need Help?

- Sentry Docs: <https://docs.sentry.io>
- React Setup: <https://docs.sentry.io/platforms/javascript/guides/react/>
- FastAPI Setup: <https://docs.sentry.io/platforms/python/integrations/fastapi/>
