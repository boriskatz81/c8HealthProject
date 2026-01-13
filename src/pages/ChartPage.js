import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ChartPage extends BasePage {

    constructor(page) {
        super(page);
        this.shoppingCartTitle = '//div[@class="breadcrumbs"]//li[@class="active"]';
        this.cartDescription = 'a[href*="/product_details/"]';
        this.cartPrice = '.cart_price';
        this.cartQuantity = '.cart_quantity';
        this.cartTotalPrice = '.cart_total';
    }

    async validateChartPageIsLoaded() {
         await this.actions.validateElementText(this.shoppingCartTitle, "Shopping Cart");
    }

    async compareChartTableValues(rowIndex , expectedData) {
        await this.actions.getLocator(this.cartDescription);
        const allCartDescriptions = this.page.locator(this.cartDescription);
        const count = await allCartDescriptions.count();
        if (count < rowIndex) {
             throw new Error(`Carts amount is "${count}" less than "${rowIndex}"`);
        }

        const actualData = {
               name: await this.page.locator(this.cartDescription).nth(rowIndex).textContent(),
               price: (await this.page.locator(this.cartPrice).nth(rowIndex).textContent()).replace(/\s+/g, ' ').trim(),
               quantity: (await this.page.locator(this.cartQuantity).nth(rowIndex).textContent()).replace(/\s+/g, ' ').trim(),
               totalPrice: (await this.page.locator(this.cartTotalPrice).nth(rowIndex).textContent()).replace(/\s+/g, ' ').trim()
        };

        await this.compareExpectedWithActual(expectedData, actualData);
    }


}