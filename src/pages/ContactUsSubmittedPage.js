import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ContactUsSubmittedPage extends BasePage {

    constructor(page) {
        super(page);
        this.contactUsSubmittedTitle = ".status.alert.alert-success";
        this.homeButton = '.btn.btn-success';
    }

    async validateContactUsIsSubmitted() {
        await this.actions.validateElementText(this.contactUsSubmittedTitle, "Success! Your details have been submitted successfully.");
    }

    async clickOnHomeButton() {
        await this.actions.click(this.homeButton);
    }

}