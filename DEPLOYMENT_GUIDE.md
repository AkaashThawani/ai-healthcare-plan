# Deployment Guide

This guide walks you through deploying the Care Plan Generator to production using Render (backend) and Vercel (frontend).

## Overview

- **Backend**: Deployed to Render (FastAPI + Python)
- **Frontend**: Deployed to Vercel (React + Vite)
- **Cost**: Both have generous free tiers perfect for prototypes

---

## Prerequisites

Before deploying, ensure you have:

1. ✅ GitHub repository with your code pushed
2. ✅ Anthropic API key (from console.anthropic.com)
3. ✅ (Optional) Sentry account and DSN keys
4. ✅ All code committed and pushed to `main` branch

---

## Part 1: Deploy Backend to Render

### 1.1 Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up with your GitHub account (recommended)
3. Authorize Render to access your repositories

### 1.2 Create New Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Select the `care-plan-generator` repository
4. Configure the service:

   **Basic Settings:**
   - Name: `care-plan-generator-backend`
   - Region: `Oregon (US West)` (or your preferred region)
   - Branch: `main`
   - Root Directory: `backend` ⚠️ **IMPORTANT**
   - Runtime: `Python 3`

   **Build Settings:**
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

   **Plan:**
   - Select **Free** tier (upgrade later if needed)

5. Click **"Create Web Service"**

### 1.3 Configure Environment Variables

Once the service is created:

1. Go to **"Environment"** tab
2. Add the following variables:

   **Required:**
   ```
   ANTHROPIC_API_KEY = your-anthropic-api-key-here
   ENVIRONMENT = production
   LOG_LEVEL = INFO
   CORS_ORIGINS = https://your-frontend-domain.vercel.app
   ```

   **Optional (if using Sentry):**
   ```
   SENTRY_DSN = your-backend-sentry-dsn-here
   ```

3. Click **"Save Changes"**
4. The service will automatically redeploy

### 1.4 Wait for Deployment

- First deployment takes 2-5 minutes
- Watch the logs in the **"Logs"** tab
- Look for: `Uvicorn running on http://0.0.0.0:...`
- Once deployed, you'll see your backend URL: `https://care-plan-generator-backend.onrender.com`

### 1.5 Test Backend

```bash
# Test health check
curl https://your-backend-url.onrender.com/health

# Expected response:
# {"status":"healthy","environment":"production"}
```

**⚠️ Important Notes:**
- Free tier spins down after 15 minutes of inactivity
- First request after spin-down takes ~30-60 seconds (cold start)
- Upgrade to Starter plan ($7/month) to keep it always running

---

## Part 2: Deploy Frontend to Vercel

### 2.1 Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account (recommended)
3. Authorize Vercel to access your repositories

### 2.2 Import Project

