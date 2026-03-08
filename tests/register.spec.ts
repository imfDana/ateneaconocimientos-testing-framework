import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { HomePage } from '../pages/homePage';
import { RegisterPage } from '../pages/registerPage';
import { Helpers } from '../utils/helpers';

let homePage: HomePage;
let registerPage: RegisterPage;
let helpers: Helpers;

dotenv.config();

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  registerPage = new RegisterPage(page);
  helpers = new Helpers(page);
});

test('TC-03: Student Registration (Sign up)', async ({ page }) => {
  const email = `students${Date.now()}@automation.com`;
  await homePage.NavigateToHome();
  await homePage.NavigateToRegister();
  await registerPage.RegisterStudent('Ana', 'Pérez', email, 'Atenea123');
  // Verify that the request to /api/students/register retreives a 201  
  await helpers.checkAPIResponse('/api/students/register', 'POST', 201);

  await expect(page).toHaveURL(/.*verification-pending.*/);
  await helpers.verifyVisibleText('Verifica tu email');
  await page.waitForTimeout(5000);
});

