# 🔄 Repository Migration Guide

## Overview

Comprehensive guide for migrating the Copilot Project between repositories, including moving to different organizations, changing repository names, and handling various migration scenarios while preserving history, issues, and configurations.

## Migration Scenarios

### Common Migration Types

#### 1. Repository Rename

- Same owner, different repository name
- Preserves all history and metadata
- Simplest migration type

#### 2. Organization Transfer

- Different owner/organization, same or different name
- Preserves history but may affect permissions
- Requires coordination with new organization

#### 3. Fork to Independent Repository

- Creating independent copy from fork
- May lose some GitHub-specific metadata
- Useful for project forks or splits

#### 4. Platform Migration

- Moving from GitHub to other platforms (GitLab, Bitbucket)
- Requires more complex migration process
- May lose GitHub-specific features

## Pre-Migration Planning

### Assessment Checklist

```bash
# Repository analysis
echo "Repository Assessment"
echo "===================="

# Basic repository information
gh repo view ArthurProjectCorrea/copilot-project --json \
  name,description,visibility,stargazerCount,forkCount,issueCount

# Branch analysis
echo "Branches:"
git branch -r

# Tag analysis
echo "Tags:"
git tag --list

# Contributor analysis
echo "Contributors:"
gh api repos/ArthurProjectCorrea/copilot-project/contributors | jq '.[].login'

# Dependencies analysis
echo "External dependencies:"
grep -r "github.com" package.json docs-config.json .github/
```

### Data Inventory

#### Repository Content

- **Source code**: All files in the repository
- **Git history**: Commits, branches, tags
- **Documentation**: README, docs/, CHANGELOG
- **Configuration**: package.json, .github/, scripts/

#### GitHub Metadata

- **Issues**: Open and closed issues with comments
- **Pull Requests**: Open and closed PRs with reviews
- **Releases**: Published releases with assets
- **Projects**: Project boards and cards
- **Wiki**: Wiki pages (if enabled)
- **Discussions**: GitHub Discussions content

#### External Dependencies

- **NPM package**: Published package references
- **Documentation sync**: Framework repository references
- **Webhooks**: External integrations
- **Secrets**: Repository secrets and variables

### Stakeholder Communication

```markdown
# Migration Communication Template

## Migration Notice

**Date**: [Migration Date]
**Affected Repository**: ArthurProjectCorrea/copilot-project
**New Location**: [New Repository URL]

### What's Changing

- Repository URL will change from [old] to [new]
- All existing functionality will be preserved
- Git remotes will need to be updated

### Timeline

- **Phase 1**: Preparation and backup (Date)
- **Phase 2**: Migration execution (Date)
- **Phase 3**: Verification and cleanup (Date)

### Action Required

- Update your local git remotes
- Update any CI/CD configurations
- Update documentation references

### Support

For questions or issues, contact: [Contact Information]
```

## Migration Procedures

### Simple Repository Rename

#### GitHub Web Interface Method

```bash
# 1. Navigate to repository settings
# 2. Scroll to "Repository name" section
# 3. Enter new name
# 4. Click "Rename"

# 5. Update local remotes
git remote set-url origin https://github.com/ArthurProjectCorrea/new-repo-name.git

# 6. Verify connection
git remote -v
git fetch origin
```

#### CLI Method

```bash
# Using GitHub CLI
gh repo rename ArthurProjectCorrea/copilot-project new-repo-name

# Update local remote
git remote set-url origin https://github.com/ArthurProjectCorrea/new-repo-name.git
```

### Organization Transfer

#### Preparation Steps

```bash
# 1. Ensure you have admin access to both organizations
gh api orgs/source-org/members/your-username
gh api orgs/target-org/members/your-username

# 2. Backup the repository
./scripts/backup/backup-repository.sh

# 3. Document current settings
gh api repos/ArthurProjectCorrea/copilot-project > backup/repo-settings.json
```

#### Transfer Process

```bash
# 1. Initiate transfer via GitHub web interface
# Settings → General → Transfer ownership

# 2. Or use GitHub CLI (if available)
gh api repos/ArthurProjectCorrea/copilot-project/transfer \
  --method POST \
  --field new_owner=target-org

# 3. Accept transfer in target organization
# 4. Update local remotes
git remote set-url origin https://github.com/target-org/copilot-project.git
```

### Full Repository Migration

