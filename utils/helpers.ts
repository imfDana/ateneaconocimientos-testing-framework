import { Locator, expect, Page } from '@playwright/test';

export class Helpers {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    // Verify that the element searched by text is visible in the page

    async verifyVisibleText(texto: string) {
        const element = this.page.locator(`text=${texto}`);
        await expect(element).toBeVisible();
    }
}


