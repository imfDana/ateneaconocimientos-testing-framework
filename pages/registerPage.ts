import { Locator, Page } from '@playwright/test';

export class RegisterPage {
    readonly page;
    readonly inputName: Locator;
    readonly inputLastName: Locator;
    readonly inputEmail: Locator;
    readonly inputPassword: Locator;
    readonly showPasswordBtn: Locator;
    readonly inputConfirmPassword: Locator;
    readonly showConfirmPasswordBtn: Locator;
    readonly termsAndConditionsCheckbox: Locator;
    readonly termsAndConditionsLink: Locator;
    readonly privacyPolicyLink: Locator;
    readonly crateAccountBtn: Locator;
    readonly alreadyHaveAccountLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inputName = page.getByRole('textbox', { name: 'Nombre' });
        this.inputLastName = page.getByRole('textbox', { name: 'Apellido' });
        this.inputEmail = page.getByRole('textbox', { name: 'Correo electrónico' });
        this.inputPassword = page.getByRole('textbox', { name: 'Contraseña', exact: true });
        this.showPasswordBtn = page.getByRole('button', { name: 'Mostrar contraseña' }).first();
        this.inputConfirmPassword = page.getByRole('textbox', { name: 'Confirmar contraseña' });
        this.showConfirmPasswordBtn = page
            .getByRole('button', { name: 'Mostrar contraseña' })
            .last();
        this.termsAndConditionsCheckbox = page.getByRole('checkbox', {
            name: 'Acepto los Términos y',
        });
        this.termsAndConditionsLink = page.getByRole('link', { name: 'Términos y Condiciones' });
        this.privacyPolicyLink = page.getByRole('link', {
            name: 'Política de Privacidad',
            exact: true,
        });
        this.crateAccountBtn = page.getByRole('button', { name: 'Crear cuenta' });
        this.alreadyHaveAccountLink = page.getByRole('link', { name: '¿Ya tienes cuenta? Inicia' });
    }

    async inputNameValue(name: string) {
        await this.inputName.fill(name);
    }

    async inputLastNameValue(lastName: string) {
        await this.inputLastName.fill(lastName);
    }

    async inputEmailValue(email: string) {
        await this.inputEmail.fill(email);
    }

    async inputPasswordValue(password: string) {
        await this.inputPassword.fill(password);
    }

    async inputConfirmPasswordValue(confirmPassword: string) {
        await this.inputConfirmPassword.fill(confirmPassword);
    }

    async clickShowPassword() {
        await this.showPasswordBtn.click();
    }

    async clickShowConfirmPassword() {
        await this.showConfirmPasswordBtn.click();
    }

    async clickTermsAndConditionsCheckbox() {
        await this.termsAndConditionsCheckbox.check();
    }

    async clickTermsAndConditionsLink() {
        await this.termsAndConditionsLink.click();
    }

    async clickPrivacyPolicyLink() {
        await this.privacyPolicyLink.click();
    }

    async clickCreateAccountBtn() {
        await this.crateAccountBtn.click();
    }

    async clickAlreadyHaveAccountLink() {
        await this.alreadyHaveAccountLink.click();
    }

    async RegisterStudent(name: string, lastName: string, email: string, password: string) {
        await this.inputNameValue(name);
        await this.inputLastNameValue(lastName);
        await this.inputEmailValue(email);
        await this.inputPasswordValue(password);
        await this.inputConfirmPasswordValue(password);
        await this.clickTermsAndConditionsCheckbox();
        await this.clickCreateAccountBtn();
    }
}
