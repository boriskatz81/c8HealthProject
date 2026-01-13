import { Page } from '@playwright/test';
import { Actions } from '../utils/Actions';

export class BasePage {
    constructor(page) {
        this.page = page;
        this.actions = new Actions(page);

        this.subscribeTitle = "//*[text() = 'Subscription']";
        this.subscribeInput = "#susbscribe_email";
        this.subscribeButton = "#subscribe";
        this.subscribeSuccessfullyMessage = "//*[text() = 'You have been successfully subscribed!']";
    }

    async subscribeProcess(email) {
        await this.actions.getLocator(this.subscribeTitle);
        await this.actions.fill(this.subscribeInput, email);
        await this.actions.click(this.subscribeButton);
        await this.actions.getLocator(this.subscribeSuccessfullyMessage);
    }

    async compareExpectedWithActual(expectedData, actualData) {
         const errList = [];

         for (const key in expectedData) {
             if (expectedData[key] != actualData[key]) {
                errList.push(`${key} - ${expectedData[key]} != ${actualData[key]}`);
             }
             else {
                 console.log(`${key} - ${expectedData[key]} = ${actualData[key]}` + "\n");
             }
         }
         if (errList.length > 0) {
            throw new Error("Differences found:\n" + errList.join("\n"));
         }
    }
}