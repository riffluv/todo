import { expect, test } from "@playwright/test";

test("home shows two message buttons", async ({ page }) => {
  await page.goto("/");
  const buttons = page.getByRole("button", { name: /さんへ/ });
  await expect(buttons).toHaveCount(2);
  await Promise.all([
    expect(page.getByRole("button", { name: "斎藤さんへ" })).toBeVisible(),
    expect(page.getByRole("button", { name: "作田さんへ" })).toBeVisible(),
  ]);
});
