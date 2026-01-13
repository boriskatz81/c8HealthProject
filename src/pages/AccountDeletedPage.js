import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountDeletedPage extends BasePage {

    constructor(page) {
        super(page);
        this.accountDeletedTitle = "//*[@data-qa='account-deleted']/b";
        this.continueButton = 'a[data-qa="continue-button"]';
    }

    async validateAccountIsDeleted() {
        await this.actions.validateElementText(this.accountDeletedTitle, "Account Deleted!");
    }

    async clickOnContinueButton() {
        await this.actions.click(this.continueButton);
    }

}