#### Using Git Mirror

```bash
# 1. Create bare clone of source repository
git clone --bare https://github.com/ArthurProjectCorrea/copilot-project.git copilot-project-backup

# 2. Create new repository at destination
gh repo create target-org/copilot-project --public

# 3. Mirror push to new repository
cd copilot-project-backup
git push --mirror https://github.com/target-org/copilot-project.git

# 4. Clean up
cd ..
rm -rf copilot-project-backup
```

#### Advanced Migration Script

```bash
#!/bin/bash
# scripts/migration/migrate-repository.sh

SOURCE_REPO="$1"
TARGET_REPO="$2"
BACKUP_DIR="backup-$(date +%Y%m%d_%H%M%S)"

if [[ -z "$SOURCE_REPO" || -z "$TARGET_REPO" ]]; then
  echo "Usage: $0 <source-repo> <target-repo>"
  echo "Example: $0 ArthurProjectCorrea/copilot-project neworg/copilot-project"
  exit 1
fi

echo "Starting migration from $SOURCE_REPO to $TARGET_REPO"

# Create backup directory
mkdir -p "$BACKUP_DIR"

# 1. Full repository backup
echo "Creating repository backup..."
git clone --mirror "https://github.com/$SOURCE_REPO.git" "$BACKUP_DIR/repository.git"

# 2. Backup GitHub metadata
echo "Backing up GitHub metadata..."
gh api "repos/$SOURCE_REPO" > "$BACKUP_DIR/repo-metadata.json"
gh api "repos/$SOURCE_REPO/issues" --paginate > "$BACKUP_DIR/issues.json"
gh api "repos/$SOURCE_REPO/pulls" --paginate > "$BACKUP_DIR/pulls.json"
gh api "repos/$SOURCE_REPO/releases" --paginate > "$BACKUP_DIR/releases.json"

# 3. Create target repository
echo "Creating target repository..."
TARGET_ORG=$(echo "$TARGET_REPO" | cut -d'/' -f1)
TARGET_NAME=$(echo "$TARGET_REPO" | cut -d'/' -f2)

gh repo create "$TARGET_REPO" --public

# 4. Push to target repository
echo "Migrating repository content..."
cd "$BACKUP_DIR/repository.git"
git push --mirror "https://github.com/$TARGET_REPO.git"
cd ../..

# 5. Migrate releases
echo "Migrating releases..."
node scripts/migration/migrate-releases.js "$SOURCE_REPO" "$TARGET_REPO"

echo "Migration completed. Backup saved in: $BACKUP_DIR"
echo "Next steps:"
echo "1. Update repository settings manually"
echo "2. Migrate issues and PRs if needed"
echo "3. Update external references"
echo "4. Test all functionality"
```

## Metadata Migration

### Issues and Pull Requests Migration

```javascript
// scripts/migration/migrate-issues.js
const { Octokit } = require('@octokit/rest');

class IssuesMigrator {
  constructor(sourceRepo, targetRepo) {
    this.octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    this.sourceRepo = sourceRepo;
    this.targetRepo = targetRepo;
  }

  async migrateAllIssues() {
    const issues = await this.getAllIssues();

    for (const issue of issues) {
      if (!issue.pull_request) {
        // Skip PRs for now
        await this.migrateIssue(issue);
      }
    }
  }

  async getAllIssues() {
    const [owner, repo] = this.sourceRepo.split('/');

    return await this.octokit.paginate(this.octokit.issues.listForRepo, {
      owner,
      repo,
      state: 'all',
    });
  }

  async migrateIssue(issue) {
    const [targetOwner, targetRepo] = this.targetRepo.split('/');

    const newIssue = await this.octokit.issues.create({
      owner: targetOwner,
      repo: targetRepo,
      title: issue.title,
      body: this.convertIssueBody(issue),
      labels: issue.labels.map((label) => label.name),
      assignees: issue.assignees.map((assignee) => assignee.login),
    });

    // Migrate comments
    await this.migrateComments(issue.number, newIssue.data.number);

    // Close if original was closed
    if (issue.state === 'closed') {
      await this.octokit.issues.update({
        owner: targetOwner,
        repo: targetRepo,
        issue_number: newIssue.data.number,
        state: 'closed',
      });
    }

    return newIssue.data;
  }

  convertIssueBody(issue) {
    const migrationNote = `
