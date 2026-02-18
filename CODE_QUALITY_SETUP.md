# Code Quality Tools Setup

This guide covers setting up automated code quality tools for the project.

## Tools Overview

- **Pre-commit Hooks**: Run checks before each commit
- **CodeRabbit**: AI-powered code review on pull requests
- **GitHub Branch Protection**: Enforce quality standards

---

## 1. Pre-commit Hooks

Pre-commit hooks automatically run linters and formatters before you commit code.

### Installation

```bash
# Install pre-commit
pip install pre-commit

# Or with homebrew (macOS)
brew install pre-commit
```

### Setup

```bash
# In the project root directory
pre-commit install
```

That's it! Now hooks will run automatically before each commit.

### What Gets Checked

**Python (Backend):**
- ✅ Ruff linting (auto-fix enabled)
- ✅ Black formatting
- ✅ MyPy type checking

**TypeScript/React (Frontend):**
- ✅ ESLint linting
- ✅ Prettier formatting

**All Files:**
- ✅ Trailing whitespace removed
- ✅ End-of-file newline added
- ✅ No large files (>1MB)
- ✅ No merge conflicts
- ✅ No private keys committed
- ✅ YAML/JSON syntax check

### Running Manually

```bash
# Run on all files
pre-commit run --all-files

# Run on staged files only
pre-commit run

# Skip hooks for a commit (not recommended)
git commit --no-verify -m "message"
```

### Updating Hooks

```bash
# Update to latest versions
pre-commit autoupdate

# Commit the updated config
git add .pre-commit-config.yaml
git commit -m "chore: update pre-commit hooks"
```

---

## 2. CodeRabbit Setup

CodeRabbit is an AI code reviewer that comments on your pull requests.

### Installation

1. **Go to CodeRabbit**
   - Visit [coderabbit.ai](https://coderabbit.ai)
   - Sign in with your GitHub account

2. **Connect Repository**
   - Click **"Add Repository"**
   - Select `care-plan-generator` repository
   - Click **"Enable"**

3. **Configure Settings**
   - CodeRabbit will read `.coderabbit.yaml` from your repo
   - No additional configuration needed!

### What CodeRabbit Reviews

- ✅ Security vulnerabilities
- ✅ Performance issues
- ✅ Code smells
- ✅ Type safety
- ✅ Best practices
- ✅ Accessibility (React components)
- ✅ Duplicated code
- ✅ Unused code

### Custom Rules

Our `.coderabbit.yaml` includes custom rules:

1. **No console.log in production** (warning)
2. **No hardcoded URLs** (error)
3. **Link TODOs to issues** (info)

### Using CodeRabbit

1. Create a pull request
2. CodeRabbit automatically reviews within 1-2 minutes
3. Review comments appear inline on your PR
4. Address feedback and push updates
5. CodeRabbit re-reviews automatically

### Adjusting Settings

Edit `.coderabbit.yaml` to:
- Change review depth (quick/moderate/comprehensive)
- Add custom rules
- Adjust comment limits
- Enable auto-fixes

---

## 3. GitHub Branch Protection

Enforce quality standards before merging to main.

### Setup

1. **Go to Repository Settings**
   - GitHub → Your Repo → Settings → Branches

2. **Add Rule for `main` branch:**

   ✅ **Require pull request reviews**
   - At least 1 approval required
   - Dismiss stale reviews on new commits

   ✅ **Require status checks to pass**
   - Lint Backend
   - Lint Frontend
   - Type Check Backend
   - Type Check Frontend
   - Build Test

   ✅ **Require conversation resolution**
   - All comments must be resolved before merge

   ✅ **Require linear history**
   - Prevents messy merge commits

   ✅ **Include administrators**
   - Apply rules to everyone

3. **Click "Create" or "Save changes"**

### What This Prevents

- ❌ Direct pushes to main
- ❌ Merging with failing tests
- ❌ Merging without code review
- ❌ Merging with unresolved comments

---

## 4. Local Development Workflow

### Before Committing

```bash
# 1. Stage your changes
git add .

# 2. Pre-commit hooks run automatically
# (linting, formatting, type checking)

# 3. Commit (if hooks pass)
git commit -m "feat: add feature X"

# 4. Push to your branch
git push origin feature/my-feature
```

### If Hooks Fail

```bash
# Hooks auto-fix many issues
# Review the changes:
git diff

# Stage the fixes:
git add .

# Try committing again:
git commit -m "feat: add feature X"
```

### Creating a Pull Request

```bash
# 1. Push your branch
git push origin feature/my-feature

# 2. Create PR on GitHub
# 3. CI checks run automatically
# 4. CodeRabbit reviews your code
# 5. Address feedback
# 6. Get approval
# 7. Merge!
```

---

## 5. Quality Standards

### Python Code

- Follow PEP 8 style guide
- Use type hints for all functions
- Maximum line length: 100 characters
- Docstrings for all public functions
- Cyclomatic complexity < 10

### TypeScript/React Code

- Follow Airbnb style guide
- Use TypeScript strict mode
- CamelCase for variables/functions
- PascalCase for components
- Maximum cyclomatic complexity: 15
- Functional components preferred

### Git Commits

- Use conventional commits format:
  - `feat:` New feature
  - `fix:` Bug fix
  - `docs:` Documentation
  - `refactor:` Code refactoring
  - `test:` Add tests
  - `chore:` Build/config changes

---

## 6. Troubleshooting

### Pre-commit hooks failing

**Problem:** Black and ESLint conflict
```bash
# Run them in order:
pre-commit run black --all-files
pre-commit run eslint --all-files
```

**Problem:** MyPy complains about missing types
```bash
# Add to mypy config or use ignore comment:
# type: ignore
```

**Problem:** Hooks take too long
```bash
# Run on changed files only:
pre-commit run
```

### CodeRabbit not commenting

**Problem:** CodeRabbit silent on PRs
- Check repository is enabled in CodeRabbit dashboard
- Verify `.coderabbit.yaml` is valid YAML
- Check PR targets `main` branch
- Wait 2-3 minutes after creating PR

### Branch protection blocking merge

**Problem:** Can't merge even though checks pass
- Refresh the PR page
- Check if all conversations resolved
- Verify required reviewers approved
- Re-run failed checks

---

## 7. Best Practices

### Daily Workflow

1. ✅ Pull latest changes: `git pull origin main`
2. ✅ Create feature branch: `git checkout -b feature/my-feature`
3. ✅ Make changes
4. ✅ Run tests locally: `npm test` / `pytest`
5. ✅ Commit (hooks run automatically)
6. ✅ Push and create PR
7. ✅ Address CodeRabbit feedback
8. ✅ Get approval and merge

### Code Review Tips

- **For Reviewers:**
  - Review within 24 hours
  - Be constructive, not critical
  - Ask questions, don't demand changes
  - Approve if changes are good enough

- **For Authors:**
  - Keep PRs small (<500 lines)
  - Write clear descriptions
  - Respond to all comments
  - Don't take feedback personally

---

## Need Help?

- **Pre-commit**: https://pre-commit.com
- **CodeRabbit**: https://docs.coderabbit.ai
- **GitHub Branch Protection**: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches
