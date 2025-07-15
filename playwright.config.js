import { defineConfig } from "@playwright/test";

const aioConfigDetails = {
  enableReporting: true, // ✅ Set to true to report test results to AIO Tests (default is false)
  jiraProjectId: "PAT", // ✅ Jira project key where the AIO test cases are managed
  cloud: {
    apiKey: process.env.AIO_API_KEY, // ✅ API key for AIO Cloud, stored securely as an environment variable
  },
  server: {
    jiraServerUrl: "https://rameshslakmal1999.atlassian.net/", // ✅ Jira base URL (used only for Jira Server setup)
    pat: process.env.JIRA_PAT, // ✅ Personal Access Token for Jira Server, pulled from environment variable
  },
  cycleDetails: {
    createNewCycle: "true", // ✅ Options: [true, false, "CREATE_IF_ABSENT"]
    // Set to true to always create a new test cycle for this run

    cycleName: "PAT Test Cycle 1", // ✅ Used when createNewCycle is true
    // Sets the name for the new test cycle being created

    cycleKey: "CCS-CY-2", // ✅ Used when createNewCycle is false
    // Links the run to an existing cycle by its key
  },

  addAttachmentToFailedCases: true, // ✅ Adds only screenshots to failed test cases if available
};

export default defineConfig({
  timeout: 100_000,

  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */

  // reporter: [["ortoni-report", reportConfig]],
  reporter: [
    ["html", { open: "never" }], // HTML reporter
    ["list"],
    ["aiotests-playwright-reporter", { aioConfig: aioConfigDetails }], // List reporter for console output
  ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "https://www.saucedemo.com",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "retain-on-failure",
    headless: !!process.env.CI,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    viewport: { width: 1920, height: 1080 }, // Added consistent viewport
    // launchOptions for start-maximized removed
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "setup",
      testMatch: /.*\.setup\.js/,
    },

    {
      name: "Google Chrome",
      use: {
        // viewport: null, // Removed to inherit global viewport
        channel: "chrome",
        storageState: "./.auth/user.json",
      },
      dependencies: ["setup"],
    },
  ],
});
