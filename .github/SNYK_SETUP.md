# Snyk Security Scanning Setup

Snyk provides automated security vulnerability scanning for your dependencies.

## Setup Steps

### 1. Create a Snyk Account

1. Go to [snyk.io](https://snyk.io)
2. Sign up with your GitHub account (recommended)
3. It's free for open source projects!

### 2. Get Your Snyk API Token

1. Log in to Snyk
2. Go to **Account Settings** (click your avatar → Account settings)
3. Scroll to **API Token** section
4. Click **Show** to reveal your token
5. Copy the token (starts with something like `snyk-xxxxx`)

### 3. Add Token to GitHub Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `SNYK_TOKEN`
5. Value: Paste your Snyk API token
6. Click **Add secret**

### 4. Verify Setup

After adding the secret:

1. Push a commit or create a PR
2. Go to **Actions** tab in GitHub
3. Check if the "Security Scan (Snyk)" job runs successfully
4. If it fails with authentication error, verify your token is correct

## What Snyk Checks

Snyk will scan for:

- ✅ Known vulnerabilities in npm packages (frontend)
- ✅ Known vulnerabilities in Python packages (backend)
- ✅ License compliance issues
- ✅ High-severity security issues

## CI/CD Integration

The Snyk scan:

- Runs on every push to main/master/develop
- Runs on every pull request
- Continues CI pipeline even if vulnerabilities found (`continue-on-error: true`)
- Only fails on **high-severity** vulnerabilities
- Uploads results to GitHub Security tab (if available)

## Local Testing

You can also run Snyk locally:

### Install Snyk CLI

```bash
npm install -g snyk
```

### Authenticate

```bash
snyk auth
```

### Scan Your Project

```bash
# Scan everything
snyk test --all-projects

# Scan only frontend
cd frontend && snyk test

# Scan only backend
cd backend && snyk test
```

## Viewing Results

### In GitHub

1. Go to **Actions** tab
2. Click on any workflow run
3. Click on "Security Scan (Snyk)" job
4. View the scan results in the logs

### In Snyk Dashboard

1. Go to [snyk.io](https://app.snyk.io)
2. Your projects will appear once scanned
3. View detailed vulnerability reports
4. Get fix recommendations

## Severity Levels

- **Critical**: Immediate fix required
- **High**: Fix soon (CI will fail on these)
- **Medium**: Fix when convenient
- **Low**: Monitor but not urgent

## Disabling Snyk (Optional)

If you don't want to use Snyk:

1. Remove the `security-scan` job from `.github/workflows/ci.yml`
2. Or comment out the entire job

## Need Help?

- Snyk Documentation: <https://docs.snyk.io>
- Snyk Support: <https://support.snyk.io>
- GitHub Actions: <https://docs.github.com/en/actions>
