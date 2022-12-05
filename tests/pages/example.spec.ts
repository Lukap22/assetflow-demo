import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/en");
  await page.getByRole("button", { name: "Home" }).click();
  await page.getByRole("button", { name: "Organogram" }).click();
  await page.getByRole("button", { name: "open drawer" }).click();
});
