# Gitflow Workflow Guide

This repository follows the Gitflow workflow convention for organized branch management.

## Branch Structure

### Main Branches
- **`main`** - Production-ready code, stable releases
- **`dev`** - Main development branch, integration of features

### Supporting Branches
- **`feature/*`** - New features and enhancements
- **`hotfix/*`** - Critical fixes for production issues
- **`release/*`** - Prepare releases (optional, for complex releases)

## Workflow

### Starting a New Feature
```bash
# Use the provided script (automatically creates from dev branch)
./scripts/create-new-feature.sh "your feature description"

# Or manually:
git checkout dev
git checkout -b feature/002-your-feature-name
```

### Finishing a Feature
```bash
# Switch to dev branch
git checkout dev

# Merge the feature (use --no-ff to maintain branch history)
git merge --no-ff feature/002-your-feature-name

# Delete the feature branch
git branch -d feature/002-your-feature-name
```

### Creating a Hotfix
```bash
# Create hotfix branch from main
git checkout main
git checkout -b hotfix/fix-critical-issue

# After fixing and testing
git checkout main
git merge --no-ff hotfix/fix-critical-issue

# Also merge to dev
git checkout dev
git merge --no-ff hotfix/fix-critical-issue

# Delete hotfix branch
git branch -d hotfix/fix-critical-issue
```

### Release Process
```bash
# When ready to release from dev
git checkout main
git merge --no-ff dev

# Tag the release
git tag -a v1.0.0 -m "Release version 1.0.0"
```

## Current Repository State

- **Main branch**: `main` (production)
- **Development branch**: `dev` (development integration)
- **Current feature**: `feature/001-astro-sanity-setup`

## Automated Script Updates

The `create-new-feature.sh` script has been updated to:
- Create branches with `feature/` prefix
- Start new branches from `dev` branch
- Maintain sequential feature numbering
- Handle both old and new branch naming conventions

## Best Practices

1. **Always start features from `dev`**
2. **Use descriptive branch names**: `feature/003-user-authentication`
3. **Keep features focused and small**
4. **Merge with `--no-ff` flag** to preserve branch history
5. **Delete merged feature branches** to keep repository clean
6. **Test thoroughly before merging to `dev`**
7. **Only merge to `main` for releases**