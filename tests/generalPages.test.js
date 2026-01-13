require('dotenv').config();
const BaseDriver = require('../src/utils/BaseDriver');
const { HomePage } = require('../src/pages/HomePage');
const { TestCasesPage } = require('../src/pages/TestCasesPage');
const { ChartPage } = require('../src/pages/ChartPage');
const { ContactUsPage } = require('../src/pages/ContactUsPage');
const { ContactUsSubmittedPage } = require('../src/pages/ContactUsSubmittedPage');
const { test, expect } = require('@playwright/test');


const errors = [];
test.describe('Test Class 1 - General Pages', () => {
    test.beforeEach(async () => {
        await BaseDriver.setUp();
    });

    test.afterEach(async () => {
        await BaseDriver.tearDown();
    });


    test('Test 1 - Verify Subscription in home page', async () => {
            const homePage = await initialEntry();
            await homePage.subscribeProcess(BaseDriver.existingUserData.email);
    });

    test('Test 2 - Verify Subscription in Cart page', async () => {
             const homePage = await initialEntry();
             await homePage.clickOnChart();
             const chartPage = new ChartPage(BaseDriver.page);
             await chartPage.validateChartPageIsLoaded()
             await chartPage.subscribeProcess(BaseDriver.existingUserData.email);
    });

    test('Test 3 - Contact Us Form', async () => {
            const homePage = await initialEntry();
            await homePage.clickOnContactUs();
            const contactUsPage = new ContactUsPage(BaseDriver.page);

            await contactUsPage.validateContactUsLoading();
            await contactUsPage.setName(`${BaseDriver.existingUserData.first_name} ${BaseDriver.existingUserData.last_name}`);
            await contactUsPage.setEmail(BaseDriver.existingUserData.email);
            await contactUsPage.setSubject("This is test");
            await contactUsPage.setPMessage("This is test");
            await contactUsPage.uploadFile("some_data.txt");
            await contactUsPage.clickOnSubmitButton();

            const contactUsSubmittedPage = new ContactUsSubmittedPage(BaseDriver.page);
            await contactUsSubmittedPage.validateContactUsIsSubmitted();
            await contactUsSubmittedPage.clickOnHomeButton();

            await homePage.validateTestCasesButtonExistence();
    });

    test('Test 4 - Verify Test Cases Page', async () => {
                const homePage = await initialEntry();
                await homePage.clickOnTestCases();
                const testCasesPage = new TestCasesPage(BaseDriver.page);
                await testCasesPage.validateTestCasesPageIsOpened();
    });

    async function initialEntry() {
            await BaseDriver.firstNavigate();
            const homePage = new HomePage(BaseDriver.page);
            return homePage;
    }
});