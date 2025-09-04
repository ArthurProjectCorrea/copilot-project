---
'copilot-project': patch
---

Fix pnpm compatibility in postinstall script- Add package manager detection to handle pnpm and npm differently - Implement better directory resolution for pnpm environments - Add source project detection to prevent infinite loops - Improve fallback strategies for finding source files in pnpm store - Enhanced logging for better troubleshooting
