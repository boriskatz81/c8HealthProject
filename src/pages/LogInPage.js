import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LogInPage extends BasePage {

    constructor(page) {
        super(page);
        this.signUpNameInput = 'input[data-qa="signup-name"]';
        this.signUpEmailInput = 'input[data-qa="signup-email"]';
        this.signUpButton = 'button[data-qa="signup-button"]';
        this.signUpErrorMessage = '//*[text()="Email Address already exist!"]';

        this.logInEmailInput = 'input[data-qa="login-email"]';
        this.logInPasswordInput = 'input[data-qa="login-password"]';
        this.logInButton = 'button[data-qa="login-button"]';
        this.logInErrorMessage = '//*[text()="Your email or password is incorrect!"]';
    }

    async logInProcess(userData, is_positive=true) {
        await this.actions.fill(this.logInEmailInput, userData.email);
        await this.actions.fill(this.logInPasswordInput, userData.password);
        await this.actions.click(this.logInButton);
        if(is_positive) {
           return;
        }
        await this.actions.getLocator(this.logInErrorMessage);
    }

    async clickOnSignUpButton(is_positive=true) {
        await this.actions.click(this.signUpButton);
        if(is_positive) {
           return;
        }
        await this.actions.getLocator(this.signUpErrorMessage);
    }

    async enterNewName(signUpName) {
        await this.actions.fill(this.signUpNameInput, signUpName);
    }

    async enterNewEmail(signUpEmail) {
        await this.actions.fill(this.signUpEmailInput, signUpEmail);
    }
}