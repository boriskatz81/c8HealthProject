import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class TestCasesPage extends BasePage {

    constructor(page) {
        super(page);
        this.testCasesTitle = '//b[text()="Test Cases"]';
        this.testCasesLink = '//u[contains(text() , "Test Case 1:")]';
    }

    async validateTestCasesPageIsOpened() {
        await this.actions.getLocator(this.testCasesTitle);
        await this.actions.getLocator(this.testCasesLink);
        console.log("Both Test Cases Elements were found");
    }
}