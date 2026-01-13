import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountCreatedPage extends BasePage {

    constructor(page) {
        super(page);
        this.accountCreatedTitle = "//*[@data-qa='account-created']/b";
        this.continueButton = 'a[data-qa="continue-button"]';
    }

    async validateNewAccountIsCreated() {
        await this.actions.validateElementText(this.accountCreatedTitle, "Account Created!");
    }

    async clickOnContinueButton() {
        await this.actions.click(this.continueButton);
    }

}