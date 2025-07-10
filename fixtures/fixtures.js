import { test as base } from "@playwright/test";
import LoginPage from "../pages/LoginPage.js";

export const test = base.extend({
  loginTest: async ({ page }, use) => {
    const loginTest = new LoginPage(page);
    await use(loginTest);
  },
});

export const expect = base.expect;
