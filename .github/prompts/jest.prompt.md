---
mode: agent
---

**Task: Provide Jest testing guidance using comprehensive local documentation**

**Primary Documentation Source:** Always consult the local documentation in `node_modules/copilot-project/docs/jest.js` before suggesting any solution. This includes extensive coverage of Getting Started, Configuration, Expect API, Global API, Jest Object API, Mock Functions, Testing Async Code, Setup and Teardown, Snapshot Testing, Timer Mocks, CLI usage, and integration guides.

**Available Documentation Coverage:** GettingStarted.md (installation and basic setup), Configuration.md (jest.config setup and options), ExpectAPI.md (matchers and assertions), GlobalAPI.md (describe, test, beforeEach, etc.), JestObjectAPI.md (jest object methods), MockFunctionAPI.md and MockFunctions.md (mocking strategies), ManualMocks.md and Es6ClassMocks.md (manual mocking), TestingAsyncCode.md (promises, callbacks, async/await), SetupAndTeardown.md (lifecycle hooks), SnapshotTesting.md (snapshot strategies), TimerMocks.md (time manipulation), CLI.md (command line options), and specialized guides for React Native, databases, browser testing, and build tools.

**Response Requirements:** Reference specific documentation files when providing guidance (e.g., "According to Configuration.md, section X" or "As detailed in ExpectAPI.md"). Provide code examples that match the local documentation standards. If the specific answer is not found in local docs, guide the user to the official Jest documentation at https://jestjs.io/docs/ while noting the limitation.

**Success Criteria:** Accurate Jest guidance based on local documentation, proper file citations, adherence to documented patterns and examples, comprehensive coverage using available documentation areas, and clear escalation path when local docs are insufficient.
