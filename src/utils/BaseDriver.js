const { chromium } = require('playwright');

class BaseDriver {
    static browser = null;
    static context = null;
    static page = null;


    static existingUserData = {
        first_name: process.env.EXISTING_FIRST_NAME,
        last_name: process.env.EXISTING_LAST_NAME,
        email: process.env.EXISTING_EMAIL,
        password: process.env.PASSWORD
    };

    static async firstNavigate() {
       await this.page.goto(process.env.BASE_URL);

        await this.page.evaluate(() => {
            const ad = document.getElementById('ad_position_box');
            if (ad) ad.remove();
        });

        await this.page.evaluate(() => {
            const removeAd = () => {
                const ad = document.getElementById('ad_position_box');
                if (ad) ad.remove();
            };
            removeAd();
            const observer = new MutationObserver(removeAd);
            observer.observe(document.body, { childList: true, subtree: true });
        });
    }

    static async setUp(headless = false) {
        this.browser = await chromium.launch({
            headless,
            args: [
                '--no-sandbox',
                '--disable-extensions',
                '--start-maximized'
            ],
        });

        this.context = await this.browser.newContext({
            viewport: null,
            locale: 'en-US',
        });

      /*  await this.context.addInitScript(() => {
                const removeAd = () => {
                    const ad = document.getElementById('ad_position_box');
                    if (ad) ad.remove();
                };

                removeAd();
                new MutationObserver(removeAd).observe(document.documentElement, {
                    childList: true,
                    subtree: true,
                });
        });*/
        this.page = await this.context.newPage();
    }

    static async tearDown() {
        if (this.context) {
            await this.context.close();
        }
        if (this.browser) {
            await this.browser.close();
        }
        this.browser = null;
        this.context = null;
        this.page = null;
    }
}

module.exports = BaseDriver;