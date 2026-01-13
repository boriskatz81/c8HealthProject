import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SignUpPage extends BasePage {

    constructor(page) {
        super(page);
        this.signUpTitle = "xpath=//div[@class='login-form']/*[@class='title text-center']/b";
        this.genderRadioButton = (value) => `input[id*="id_gender"][value="${value}"]`;
        this.signUpFullNameInput = "#name";
        this.signUpEmailInput = "#email";
        this.signUpPasswordInput = "#password";

        this.signUpBirthDayDropDown = "#days";
        this.signUpBirthMonthDropDown = "#months";
        this.signUpBirthYearDropDown = "#years";

        this.newsletterCheckBox = "#newsletter";
        this.optinCheckBox = "#optin";

        this.signUpFirstNameInput = "#first_name";
        this.signUpLastNameInput = "#last_name";
        this.signUpCompanyInput = "#company";
        this.signUpAddress1Input = "#address1";
        this.signUpAddress2Input = "#address2";
        this.signUpCountryInput = "#country";
        this.signUpStateInput = "#state";
        this.signUpCityInput = "#city";
        this.signUpZipCodeInput = "#zipcode";
        this.signUpMobileInput = "#mobile_number";

        this.createAccountButton = 'button[data-qa="create-account"]';
    }

    async validateSignUpLoading() {
        await this.actions.validateElementText(this.signUpTitle, "Enter Account Information");
    }

    async setGender(gender) {
        await this.actions.check(this.genderRadioButton(gender));
    }

    async validateFullName(expectedFullName) {
        await this.actions.validateElementAttribute(this.signUpFullNameInput, "value", expectedFullName);
    }

    async validateEmail(expectedEmail) {
         await this.actions.validateElementAttribute(this.signUpEmailInput, "value", expectedEmail);
    }

    async setPassword(password) {
          await this.actions.fill(this.signUpPasswordInput, password);
    }

    async setBirthDay(birthday) {
         const dateParts = birthday.split(/-/);
         await this.actions.selectByText(this.signUpBirthDayDropDown, dateParts[0]);
         await this.actions.selectByText(this.signUpBirthMonthDropDown, dateParts[1]);
         await this.actions.selectByText(this.signUpBirthYearDropDown, dateParts[2]);
    }

    async setNewsletter() {
         await this.actions.check(this.newsletterCheckBox);
    }

    async setOptin() {
         await this.actions.check(this.optinCheckBox);
    }

    async setFirstName(first_name) {
          await this.actions.fill(this.signUpFirstNameInput, first_name);
    }

    async setLastName(last_name) {
          await this.actions.fill(this.signUpLastNameInput, last_name);
    }

    async setCompany(company) {
          await this.actions.fill(this.signUpCompanyInput, company);
    }

    async setAddress1(address1) {
          await this.actions.fill(this.signUpAddress1Input, address1);
    }

    async setAddress2(address2) {
          await this.actions.fill(this.signUpAddress2Input, address2);
    }

    async setCountry(country) {
         await this.actions.selectByText(this.signUpCountryInput, country);
    }

    async setState(state) {
         await this.actions.fill(this.signUpStateInput, state);
    }

    async setCity(city) {
         await this.actions.fill(this.signUpCityInput, city);
    }

    async seZipCode(zipCode) {
         await this.actions.fill(this.signUpZipCodeInput, zipCode);
    }

    async seMobile(mobile) {
         await this.actions.fill(this.signUpMobileInput, mobile);
    }

    async clickOnCreateAccountButton() {
        await this.actions.click(this.createAccountButton);
    }

}