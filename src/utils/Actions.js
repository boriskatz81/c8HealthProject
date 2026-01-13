import { expect, Page, Locator } from '@playwright/test';

export class Actions {
    constructor(page) {
        this.page = page;
        this.timeout = 10000
    }


    async getLocator(selector, shouldBeEnabled = true) {
       try {
            const locator = this.page.locator(selector).first();
            await locator.waitFor({ state: 'attached', timeout: this.timeout });
            await locator.waitFor({ state: 'visible', timeout: this.timeout });


            if (shouldBeEnabled) {
                await this.page.waitForFunction(
                    (el) => el && !el.disabled,
                    await locator.elementHandle(),
                    { timeout: this.timeout }
                );
            }

            await locator.scrollIntoViewIfNeeded();
            return locator;
        } catch (error) {
            throw new Error(`Element "${selector}" was not found or it is not enabled`);
        }
    }

    async uploadFile(selector, fileName) {
        const filePath = `files_to_upload/${fileName}`
        const element = await this.getLocator(selector);
        await element.setInputFiles(filePath);
    }

    async click(selector) {
        const element = await this.getLocator(selector);
        await element.click();
        return element;
    }

    async fill(selector, text) {
        const element = await this.getLocator(selector);
        await element.fill(text);
    }

    async check(selector) {
        const element = await this.getLocator(selector);
        await element.check();
    }

    async validateElementText(selector, expectedText) {
        const element = await this.getLocator(selector);
        try {
            await expect(element).toHaveText(expectedText, { timeout: 10000 });
            console.log(`Text is "${expectedText}" as expected`);
        } catch (err) {
            const actualText = await element.textContent();
            throw new Error(`Custom error: Expected "${expectedText}" but got "${actualText}" - ${err}`);
        }
    }

    async validateElementAttribute(selector, attribute, expectedValue) {
         const element = await this.getLocator(selector, false);
         const attributeValue = await element.getAttribute(attribute);
         try {
                await expect(attributeValue).toBe(expectedValue, { timeout: 10000 });
                console.log(`Value is "${expectedValue}" as expected`);
         } catch (err) {
                throw new Error(`Custom error: Expected "${expectedValue}" but got "${attributeValue}" - ${err}`);
         }
    }

    async selectByText(selector, dropDownText) {
        const element = await this.getLocator(selector);
        await element.selectOption({ label: dropDownText });
    }
}