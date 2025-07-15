import { test, expect } from "../fixtures/fixtures.js";
import { faker } from "@faker-js/faker"; // Importing faker for generating random data

test.describe("Purchasing Test Cases", () => {
  let DeliveryDetails;
  test.beforeAll(async () => {
    DeliveryDetails = {
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      zipcode: faker.location.zipCode(),
    };
  });
  test("@PAT-TC-3: Verify that user can add items to the cart", async ({
    page,
    purchasingPage,
    locators,
  }) => {
    const PurchasingLocators = locators.Purchasinglocators;
    await purchasingPage.AddItemsToCart();
    await expect(page.locator(PurchasingLocators.Cart)).toContainText("2");
  });

  test("@PAT-TC-4: Verify that user can remove items from the cart", async ({
    page,
    purchasingPage,
    locators,
  }) => {
    const PurchasingLocators = locators.Purchasinglocators;
    await purchasingPage.AddItemsToCart();
    await purchasingPage.RemoveItemsFromCart();
    await expect(page.locator(PurchasingLocators.Cart)).toContainText("1");
  });

  test("@PAT-TC-5: Verify that user can checkout successfully", async ({
    page,
    purchasingPage,
    locators,
  }) => {
    const PurchasingLocators = locators.Purchasinglocators;
    await purchasingPage.AddItemsToCart();
    await purchasingPage.RemoveItemsFromCart();
    await expect(page.locator(PurchasingLocators.Cart)).toContainText("1");
    await purchasingPage.Checkout();
    await purchasingPage.FillDeliveryDetails(DeliveryDetails);
    await purchasingPage.EndTransaction();
    await expect(page.locator('[data-test="checkout-complete-container"]'))
      .toMatchAriaSnapshot(`
    - img "Pony Express"
    - heading "Thank you for your order!" [level=2]
    - text: Your order has been dispatched, and will arrive just as fast as the pony can get there!
    - button "Back Home"
    `);
  });
});
