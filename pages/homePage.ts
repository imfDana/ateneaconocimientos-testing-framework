import { Locator, Page } from '@playwright/test';

export class HomePage {
    readonly page;
    readonly createAccountBtn: Locator;
    readonly urlHome = process.env.BASE_URL;

    constructor(page: Page) {
        this.page = page;
        this.createAccountBtn = page.getByRole('link', { name: 'Crear cuenta' });
    }

    async NavigateToHome() {
        await this.page.goto(this.urlHome!);
    }

    async NavigateToRegister() {
        await this.createAccountBtn.click();
    }
}