> **Migrated from**: ${this.sourceRepo}#${issue.number}
> **Original author**: @${issue.user.login}
> **Created**: ${issue.created_at}

---

`;

    return migrationNote + issue.body;
  }

  async migrateComments(sourceIssueNumber, targetIssueNumber) {
    const [sourceOwner, sourceRepo] = this.sourceRepo.split('/');
    const [targetOwner, targetRepo] = this.targetRepo.split('/');

    const comments = await this.octokit.paginate(this.octokit.issues.listComments, {
      owner: sourceOwner,
      repo: sourceRepo,
      issue_number: sourceIssueNumber,
    });

    for (const comment of comments) {
      await this.octokit.issues.createComment({
        owner: targetOwner,
        repo: targetRepo,
        issue_number: targetIssueNumber,
        body: `**@${comment.user.login}** commented on ${comment.created_at}:\n\n${comment.body}`,
      });
    }
  }
}

// Usage
const migrator = new IssuesMigrator(
  process.argv[2], // source repo
  process.argv[3] // target repo
);

migrator.migrateAllIssues().catch(console.error);
```

### Releases Migration

```javascript
// scripts/migration/migrate-releases.js
class ReleasesMigrator {
  constructor(sourceRepo, targetRepo) {
    this.octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    this.sourceRepo = sourceRepo;
    this.targetRepo = targetRepo;
  }

  async migrateAllReleases() {
    const releases = await this.getAllReleases();

    for (const release of releases) {
      await this.migrateRelease(release);
    }
  }

  async getAllReleases() {
    const [owner, repo] = this.sourceRepo.split('/');

    return await this.octokit.paginate(this.octokit.repos.listReleases, {
      owner,
      repo,
    });
  }

  async migrateRelease(release) {
    const [targetOwner, targetRepo] = this.targetRepo.split('/');

    // Create release
    const newRelease = await this.octokit.repos.createRelease({
      owner: targetOwner,
      repo: targetRepo,
      tag_name: release.tag_name,
      target_commitish: release.target_commitish,
      name: release.name,
      body: this.convertReleaseBody(release),
      draft: release.draft,
      prerelease: release.prerelease,
    });

    // Migrate assets
    await this.migrateAssets(release.id, newRelease.data.id);

    return newRelease.data;
  }

  convertReleaseBody(release) {
    const migrationNote = `
> **Migrated from**: ${this.sourceRepo}
> **Original release**: ${release.html_url}
> **Published**: ${release.published_at}

---

`;

    return migrationNote + release.body;
  }

  async migrateAssets(sourceReleaseId, targetReleaseId) {
    const [sourceOwner, sourceRepo] = this.sourceRepo.split('/');
    const [targetOwner, targetRepo] = this.targetRepo.split('/');

    const assets = await this.octokit.repos.listReleaseAssets({
      owner: sourceOwner,
      repo: sourceRepo,
      release_id: sourceReleaseId,
    });

    for (const asset of assets.data) {
      // Download asset
      const assetData = await this.octokit.repos.getReleaseAsset({
        owner: sourceOwner,
        repo: sourceRepo,
        asset_id: asset.id,
        headers: { accept: 'application/octet-stream' },
      });

      // Upload to target
      await this.octokit.repos.uploadReleaseAsset({
        owner: targetOwner,
        repo: targetRepo,
        release_id: targetReleaseId,
        name: asset.name,
        data: assetData.data,
      });
    }
  }
}
```

## Configuration Updates

### Repository Settings Migration

```bash
# Export repository settings
gh api repos/ArthurProjectCorrea/copilot-project > backup/repo-settings.json

# Key settings to migrate manually:
# - Branch protection rules
# - Repository secrets
# - Webhook configurations
# - Collaborator permissions
# - Repository topics and description
```

### Branch Protection Migration

