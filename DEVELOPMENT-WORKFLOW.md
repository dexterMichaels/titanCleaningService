# Development Workflow

How to make changes to the Titan Cleaning Service website safely.

**Production:** GitHub Pages, `main` branch → titancleaningservice.ca
**Previews:** Netlify deploy previews on every pull request

---

## Quick Reference

```bash
# Start a new change
git checkout main && git pull
git checkout -b feat/my-change

# Make changes, then push
git add <files>
git commit -m "Description of change"
git push -u origin feat/my-change

# Open a PR (uses GitHub CLI)
gh pr create --title "My change" --body "Description"

# After review + preview looks good, merge
gh pr merge --squash
```

---

## Branching Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Production — auto-deploys to GitHub Pages |
| `feat/*` | New features or pages |
| `fix/*` | Bug fixes (broken layout, wrong link, etc.) |
| `content/*` | Text/image/content updates |

**Rules:**
- Never push directly to `main` — always use a pull request
- Keep branches short-lived (hours to days, not weeks)
- One concern per branch

---

## Netlify Deploy Previews

### Initial Setup (one-time, manual)

1. Go to [netlify.com](https://www.netlify.com/) and sign up with your GitHub account
2. Click **"Add new site"** → **"Import an existing project"**
3. Select the **titanCleaningService** repo from GitHub
4. Netlify will auto-detect the settings from `netlify.toml` — no changes needed
5. Click **Deploy**
6. **Important:** Do NOT set up a custom domain on Netlify. Production stays on GitHub Pages.

### How It Works

- Every time you open or update a PR, Netlify builds a preview
- The preview URL appears as a status check on the PR (e.g., `https://deploy-preview-3--titancleaningservice.netlify.app`)
- Use this to verify your changes look correct before merging
- The preview is disposable — it goes away when the PR is closed

### Adding Netlify as a Required Check (after first PR)

After Netlify has run on at least one PR, you can require it before merging:

```bash
gh api repos/dexterMichaels/titanCleaningService/branches/main/protection \
  --method PUT \
  --field "required_status_checks[strict]=true" \
  --field "required_status_checks[contexts][]=netlify/titancleaningservice/deploy-preview" \
  --field "enforce_admins=false" \
  --field "required_pull_request_reviews[required_approving_review_count]=0" \
  --field "restrictions=null"
```

> Note: The exact context name (`netlify/titancleaningservice/deploy-preview`) may differ. Check the status checks on your first PR to get the exact name.

---

## Pull Request Workflow

### 1. Create a Branch

```bash
git checkout main
git pull origin main
git checkout -b feat/add-testimonials
```

### 2. Make Changes

Edit files as needed. Preview locally:

```bash
python -m http.server 8000
# or: npx serve .
```

### 3. Commit and Push

```bash
git add pages/testimonials.html css/styles.css
git commit -m "Add testimonials page"
git push -u origin feat/add-testimonials
```

### 4. Open a Pull Request

```bash
gh pr create --title "Add testimonials page" --body "New page with customer testimonials"
```

Or go to GitHub and click the **"Compare & pull request"** button.

### 5. Review the Preview

- Wait for Netlify to post the deploy preview link on the PR
- Click the link and verify everything looks right on mobile and desktop
- Check that no other pages are broken

### 6. Merge

```bash
gh pr merge --squash
```

Or click **"Squash and merge"** on GitHub. The site updates on GitHub Pages within a minute or two.

### 7. Clean Up

```bash
git checkout main
git pull
git branch -d feat/add-testimonials
```

---

## Rollback Procedures

### Option A: Revert (recommended)

Creates a new commit that undoes the bad change. Safe, traceable, doesn't rewrite history.

```bash
# Find the merge commit that broke things
git log --oneline -10

# Revert it (replace abc1234 with the actual commit hash)
git revert abc1234

# Push the revert — this goes through the normal PR process
git push -u origin fix/revert-bad-change
gh pr create --title "Revert: description of what broke" --body "Reverting abc1234 because..."
```

For an emergency, you can push the revert directly to `main` if branch protection allows admin bypass. But prefer the PR flow when possible.

### Option B: Reset (last resort)

Rewrites history. Use only if revert doesn't work (e.g., multiple bad commits, corrupted state).

```bash
# Find the last good commit
git log --oneline -20

# Reset main to that commit (DESTRUCTIVE — discards commits after it)
git checkout main
git reset --hard <last-good-commit>
git push --force-with-lease origin main
```

**Warning:** This removes commits from history. Only use this if revert is insufficient.

---

## Common Scenarios

### Update business hours or phone number

```bash
git checkout -b content/update-hours
# Edit the relevant HTML files (check footer in all pages)
# Use grep to find all instances:
grep -r "(250) 710-5244" *.html pages/*.html
git add -A && git commit -m "Update phone number"
git push -u origin content/update-hours
gh pr create --title "Update phone number" --body "Changed to new number"
```

### Fix a broken link or typo

```bash
git checkout -b fix/broken-link
# Fix the issue
git add <file> && git commit -m "Fix broken link on services page"
git push -u origin fix/broken-link
gh pr create --title "Fix broken link on services page" --body "Link to X was pointing to wrong URL"
```

### Add a new page

```bash
git checkout -b feat/new-page
# Create pages/new-page.html (copy an existing page as template)
# Add nav link in all pages
# Add styles if needed
git add pages/new-page.html css/styles.css
git commit -m "Add new page"
git push -u origin feat/new-page
gh pr create --title "Add new page" --body "Description of new page"
```

---

## Branch Protection Setup

Run this once to protect `main` from direct pushes:

```bash
gh api repos/dexterMichaels/titanCleaningService/branches/main/protection \
  --method PUT \
  --field "required_pull_request_reviews[required_approving_review_count]=0" \
  --field "enforce_admins=false" \
  --field "required_status_checks=null" \
  --field "restrictions=null"
```

This requires all changes to go through a PR (but doesn't require an approving review since you're a solo developer). Admins can still bypass in emergencies.

> After Netlify is connected and has run on a PR, update the protection rules to also require the deploy preview status check (see the Netlify section above).
