import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {

    constructor(page) {
        super(page);
        this.logInButton = 'a[href="/login"]';
        this.loggedInUser = "//*[@class='fa fa-user']/..";
        this.logOutButton = 'a[href="/logout"]';


        this.testCasesButtonMenu = 'a[href="/test_cases"]:not([class])';
        this.testCasesButton = 'a[href="/test_cases"][class="test_cases_list"]';
        this.deleteAccountButton = 'a[href="/delete_account"]';
        this.productsButton = 'a[href="/products"]';
        this.contactUsButton = 'a[href="/contact_us"]';
        this.homeButton = 'a[href="/""]';
        this.chartButton = 'a[href="/view_cart"]';
    }

    async validateTestCasesButtonExistence() {
            await this.actions.getLocator(this.testCasesButton);
    }

    async clickOnHome() {
        await this.actions.click(this.homeButton);
        await this.validateTestCasesButtonExistence();
    }

    async clickOnChart() {
        await this.actions.click(this.chartButton);
    }

    async clickOnContactUs() {
        await this.actions.click(this.contactUsButton);
    }

    async clickOnTestCases() {
        await this.actions.click(this.testCasesButtonMenu);
    }

    async clickOnProducts() {
          await this.actions.click(this.productsButton);
    }

    async clickOnClickLogIn() {
        await this.actions.click(this.logInButton);
    }

    async validateLogInButtonExistence() {
        await this.actions.getLocator(this.logInButton);
    }

    async clickOnDeleteAccount() {
        await this.actions.click(this.deleteAccountButton);
    }

    async validateSignedUser(userFullName) {
        await this.actions.validateElementText(this.loggedInUser,  `Logged in as ${userFullName}`);
    }

    async clickOnClickLogOut() {
        await this.actions.click(this.logOutButton);
    }
}