```javascript
// scripts/migration/migrate-branch-protection.js
class BranchProtectionMigrator {
  async migrateBranchProtection(sourceRepo, targetRepo) {
    const [sourceOwner, sourceRepoName] = sourceRepo.split('/');
    const [targetOwner, targetRepoName] = targetRepo.split('/');

    // Get all branches
    const branches = await this.octokit.repos.listBranches({
      owner: sourceOwner,
      repo: sourceRepoName,
    });

    for (const branch of branches.data) {
      try {
        // Get protection rules
        const protection = await this.octokit.repos.getBranchProtection({
          owner: sourceOwner,
          repo: sourceRepoName,
          branch: branch.name,
        });

        // Apply to target repository
        await this.octokit.repos.updateBranchProtection({
          owner: targetOwner,
          repo: targetRepoName,
          branch: branch.name,
          required_status_checks: protection.data.required_status_checks,
          enforce_admins: protection.data.enforce_admins.enabled,
          required_pull_request_reviews: protection.data.required_pull_request_reviews,
          restrictions: protection.data.restrictions,
        });

        console.log(`Migrated protection for branch: ${branch.name}`);
      } catch (error) {
        if (error.status === 404) {
          console.log(`No protection rules for branch: ${branch.name}`);
        } else {
          console.error(`Error migrating branch ${branch.name}:`, error.message);
        }
      }
    }
  }
}
```

### Secrets and Variables Migration

```bash
# Secrets need to be migrated manually as they cannot be read
# Document current secrets for manual recreation

echo "Repository Secrets to Recreate:"
echo "==============================="
gh api repos/ArthurProjectCorrea/copilot-project/actions/secrets | jq '.secrets[].name'

echo ""
echo "Repository Variables:"
echo "===================="
gh api repos/ArthurProjectCorrea/copilot-project/actions/variables | jq '.variables[].name'

# Create secrets in target repository
gh secret set GITHUB_TOKEN --repo target-org/copilot-project
gh secret set NPM_TOKEN --repo target-org/copilot-project
```

## External Dependencies Update

### Package Registry Updates

```bash
# Update package.json repository field
jq '.repository.url = "https://github.com/target-org/copilot-project.git"' package.json > temp.json
mv temp.json package.json

# Update bugs and homepage URLs
jq '.bugs.url = "https://github.com/target-org/copilot-project/issues"' package.json > temp.json
mv temp.json package.json

jq '.homepage = "https://github.com/target-org/copilot-project"' package.json > temp.json
mv temp.json package.json

# Commit changes
git add package.json
git commit -m "chore: update repository URLs after migration"
```

### Documentation References

```bash
# Update README.md references
sed -i 's|ArthurProjectCorrea/copilot-project|target-org/copilot-project|g' README.md

# Update documentation files
find docs/ -name "*.md" -exec sed -i 's|ArthurProjectCorrea/copilot-project|target-org/copilot-project|g' {} \;

# Update GitHub workflows
find .github/ -name "*.yml" -exec sed -i 's|ArthurProjectCorrea/copilot-project|target-org/copilot-project|g' {} \;

# Update configuration files
sed -i 's|ArthurProjectCorrea/copilot-project|target-org/copilot-project|g' docs-config.json
```

### CI/CD Pipeline Updates

```yaml
# Update GitHub Actions workflows
# .github/workflows/*.yml

# Example updates needed:
# - Repository references in checkout actions
# - Webhook URLs
# - Deployment targets
# - Notification configurations

name: CI
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        # No changes needed here - uses current repository

      - name: Update status check
        run: |
          # Update any hardcoded repository references
          echo "Repository: ${{ github.repository }}"
```

## Post-Migration Verification

### Functionality Testing

```bash
# Test repository functionality
#!/bin/bash
# scripts/migration/verify-migration.sh

echo "Post-Migration Verification"
echo "=========================="

# 1. Clone and test repository
git clone https://github.com/target-org/copilot-project.git test-migration
cd test-migration

# 2. Install and test package
pnpm install
pnpm run validate

# 3. Test CLI functionality
npm link
copilot-chat --help
copilot-chat --version

# 4. Test documentation sync
pnpm run docs:sync:jest

# 5. Verify GitHub integrations
gh auth status
gh repo view

# 6. Test CI/CD
git checkout -b test-migration
echo "Test migration" > test-file.txt
git add test-file.txt
git commit -m "test: verify CI/CD after migration"
git push origin test-migration

# Create test PR
gh pr create --title "Test migration" --body "Testing CI/CD after migration"

echo "Verification completed. Check CI/CD status in GitHub."
```

### Checklist Verification

