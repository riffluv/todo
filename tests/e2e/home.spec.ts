import { expect, test } from "@playwright/test";

test("home shows todo UI (no letter buttons)", async ({ page }) => {
  await page.goto("/");

  // 手紙ボタンは存在しない
  await expect(page.getByRole("button", { name: /さんへ/ })).toHaveCount(0);

  // Todo用の主要ボタンが見える（新しいタスク）
  await expect(page.getByRole("button", { name: "新しいタスク" })).toBeVisible();
});
