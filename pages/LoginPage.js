import { LocatorManager } from "../locators/Locatormanager.js";
import Logger from "../utils/Logger.js"; // Import the Logger

export default class LoginPage {
  constructor(page) {
    this.page = page;
    this.locators = LocatorManager.LoginLocators;
  }

  async login(username, password) {
    Logger.info(`Attempting to login user: ${username}`); // Log an info message
    await this.page.goto("v1"); // Navigation can stay here, or be part of try-catch
    try {
      await this.page.locator(this.locators.usernameInput).fill(username);
      await this.page.locator(this.locators.passwordInput).fill(password);
      await this.page.locator(this.locators.loginButton).click();
      Logger.info(`Login submitted for user: ${username}`);
    } catch (error) {
      Logger.error(`Error during login for user ${username}: ${error.message}`);
      // It's important to re-throw the error so that the test calling this method knows it failed.
      throw error;
    }
  }

  
}
