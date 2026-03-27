import { test, expect } from "@playwright/test";

test.describe("Public onboarding flow", () => {
  test("landing page renders and navigates to recommendation", async ({
    page,
  }) => {
    await page.goto("/onboarding/landing");

    // check if the next button is visible
    await expect(
      page.getByRole("button", { name: /get started/i }),
    ).toBeVisible();

    // next button should navigate to the recommendation page
    await page.getByRole("button", { name: /get started/i }).click();
    await expect(page).toHaveURL(/\/onboarding\/recommendation$/);
  });

  test("get-started page shows Call to action button and can continue to app", async ({
    page,
  }) => {
    await page.goto("/onboarding/get-started");

    // Call to action buttons visible
    await expect(
      page.getByRole("button", { name: /create an account/i }),
    ).toBeVisible();

    // check if the explore the app first button is visible
    await expect(
      page.getByRole("button", { name: /explore the app first/i }),
    ).toBeVisible();

    // onboarding book covers are rendered
    await expect(page.locator("img").first()).toBeVisible();
  });
});
