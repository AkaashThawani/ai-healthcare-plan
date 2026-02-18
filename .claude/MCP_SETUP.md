# MCP Setup Guide

This guide helps you set up Model Context Protocol (MCP) servers for development workflow integration.

## Overview

MCP allows Claude Code to integrate with external services:
- **Linear**: Task tracking and project management
- **GitHub**: PR management and issue tracking
- **Notion**: Project documentation

## Quick Start

1. Get API keys for each service (see below)
2. Update `.claude/mcp.json` with your keys
3. Restart Claude Code CLI
4. MCP tools will be available automatically

---

## 1. Linear Setup

### Get Linear API Key

1. Go to [Linear Settings → API](https://linear.app/settings/api)
2. Click **"Personal API keys"**
3. Click **"Create key"**
4. Name it: `Claude Code MCP`
5. Copy the key (starts with `lin_api_...`)

### Configure Linear MCP

Edit `.claude/mcp.json`:
```json
"LINEAR_API_KEY": "lin_api_YOUR_KEY_HERE"
```

### Available Linear Commands

Once configured, you can:
- Create Linear issues from Claude Code
- Update issue status
- Add comments to issues
- Link PRs to Linear issues
- Search issues by project/team

**Example usage:**
```
"Create a Linear issue for implementing user authentication"
"Update LINEAR-123 status to In Progress"
"Search Linear for issues related to care plan generation"
```

---

## 2. GitHub Setup

### Get GitHub Personal Access Token

1. Go to [GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)](https://github.com/settings/tokens)
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Name: `Claude Code MCP`
4. Expiration: 90 days (or custom)
5. Select scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (Update GitHub Action workflows)
   - ✅ `read:org` (Read org and team membership)
6. Click **"Generate token"**
7. Copy the token (starts with `ghp_...`)

### Configure GitHub MCP

Edit `.claude/mcp.json`:
```json
"GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_YOUR_TOKEN_HERE"
```

### Available GitHub Commands

Once configured, you can:
- Create and manage PRs
- Create and update issues
- Search repositories and code
- Manage branches
- Update Linear issues when PRs are merged

**Example usage:**
```
"Create a PR for the latest commits on branch fix/cors-issue"
"List open PRs for ai-healthcare-plan repo"
"Create a GitHub issue for documentation updates"
"Update LINEAR-123 when PR #45 is merged"
```

---

## 3. Notion Setup

### Get Notion Integration Token

1. Go to [Notion Integrations](https://www.notion.so/my-integrations)
2. Click **"+ New integration"**
3. Name: `Claude Code MCP`
4. Select your workspace
5. Capabilities:
   - ✅ Read content
   - ✅ Update content
   - ✅ Insert content
6. Click **"Submit"**
7. Copy the **Internal Integration Token** (starts with `secret_...`)

### Share Pages with Integration

**Important:** You must share specific Notion pages with your integration:

1. Open the Notion page you want to use for documentation
2. Click **"Share"** (top right)
3. Click **"Invite"**
4. Search for your integration: `Claude Code MCP`
5. Click **"Invite"**

Repeat for each page/database you want Claude to access.

### Configure Notion MCP

Edit `.claude/mcp.json`:
```json
"NOTION_API_KEY": "secret_YOUR_TOKEN_HERE"
```

### Available Notion Commands

Once configured, you can:
- Create new pages and databases
- Update existing documentation
- Search across Notion workspace
- Add blocks (text, code, etc.) to pages
- Query databases

**Example usage:**
```
"Create a Notion page for API documentation"
"Update the deployment guide in Notion with the latest steps"
"Search Notion for troubleshooting guides"
"Add deployment notes to the project wiki"
```

---

## MCP Configuration File

Your `.claude/mcp.json` should look like:

```json
{
  "mcpServers": {
    "linear": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-linear"],
      "env": {
        "LINEAR_API_KEY": "lin_api_xxxxxxxxxxxxx"
      }
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxxxxxxxxxxxx"
      }
    },
    "notion": {
      "command": "npx",
      "args": ["-y", "@notionhq/notion-mcp-server"],
      "env": {
        "NOTION_API_KEY": "secret_xxxxxxxxxxxxx"
      }
    }
  }
}
```

---

## Security Best Practices

### Protect Your API Keys

1. **Never commit** `.claude/mcp.json` to git (already in .gitignore)
2. **Rotate keys** every 90 days
3. **Use minimal scopes** - only grant necessary permissions
4. **Revoke immediately** if keys are compromised

### Add to .gitignore

Ensure `.claude/mcp.json` is in your `.gitignore`:
```
# Claude Code MCP configuration (contains secrets)
.claude/mcp.json
```

---

## Testing MCP Setup

After configuring keys, restart Claude Code CLI and test:

**Test Linear:**
```
"List my Linear issues"
```

**Test GitHub:**
```
"Show open PRs for ai-healthcare-plan repository"
```

**Test Notion:**
```
"Search Notion for project documentation"
```

If setup is correct, Claude will be able to access these services.

---

## Troubleshooting

### MCP Server Not Working

**Problem:** Commands return errors or "not found"

**Solutions:**
1. Ensure Node.js is installed (check: `node --version`)
2. Restart Claude Code CLI after updating mcp.json
3. Check API key format (no extra spaces/quotes)
4. Verify API key permissions in service settings

### Linear Issues Not Found

**Problem:** "No issues found" or access errors

**Solutions:**
1. Verify API key is valid
2. Check you have access to the Linear workspace
3. Ensure the team/project exists

### GitHub Rate Limiting

**Problem:** "API rate limit exceeded"

**Solutions:**
1. Use authenticated token (not anonymous)
2. Wait 1 hour for rate limit reset
3. Reduce frequency of API calls

### Notion Pages Not Accessible

**Problem:** "Page not found" or "Access denied"

**Solutions:**
1. Share the specific Notion page with your integration
2. Verify integration has correct permissions
3. Check workspace membership

---

## Workflow Integration Examples

### Example 1: Create Linear Issue from PR Review

```
"Create a Linear issue for the security vulnerability found in PR #23,
assign it to the backend team, and link it to the PR"
```

### Example 2: Update Notion Docs After Deployment

```
"Update the Notion deployment guide with the new Render configuration
we just added for Python 3.11"
```

### Example 3: Link Linear Issue to GitHub PR

```
"When we merge PR #45, update LINEAR-123 status to Done and add a
comment with the PR link"
```

### Example 4: Track Tasks Across Systems

```
"Create a Linear epic for 'Phase 12: Analytics Dashboard',
create a GitHub project board for it, and add a planning page in Notion"
```

---

## Benefits of MCP Integration

✅ **Unified Workflow**: Manage tasks, PRs, and docs from Claude Code
✅ **Automatic Updates**: Link PRs to Linear issues automatically
✅ **Documentation Sync**: Keep Notion docs updated with latest changes
✅ **Context Awareness**: Claude can reference your real tasks and docs
✅ **Time Savings**: No context switching between tools

---

## Next Steps

1. ✅ Create Linear workspace (if not already)
2. ✅ Get API keys from all three services
3. ✅ Update `.claude/mcp.json` with real keys
4. ✅ Restart Claude Code CLI
5. ✅ Test each integration
6. ✅ Start using integrated workflow!

**Questions?** Ask Claude to help you set up any specific integration or workflow.

---

**Last Updated:** 2026-02-18
