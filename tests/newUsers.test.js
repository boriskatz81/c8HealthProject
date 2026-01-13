require('dotenv').config();
const BaseDriver = require('../src/utils/BaseDriver');
const { HomePage } = require('../src/pages/HomePage');
const { LogInPage } = require('../src/pages/LogInPage');
const { SignUpPage } = require('../src/pages/SignUpPage');
const { AccountCreatedPage } = require('../src/pages/AccountCreatedPage');
const { AccountDeletedPage } = require('../src/pages/AccountDeletedPage');
const { test, expect } = require('@playwright/test');

const newUserData = {
    first_name: process.env.NEW_FIRST_NAME,
    last_name: process.env.NEW_LAST_NAME,
    email: process.env.NEW_EMAIL,
    password: process.env.PASSWORD,
    birthday: "6-June-1981",
    gender: "Mr",
    company: "Test Company",
    address1: "4",
    address2: "John Smith street",
    country: "Israel",
    state: "Central",
    city: "Tel Aviv",
    zipCode: "123",
    mobile: "0527079087",
};


const errors = [];
test.describe('Test Class 3 - Register User', () => {

    test.beforeEach(async () => {
        await BaseDriver.setUp();
    });

    test.afterEach(async () => {
        await BaseDriver.tearDown();
    });

    test('Test 1 - Register User with existing email', async () => {
           const pagesObjects = await enterLogInPage();
           await enterSignUpPage(pagesObjects.logIn, BaseDriver.existingUserData, false);
    });

    test('Test 2 - New User Sign Up', async () => {
           const pagesObjects = await enterLogInPage();
           const signUpPage = await enterSignUpPage(pagesObjects.logIn, newUserData);
           await signUpProcess(signUpPage);
           await pagesObjects.home.validateSignedUser(`${newUserData.first_name} ${newUserData.last_name}`);
    });

    test('Test 3 - Logout User', async () => {
           const pagesObjects = await logInProcess(newUserData);
           await pagesObjects.home.clickOnClickLogOut();
           await pagesObjects.home.validateLogInButtonExistence();
           await BaseDriver.page.waitForTimeout(5000);
    });

    test('Test 4 - Login User with incorrect email and password', async () => {
           const invalidUserData = {
               email: "invalid_email@gmail.com",
               password: "invalid password",
           };

           await logInProcess(invalidUserData, false);
           await BaseDriver.page.waitForTimeout(5000);
    });

    test('Test 5 - Login User with correct email and password', async () => {
           const pagesObjects =  await logInProcess(newUserData);

           await pagesObjects.home.validateSignedUser(`${newUserData.first_name} ${newUserData.last_name}`);
           await pagesObjects.home.clickOnDeleteAccount();

           const accountDeletedPage = new AccountDeletedPage(BaseDriver.page);
           await accountDeletedPage.validateAccountIsDeleted();
           await accountDeletedPage.clickOnContinueButton();

           await pagesObjects.home.validateLogInButtonExistence();
    });

    async function enterLogInPage() {
        await BaseDriver.firstNavigate();
        const homePage = new HomePage(BaseDriver.page);
        await homePage.clickOnClickLogIn();

        const logInPage = new LogInPage(BaseDriver.page);
        return {logIn: logInPage , home:  homePage};
    }

    async function logInProcess(userData, isPositive = true) {
        const pagesObjects = await enterLogInPage()
        await pagesObjects.logIn.logInProcess(userData, isPositive);
        return pagesObjects;
    }

    async function enterSignUpPage(logInPage, userData, isPositive = true) {
        await logInPage.enterNewName(`${userData.first_name} ${userData.last_name}`);
        await logInPage.enterNewEmail(userData.email);
        await logInPage.clickOnSignUpButton(isPositive);

        if (!isPositive) {
           return;
        }
        const signUpPage = new SignUpPage(BaseDriver.page);
        await signUpPage.validateSignUpLoading();
        return signUpPage;
    }

    async function signUpProcess(signUpPage) {
        await signUpPage.setGender(newUserData.gender);
        await signUpPage.validateFullName(`${newUserData.first_name} ${newUserData.last_name}`);
        await signUpPage.validateEmail(newUserData.email);
        await signUpPage.setPassword(newUserData.password);
        await signUpPage.setBirthDay(newUserData.birthday);

        await signUpPage.setNewsletter();
        await signUpPage.setOptin();

        await signUpPage.setFirstName(newUserData.first_name);
        await signUpPage.setLastName(newUserData.last_name);
        await signUpPage.setCompany(newUserData.company);
        await signUpPage.setAddress1(newUserData.address1);
        await signUpPage.setAddress2(newUserData.address2);
        await signUpPage.setCountry(newUserData.country);
        await signUpPage.setState(newUserData.state);
        await signUpPage.setCity(newUserData.city);
        await signUpPage.seZipCode(newUserData.zipCode);
        await signUpPage.seMobile(newUserData.mobile);
        await signUpPage.clickOnCreateAccountButton();

        const accountCreatedPage = new AccountCreatedPage(BaseDriver.page);
        await accountCreatedPage.validateNewAccountIsCreated();
        await accountCreatedPage.clickOnContinueButton();
    }
});