// import { Locator, Page } from '@playwright/test';

// export class EmailConfirmationModal {
//     readonly page;
//     readonly modalTitle: Locator;
//     readonly modalMessage: Locator;
//     readonly resendVerificationEmail: Locator;
//     readonly goBackToLoginBtn: Locator;

//     constructor(page: Page) {
//         this.page = page;
//         this.modalTitle = page.getByRole('heading', { name: 'Confirma tu correo electrónico' });
//         this.modalMessage = page.getByText(
//             'Hemos enviado un correo electrónico de verificación a tu dirección de correo electrónico. Por favor, revisa tu bandeja de entrada y haz clic en el enlace de verificación para completar tu registro.',
//         );
//         this.resendVerificationEmail = page.getByRole('button', {
//             name: 'Reenviar correo de verificación',
//         });
//         this.goBackToLoginBtn = page.getByRole('link', { name: 'Volver al inicio de sesión' });
//     }
// }
