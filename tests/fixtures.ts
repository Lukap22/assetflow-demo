// fixtures.ts
import { test as base, Page, Browser } from "@playwright/test";
export { expect } from "@playwright/test";
import { storageStatePathByRole } from "./global-setup";

// Page Object Model for the "admin" page.
// Here you can add locators and helper methods specific to the admin page.
class AdminPage {
    // Page signed in as "admin".
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    static async create(browser: Browser) {
        const context = await browser.newContext({ storageState: storageStatePathByRole("administrator") });
        const page = await context.newPage();
        return new AdminPage(page);
    }
}

// Page Object Model for the "user" page.
// Here you can add locators and helper methods specific to the user page.
class CustomerPage {
    // Page signed in as "user".
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    static async create(browser: Browser) {
        const context = await browser.newContext({ storageState: storageStatePathByRole("customer") });
        const page = await context.newPage();
        return new CustomerPage(page);
    }
}

// Declare the types of your fixtures.
type MyFixtures = {
    adminPage: AdminPage;
    customerPage: CustomerPage;
};


// Extend base test by providing "adminPage" and "userPage".
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<MyFixtures>({
    adminPage: async ({ browser }, use) => {
        await use(await AdminPage.create(browser));
    },
    customerPage: async ({ browser }, use) => {
        await use(await CustomerPage.create(browser));
    },
});


// // example.spec.ts
// // Import test with our new fixtures.
// import { test, expect } from "./fixtures";
//
//
// // Use adminPage and userPage fixtures in the test.
// test("admin and user", async ({ adminPage, userPage }) => {
//     // ... interact with both adminPage and userPage ...
//     await adminPage.page.screenshot();
//     await expect(userPage.greeting).toHaveText("Welcome, User");
// });