import { defineConfig } from "@playwright/test";

const aioConfigDetails = {
  enableReporting: true,
  jiraProjectId: "CCS",
  cloud: {
    apiKey: process.env.AIO_API_KEY,
  },
  server: {
    jiraServerUrl: "https://rameshslakmal1999.atlassian.net/", // optional if using cloud
    pat: process.env.JIRA_PAT,
  },
  cycleDetails: {
    createNewCycle: "true", // ✅ Set to true if you want to create a new cycle
    cycleName: "CCS Test Cycle 2", // ✅ Replace with your actual AIO Test Cycle Name
    cycleKey: "CCS-CY-2", // ✅ Replace with your actual AIO Test Cycle Key
  },

  addAttachmentToFailedCases: true,
};

// const reportConfig = {
//   // open: process.env.CI ? "never" : "always",
//   folderPath: "Test Report",
//   filename: "index.html",
//   title: "Ortoni Test Report",
//   projectName: "Playwright-AIOTests",
//   preferredTheme: "dark",
// };

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
  workers: process.env.CI ? 1 : undefined,
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
    trace: "on-first-retry",
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
