import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ContactUsPage extends BasePage {

    constructor(page) {
        super(page);
        this.contactUsTitle = "//div[@class='contact-form']/*[@class='title text-center']";

        this.nameInput = "input[data-qa='name']";
        this.emailInput = "input[data-qa='email']";
        this.subjectInput = "input[data-qa='subject']";

        this.messageInput = "#message";
        this.fileInput = "input[name='upload_file']";

        this.submitButton = 'input[name="submit"]';
    }

    async validateContactUsLoading() {
        await this.actions.validateElementText(this.contactUsTitle, "Get In Touch");
    }

    async setName(name) {
        await this.actions.fill(this.nameInput, name);
    }

    async setEmail(email) {
        await this.actions.fill(this.emailInput, email);
    }

    async setSubject(subject) {
         await this.actions.fill(this.subjectInput, subject);
    }

    async setPMessage(message) {
          await this.actions.fill(this.messageInput, message);
    }

    async uploadFile(fileName) {
       await this.actions.uploadFile(this.fileInput, fileName)
    }

    async clickOnSubmitButton() {
        this.page.once('dialog', async dialog => {
                await dialog.accept();
            });

        await this.actions.click(this.submitButton);
    }
}