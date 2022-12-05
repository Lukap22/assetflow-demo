import { chromium, FullConfig, Page } from "@playwright/test";

type TestUser = {
  email: string;
  password: string;
};

const testUsers: Record<string, TestUser> = {
  administrator: { email: "admin@taxflow.nl", password: "Welkom02!" },
  customer: { email: "customer@taxflow.com", password: "Welkom02!" },
};

export const storageStatePathByRole = (role) =>
  `./tests/storageState/${role}.json`;

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  //loop testUsers
  for (const [role, user] of Object.entries(testUsers)) {
    const page = await browser.newPage();
    await login(page, user);
    await page.context().storageState({ path: storageStatePathByRole(role) });
    await page.close();
  }
  await browser.close();
}

async function login(page: Page, user: TestUser) {
  await page.goto("http://localhost:3000/login");
  // Click input[name="email"]
  await page.locator('input[name="email"]').click();
  // Fill input[name="email"]
  await page.locator('input[name="email"]').fill(user.email);
  // Press Tab
  await page.locator('input[name="email"]').press("Tab");
  // Fill input[name="password"]
  await page.locator('input[name="password"]').fill(user.password);
  // Click text=Inloggen
  await page.locator("text=Inloggen").click();
  await page.waitForURL("http://localhost:3000/dashboard");
}

export default globalSetup;
