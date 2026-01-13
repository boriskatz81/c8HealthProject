require('dotenv').config();
const BaseDriver = require('../src/utils/BaseDriver');
const { HomePage } = require('../src/pages/HomePage');
const { TestCasesPage } = require('../src/pages/TestCasesPage');
const { ProductsPage } = require('../src/pages/ProductsPage');
const { LogInPage } = require('../src/pages/LogInPage');
const { ChartPage } = require('../src/pages/ChartPage');
const { ContactUsSubmittedPage } = require('../src/pages/ContactUsSubmittedPage');
const { test, expect } = require('@playwright/test');


const errors = [];
test.describe('Test Class 2 - Product and Chart Pages', () => {

    test.beforeEach(async () => {
        await BaseDriver.setUp();
    });

    test.afterEach(async () => {
        await BaseDriver.tearDown();
    });

    test('Test 1 - Verify All Products and product detail page', async () => {
            const homePage = await initialEntry();
            await homePage.clickOnProducts();
            const productsPage = new ProductsPage(BaseDriver.page);
            const productData = await productsPage.clickOnSpecificProductWithinTheList("Men Tshirt");
            await productsPage.validateProductPageDate(productData);
    });

    test('Test 2 - Search Product', async () => {
            const homePage = await initialEntry();
            await homePage.clickOnProducts();
            const productsPage = new ProductsPage(BaseDriver.page);
            const productData = await productsPage.filterSpecificProductAndValidateResults("Men Tshirt");
    });

    test('Test 3 - Add Products in Cart', async () => {
            const homePage = await initialEntry();
            await homePage.clickOnProducts();
            const productsPage = new ProductsPage(BaseDriver.page);
            const productData1 = await productsPage.addProductIntoChart(0);
            const productData2 = await productsPage.addProductIntoChart(1, false);

            await homePage.clickOnChart();
            const chartPage = new ChartPage(BaseDriver.page);
            await chartPage.validateChartPageIsLoaded()
            await chartPage.compareChartTableValues(0, productData1);
            await chartPage.compareChartTableValues(1, productData2);
    });

    async function initialEntry() {
            await BaseDriver.firstNavigate();
            const homePage = new HomePage(BaseDriver.page);
            return homePage;
    }

});