```markdown
# Post-Migration Checklist

## Repository Content

- [ ] All branches migrated correctly
- [ ] All tags migrated correctly
- [ ] All commits preserved with history
- [ ] File contents intact

## GitHub Features

- [ ] Issues migrated (if applicable)
- [ ] Pull requests migrated (if applicable)
- [ ] Releases migrated correctly
- [ ] Branch protection rules applied
- [ ] Secrets and variables configured

## Configuration Updates

- [ ] package.json repository URLs updated
- [ ] README.md links updated
- [ ] Documentation references updated
- [ ] GitHub workflows updated
- [ ] docs-config.json updated

## External Integrations

- [ ] NPM package links to new repository
- [ ] CI/CD pipelines working
- [ ] Webhooks updated
- [ ] External services configured

## Team Access

- [ ] Team members have access
- [ ] Permissions configured correctly
- [ ] Notification settings updated

## Testing

- [ ] Package installs correctly
- [ ] CLI commands work
- [ ] Documentation sync works
- [ ] All tests pass
- [ ] CI/CD pipeline succeeds
```

## Rollback Procedures

### Emergency Rollback

```bash
# If migration fails, rollback steps:

# 1. Restore from backup
cd backup-[timestamp]
git clone --mirror repository.git restored-repository
cd restored-repository
git push --mirror https://github.com/original-org/copilot-project.git

# 2. Restore repository settings manually
# 3. Update all references back to original
# 4. Communicate rollback to stakeholders
```

### Gradual Transition

```bash
# For gradual migration:

# 1. Keep old repository as archive
gh api repos/old-org/copilot-project \
  --method PATCH \
  --field archived=true

# 2. Add README notice
echo "# Repository Moved

This repository has been moved to: https://github.com/new-org/copilot-project

Please update your bookmarks and git remotes.

\`\`\`bash
git remote set-url origin https://github.com/new-org/copilot-project.git
\`\`\`
" > README.md

git add README.md
git commit -m "docs: add repository migration notice"
git push

# 3. Set up redirect (if possible)
# 4. Update package.json to point to new repository
# 5. Publish final version with migration notice
```

## Communication Templates

### User Notification

````markdown
# Repository Migration Notice

**Important**: The Copilot Project repository has moved!

## What Changed

- **Old URL**: https://github.com/ArthurProjectCorrea/copilot-project
- **New URL**: https://github.com/target-org/copilot-project

## Action Required

### For Git Users

Update your local repository remote:

```bash
git remote set-url origin https://github.com/target-org/copilot-project.git
```
````

### For NPM Users

No action required - the package will continue to work normally.

### For CI/CD Users

Update any workflows or scripts that reference the old repository URL.

## Timeline

- **Migration Date**: [Date]
- **Old Repository**: Will remain accessible as read-only archive
- **Support**: Available for any migration issues

## Questions?

Contact us at [support email] or create an issue in the new repository.

````

### Team Communication

```markdown
# Internal Migration Communication

## Migration Status
- **Phase**: [Current Phase]
- **Status**: [In Progress/Completed/Issues]
- **Next Steps**: [What's next]

## Completed Tasks
- [x] Repository content migrated
- [x] GitHub settings configured
- [x] CI/CD updated
- [ ] External integrations updated
- [ ] Documentation updated

## Issues Encountered
- [List any issues and resolutions]

## Next Actions
- [Immediate next steps]
- [Assigned to whom]
- [Timeline]
````

## Best Practices

### Migration Planning

1. **Create comprehensive backup** before starting
2. **Test migration process** on a small test repository first
3. **Communicate early and often** with all stakeholders
4. **Plan for rollback** if issues occur
5. **Verify everything** before declaring migration complete

### Timing Considerations

- **Low traffic periods**: Migrate during off-peak hours
- **Freeze development**: Temporarily halt new commits during migration
- **Coordinate with releases**: Don't migrate during active release cycles
- **Plan buffer time**: Allow extra time for unexpected issues

### Documentation

- **Document the process** for future migrations
- **Keep detailed logs** of all migration steps
- **Update all references** immediately after migration
- **Maintain old repository** as read-only archive initially

## Next Steps

After completing repository migration:

1. **[GitHub Configuration](github-configuration.md)** - Set up new repository properly
2. **[Development Setup](development-setup.md)** - Help team members update environments
3. **[Contributing Guidelines](contributing.md)** - Update contribution processes
4. **[Maintenance Guide](maintenance.md)** - Resume normal maintenance procedures

Remember: Repository migration is a complex process that requires careful planning and execution. Always test first and have a rollback plan ready! 🔄
