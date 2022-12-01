import {chromium, FullConfig, Page} from "@playwright/test";


type TestUser = {
    email: string,
    password: string,
}

const testUsers: Record<string, TestUser> = {
    administrator: {email: "admin@taxflow.nl", password: "Welkom02!"},
    customer: {email: "customer@taxflow.com", password: "Welkom02!"},
};

export const storageStatePathByRole = (role) => `./tests/storageState/${role}.json`;

async function globalSetup(config: FullConfig) {
    const browser = await chromium.launch();
    //loop testUsers
    for (const [role , user] of Object.entries(testUsers)) {
        const page = await browser.newPage();
        await login(page, user);
        await page.context().storageState({ path: storageStatePathByRole(role)});
        await page.close();
    }
    await browser.close();
}

async function login(page: Page, user: TestUser){
    try {
        // Go to http://localhost:8222/auth/login
        await page.goto("http://localhost:8222/auth/login");
    } catch {
        // Go to http://localhost:3000/auth/login
        await page.goto("http://localhost:3000/auth/login");
    }
    // Click input[name="email"]
    await page.locator("input[name=\"email\"]").click();
    // Fill input[name="email"]
    await page.locator("input[name=\"email\"]").fill(user.email);
    // Press Tab
    await page.locator("input[name=\"email\"]").press("Tab");
    // Fill input[name="password"]
    await page.locator("input[name=\"password\"]").fill(user.password);
    // Click text=Inloggen
    await page.locator("text=Inloggen").click();
    // await page.waitForURL("http://localhost:8222/dashboard");
    try {
        await page.waitForURL("http://localhost:8222/dashboard");
    } catch {
        await page.waitForURL("http://localhost:3000/dashboard");
    }
}

export default globalSetup;