import { LocatorManager } from "../locators/Locatormanager.js";

export default class PurchasingPage {
  constructor(page) {
    this.page = page;
    this.locators = LocatorManager.Purchasinglocators;
  }

  async AddItemsToCart() {
    await this.page.goto("inventory.html"); // Navigation can stay here, or be part of try-catch
    await this.page.locator(this.locators.AddSauceLabsBackpackToCart).click();
    await this.page.locator(this.locators.AddSauceLabsBikeLightToCart).click();
  }

  async RemoveItemsFromCart() {
    await this.page.goto("cart.html"); // Navigation can stay here, or be part of try-catch
    await this.page
      .locator(this.locators.RemoveSauceLabsBikeLightFromCart)
      .click();
  }

  async Checkout() {
    await this.page.goto("cart.html"); // Navigation can stay here, or be part of try-catch
    // const price = await this.page.locator(this.locators.Price).inputValue();
    await this.page.locator(this.locators.CheckoutButton).click();
  }
  async FillDeliveryDetails({ firstname, lastname, zipcode }) {
    await this.page.locator(this.locators.firstname).fill(firstname);
    await this.page.locator(this.locators.lastname).fill(lastname);
    await this.page.locator(this.locators.zipcode).fill(zipcode);
  }

  async EndTransaction() {
    await this.page.goto("checkout-step-two.html"); // Navigation can stay here, or be part of try-catch
    // const price = await this.page.locator(this.locators.Price).inputValue();
    await this.page.locator(this.locators.finish).click();
  }
}
