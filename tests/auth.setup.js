import { test as setup, expect } from "../fixtures/fixtures.js";
import { Login } from "../test-data/test-data.json";

setup("User login", async ({ loginTest, page }) => {
  await loginTest.login(Login.username, Login.password);
  await expect(page).toHaveURL("https://www.saucedemo.com/v1/inventory.html");
  await page.context().storageState({ path: "./.auth/user.json" });
});
