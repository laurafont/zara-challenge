import { test, expect } from "@playwright/test";

test.describe("Shop flow", () => {
  test("home → search → open product → add to cart → cart → remove → continue shopping", async ({
    page,
  }) => {
    test.setTimeout(60_000);
    // 1. Home
    await page.goto("/");
    await expect(page).toHaveURL("/");
    await expect(
      page
        .getByRole("heading", { name: /zara/i })
        .or(page.getByRole("link", { name: /zara home/i }))
        .first()
    ).toBeVisible();

    // 2. Search
    const searchInput = page.getByLabel("Search");
    await expect(searchInput).toBeVisible();
    await searchInput.fill("phone");
    await page.waitForTimeout(600); // debounce
    await expect(
      page.getByRole("listitem").or(page.getByText("No results")).first()
    ).toBeVisible({ timeout: 15000 });

    // 3. Open product (first product link in the list)
    const productLinks = page
      .getByRole("link")
      .filter({ has: page.locator("h2") });
    await expect(productLinks.first()).toBeVisible({ timeout: 10000 });
    await productLinks.first().click();

    // 4. Product page – assert route
    await expect(page).toHaveURL(/\/product\/[^/]+/);

    // Select storage (first storage option)
    const storageGroup = page.getByRole("group", { name: "Storage" });
    await expect(storageGroup).toBeVisible({ timeout: 10000 });
    const storageButton = storageGroup.getByRole("button").first();
    await storageButton.click();

    // Select color (first color option – checkbox; click label so visual overlay doesn't intercept)
    const colorGroup = page.getByRole("group", { name: "Color" });
    await expect(colorGroup).toBeVisible();
    const colorCheckbox = colorGroup.getByRole("checkbox").first();
    await colorCheckbox.click({ force: true });

    // Add to cart
    await page.getByRole("button", { name: "Añadir" }).click();

    // 5. Go to cart
    await page.getByRole("link", { name: /items in cart|Cart/ }).click();
    await expect(page).toHaveURL("/cart");

    // 6. Cart – assert key text
    await expect(
      page.getByRole("heading", { name: /CART \(\d+\)/ })
    ).toBeVisible();
    await expect(page.getByRole("button", { name: /Eliminar/ })).toBeVisible();

    // 7. Remove item
    await page
      .getByRole("button", { name: /Eliminar/ })
      .first()
      .click();

    // 8. Cart empty and continue shopping
    await expect(page.getByRole("heading", { name: /CART \(0\)/ })).toBeVisible(
      { timeout: 5000 }
    );
    await page.getByRole("link", { name: "Continue Shopping" }).click();
    await expect(page).toHaveURL("/");
  });
});
