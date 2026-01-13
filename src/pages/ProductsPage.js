import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {

    constructor(page) {
        super(page);
        this.allProductsTitle = '//*[@class="title text-center" and text()="All Products"]';
        this.productListItem = '.product-image-wrapper';

        this.productName = (value) => `//div[@class="product-information"]//h2[text()="${value}"]`;
        this.productCategory = '//div[@class="product-information"]//p[contains(text(), "Category:")]';
        this.productPrice = (value) => `//div[@class="product-information"]//span[text()="${value}"]`;
        this.productAvailability = '//div[@class="product-information"]//b[contains(text(), "Availability:")]';
        this.productCondition = '//div[@class="product-information"]//b[contains(text(), "Condition:")]';
        this.productBrand = '//div[@class="product-information"]//b[contains(text(), "Brand:")]';

        this.productSearchInput = "#search_product";
        this.productSearchButton = "#submit_search";

        this.addToChartButton = ".btn.btn-default.add-to-cart"
        this.continueShoppingButton = "//button[@class = 'btn btn-success close-modal btn-block' and text() = 'Continue Shopping']";
        this.viewChartButton = "//div[@class= 'modal-body']//a[@href='/view_cart']";
    }

    async addProductIntoChart(productIndex, continueShopping = true) {
        await this.actions.getLocator(this.allProductsTitle);
        await this.actions.getLocator(this.productListItem);

        const allProducts = this.page.locator(this.productListItem);
        const count = await allProducts.count();
        if (count < productIndex) {
           throw new Error(`Products amount is "${count}" less than "${productIndex}"`);
        }
        const el = allProducts.nth(productIndex);
        const productData = {
             name: await el.locator("p").first().textContent(),
             price: await el.locator("h2").first().textContent(),
             totalPrice: await el.locator("h2").first().textContent(),
             quantity: "1"
        };

        el.locator(this.addToChartButton).first().click();
        if (continueShopping) {
            await this.actions.click(this.continueShoppingButton);
        }
        else {
            await this.actions.click(this.viewChartButton);
        }
        return productData;
    }

    async filterSpecificProductAndValidateResults(productName) {
        await this.actions.getLocator(this.allProductsTitle);
        await this.actions.fill(this.productSearchInput, productName);
        await this.actions.click(this.productSearchButton);

         await this.actions.getLocator(this.productListItem);
         const allProducts = this.page.locator(this.productListItem);
         const count = await allProducts.count();
         for (let i = 0; i < count; i++) {
              const el = allProducts.nth(i);
              const actualName = await el.locator("p").first().textContent();
              if (actualName.toLowerCase().trim() != productName.toLowerCase().trim()) {
                  throw new Error(`Product "${i}" name is "${actualName}" instead of "${productName}"`);
              }
              else {
                  console.log(`Product "${i}" name is "${actualName}" as expected`);
              }
         }
    }

    async clickOnSpecificProductWithinTheList(productName) {
        await this.actions.getLocator(this.allProductsTitle);
        await this.actions.getLocator(this.productListItem);

        const allProducts = this.page.locator(this.productListItem);
        const count = await allProducts.count();
        for (let i = 0; i < count; i++) {
            const el = allProducts.nth(i);
            const text = await el.textContent();

            if (text?.toLowerCase().includes(productName.toLowerCase())) {
                const productData = {
                    name: await el.locator("p").first().textContent(),
                    price: await el.locator("h2").first().textContent()
                };

                const viewElement = await el.locator('a[href*="/product_details/"]');
                await viewElement.click();

                return productData;
            }
        }
        throw new Error(`No product "${productName}" was found`);
    }

    async validateProductPageDate(productData) {
        await this.actions.getLocator(this.productName(productData.name));
        await this.actions.getLocator(this.productPrice(productData.price));
        await this.actions.getLocator(this.productCategory);
        await this.actions.getLocator(this.productCondition);
        await this.actions.getLocator(this.productAvailability);
        await this.actions.getLocator(this.productBrand);
    }
}