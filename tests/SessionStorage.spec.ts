import {test,expect} from '@playwright/test';

test.beforeAll(async ({browser})=>{

    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("rafi.tgcs219@gmail.com");
    await page.locator("#userPassword").fill("MBxanptFWYri5$k");
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path:'state.json'});
});

test("StorageState TestCase", async ({browser})=>{

    const webcontext=await browser.newContext({storageState:'state.json'});
    const page1=await webcontext.newPage();
    await page1.goto("https://rahulshettyacademy.com/client");

});