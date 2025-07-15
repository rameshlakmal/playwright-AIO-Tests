import { test as base } from "@playwright/test";
import LoginPage from "../pages/LoginPage.js";
import PurchasingPage from "../pages/PurchasingPage.js";
import { LocatorManager } from "../locators/Locatormanager.js";

export const test = base.extend({
  loginTest: async ({ page }, use) => {
    const loginTest = new LoginPage(page);
    await use(loginTest);
  },

  purchasingPage: async ({ page }, use) => {
    const purchasingPage = new PurchasingPage(page);
    await use(purchasingPage);
  },

  locators: async ({}, use) => {
    await use(LocatorManager);
  },
});

export const expect = base.expect;