1. Click **"Add New..."** → **"Project"**
2. Import your `care-plan-generator` repository
3. Configure the project:

   **Build Settings:**
   - Framework Preset: `Vite`
   - Root Directory: `frontend` ⚠️ **IMPORTANT**
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. Click **"Deploy"** (don't set environment variables yet)

### 2.3 Configure Environment Variables

After the first deployment:

1. Go to **Settings** → **Environment Variables**
2. Add the following variables:

   **Required:**
   ```
   VITE_API_URL = https://your-backend-url.onrender.com
   VITE_ENVIRONMENT = production
   ```

   **Optional (if using Sentry):**
   ```
   VITE_SENTRY_DSN = your-frontend-sentry-dsn-here
   ```

3. **IMPORTANT**: Select **"Production"**, **"Preview"**, and **"Development"** for each variable
4. Click **"Save"**

### 2.4 Redeploy with Environment Variables

1. Go to **Deployments** tab
2. Click the **"..."** menu on the latest deployment
3. Click **"Redeploy"**
4. Wait 1-2 minutes for deployment

### 2.5 Update Backend CORS

Now that you have your frontend URL:

1. Go back to **Render Dashboard**
2. Select your backend service
3. Go to **Environment** tab
4. Update `CORS_ORIGINS`:
   ```
   CORS_ORIGINS = https://your-frontend-domain.vercel.app
   ```
5. Save and wait for automatic redeploy

### 2.6 Test Frontend

1. Visit your Vercel URL: `https://your-frontend-domain.vercel.app`
2. Fill out the patient form
3. Click **"Generate Care Plan"**
4. Verify it works end-to-end

---

## Part 3: Configure Custom Domain (Optional)

### 3.1 Frontend Custom Domain

1. In Vercel, go to **Settings** → **Domains**
2. Add your custom domain (e.g., `careplan.yourdomain.com`)
3. Follow DNS configuration instructions
4. Wait for SSL certificate (automatic)

### 3.2 Backend Custom Domain

1. In Render, go to **Settings** → **Custom Domain**
2. Add your custom domain (e.g., `api.yourdomain.com`)
3. Add the provided CNAME record to your DNS
4. Wait for SSL certificate (automatic)

### 3.3 Update CORS After Custom Domain

If you add a custom frontend domain:

1. Update `CORS_ORIGINS` in Render backend environment variables
2. Update to: `https://careplan.yourdomain.com`
3. Save and redeploy

---

## Part 4: Monitoring Setup

### 4.1 Enable Sentry (Recommended)

If you haven't already:

1. Follow [SENTRY_SETUP.md](./SENTRY_SETUP.md)
2. Add Sentry DSN to both Render and Vercel environment variables
3. Redeploy both services

### 4.2 Set Up Alerts

**Render:**
1. Go to your backend service → **Settings** → **Notifications**
2. Enable email notifications for deploy failures

**Vercel:**
1. Go to **Settings** → **Notifications**
2. Enable deploy and error notifications

---

## Part 5: CI/CD Integration

Your GitHub Actions workflow is already configured! It will:

- ✅ Run on every push to `main`
- ✅ Run on every pull request
- ✅ Lint and type-check code
- ✅ Run security scans

**To enable Snyk security scanning:**
1. Follow [.github/SNYK_SETUP.md](./.github/SNYK_SETUP.md)
2. Add `SNYK_TOKEN` to GitHub repository secrets

---

## Deployment Workflow

### Development → Production

```bash
# 1. Work on a feature branch
git checkout -b feature/my-feature

# 2. Make changes and commit
git add .
git commit -m "feat: add new feature"

# 3. Push and create PR
git push origin feature/my-feature

# 4. GitHub Actions runs checks automatically
# - Linting (Ruff, ESLint)
# - Type checking (MyPy, TypeScript)
# - Security scan (Snyk)

# 5. After PR approval, merge to main
# (via GitHub UI)

# 6. Automatic deployment
# - Render deploys backend automatically
# - Vercel deploys frontend automatically

# 7. Monitor deployment
# - Check Render logs
# - Check Vercel deployment logs
# - Check Sentry for errors
```

---

## Troubleshooting

### Backend Issues

**Problem:** Render deployment fails with "ModuleNotFoundError"
```bash
# Solution: Check requirements.txt includes all dependencies
pip freeze > requirements.txt
git add requirements.txt
git commit -m "fix: update requirements.txt"
git push
```

**Problem:** Backend returns 500 errors
```bash
# Check Render logs:
# 1. Go to Render dashboard
# 2. Click your backend service
# 3. View "Logs" tab
# 4. Look for Python exceptions
```

**Problem:** "cold start" delays on free tier
```bash
# Solutions:
# 1. Upgrade to Starter plan ($7/month) to keep always-on
# 2. Use a service like UptimeRobot to ping your health check every 5 minutes
# 3. Accept the delay (first request takes ~60 seconds)
```

### Frontend Issues

**Problem:** API calls fail with CORS error
```bash
# Solution: Check CORS_ORIGINS in Render backend
# Must match your Vercel URL exactly (including https://)
CORS_ORIGINS = https://your-frontend.vercel.app
```

**Problem:** Environment variables not working
```bash
# Solution: Redeploy after adding environment variables
# 1. Go to Vercel Deployments
# 2. Click "..." on latest deployment
# 3. Click "Redeploy"
```

**Problem:** 404 on page refresh (React Router)
```bash
# Already handled by vercel.json rewrites!
# If still issues, check vercel.json is in frontend/ directory
```

### General Issues

**Problem:** Deployment succeeds but app doesn't work
```bash
# Checklist:
# 1. Check all environment variables are set correctly
# 2. Verify backend health check: https://your-backend.onrender.com/health
# 3. Check browser console for errors
# 4. Check Render logs for backend errors
# 5. Check Sentry dashboard for errors
```

---

## Scaling & Performance

### Free Tier Limits

**Render Free Tier:**
- 750 hours/month (enough for 1 service running 24/7)
- Spins down after 15 minutes inactivity
- 512 MB RAM
- Shared CPU

**Vercel Free Tier:**
- 100 GB bandwidth/month
- Unlimited deployments
- Automatic SSL
- Global CDN

### When to Upgrade

Upgrade when you need:
- **Render Starter ($7/month)**: Always-on, no cold starts, 512 MB RAM
- **Render Standard ($25/month)**: 2 GB RAM, faster CPU
- **Vercel Pro ($20/month)**: More bandwidth, better support

### Performance Optimization

**Backend (Render):**
- Enable response caching (if adding Redis)
- Use connection pooling for database (if adding DB)
- Monitor slow endpoints with Sentry performance

**Frontend (Vercel):**
- Already optimized! Vercel handles:
  - Static asset caching
  - Brotli compression
  - Global CDN
  - HTTP/2

---

## Security Checklist

Before going live:

- [ ] All API keys in environment variables (not in code)
- [ ] CORS configured with specific domains (not "*")
- [ ] HTTPS enabled (automatic with Render/Vercel)
- [ ] Security headers configured (already in vercel.json)
- [ ] Sentry error tracking enabled
- [ ] No sensitive data in logs
- [ ] Snyk security scanning enabled
- [ ] Branch protection rules enabled on GitHub

---

## Cost Breakdown

### Free Tier (Total: $0/month)
- Render: Free (with cold starts)
- Vercel: Free
- Sentry: Free (5,000 errors/month)
- GitHub Actions: Free (2,000 minutes/month)
- Anthropic API: Pay-per-use (~$1-5/month for testing)

### Production Tier (Total: ~$30/month)
- Render Starter: $7/month
- Vercel Pro: $20/month
- Sentry: Free tier sufficient
- Anthropic API: ~$10-50/month (depends on usage)

---

## Next Steps After Deployment

1. **Set up monitoring alerts** (Sentry, Render notifications)
2. **Add analytics** (optional: Google Analytics, PostHog)
3. **Create user documentation** (how to use the care plan generator)
4. **Set up automated backups** (if you add database)
5. **Configure rate limiting** (if you get high traffic)
6. **Add authentication** (if you want to restrict access)

---

## Useful Links

- **Render Documentation**: https://render.com/docs
- **Vercel Documentation**: https://vercel.com/docs
- **FastAPI Deployment Guide**: https://fastapi.tiangolo.com/deployment/
- **Vite Production Build**: https://vitejs.dev/guide/build.html

---

## Need Help?

- **Render Support**: https://render.com/docs/support
- **Vercel Support**: https://vercel.com/support
- **GitHub Issues**: Create an issue in your repository

---

**Deployment Status Checklist:**

- [ ] Render account created
- [ ] Backend deployed to Render
- [ ] Backend health check works
- [ ] Vercel account created
- [ ] Frontend deployed to Vercel
- [ ] Environment variables configured (both services)
- [ ] CORS properly configured
- [ ] End-to-end test successful
- [ ] Sentry monitoring enabled
- [ ] GitHub Actions CI/CD working
- [ ] Custom domain configured (optional)

Once all checkboxes are complete, your application is live! 🚀
