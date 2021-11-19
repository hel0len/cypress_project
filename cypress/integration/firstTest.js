/// <reference types="Cypress" />
import { mobileReplenishment } from "../support/pages/mobileReplenishment"
import { transfers } from "..//support/pages/transfers"
import { basePage } from "../support/pages/basePage";

// it('By ID', () => {
//   cy.visit("https://facebook.com/");
//   cy.get('#email')
// });

// it('By Class', () => {
//   cy.visit("https://facebook.com/");
//   cy.get('._6lux')
// });

// it('By Tag', () => {
//   cy.visit("https://docs.cypress.io/api/table-of-contents");
//   cy.get('nav')
// });

// it('By Tag Value', () => {
//   cy.visit("https://facebook.com/");
//   cy.get('[name="pass"]')
// });

// it('By Different Tag Value', () => {
//   cy.visit("https://facebook.com/");
//   cy.get('[data-testid="open-registration-form-button"][role="button"]')
// });

// it('By Different Type', () => {
//   cy.visit("https://docs.cypress.io/api/commands/get");
//   cy.get('button[type="button"][aria-label="Search"]')
// });

// it.only('By Contain`s name', () => {
//   cy.visit("https://next.privat24.ua/");
//   cy.get('*[class^="card"]')
// });

it("Using get with find and eq", () => {
  cy.visit("https://next.privat24.ua/deposit");
  cy.get('tbody').find('td').find('div').find('button').eq(0);
});

it("Using get with find and eq", () => {
  cy.viewport(1800, 700);
  cy.visit("https://docs.cypress.io/api/commands/eq.html#Syntax");
  cy.get('div').find('nav').find('ul').find('li').find('a').eq(0);
});

it('Название на русском', () => {
  cy.visit("https://next.privat24.ua/mobile?lang=en");
  cy.contains('Sign in')
});

it('Contains с игнорированием регистра', () => {
  cy.visit("https://next.privat24.ua/mobile?lang=en");
  cy.contains('SIGN in', {matchCase: false});
})

// Неявная проверка - с элементом найденным родительской командой
it('SHOULD', () => {
  cy.visit("https://next.privat24.ua/mobile?lang=en");
  cy.get('[data-qa-node="amount"]') // находим элемент 
    .type(100) // меняем значение на 100
    .should('have.value', 100) // проверяем что элемент имеет значение 100
    .and('be.visible') // проверяем что элемент видимый 
});


// Явная проверка - с передачей в функцию элемента который проверяется
it('EXPECT', () => {
  cy.visit("https://next.privat24.ua/mobile?lang=en");
  cy.get('[data-qa-node="amount"]')
    .type(100).then ( input => {  // меняем значение на 100 и в вызываемой функции then передаем элемент (input) 
        expect(input).to.have.value('100') // проверяем что переданный элемент иммет значение 100 
    })
});

it('неявная проверка на то что элемент активен (checked)', () => {
  cy.visit("https://next.privat24.ua/deposit?lang=en");
  cy.get('[data-qa-value="UAH"]')
    .should('be.checked') // проверяем что элемент имеет атрибут checked = true
});

it('неявная проверка на появление ссылки при наведении на элемент', () => {
  cy.visit("https://next.privat24.ua/deposit?lang=en");
  cy.contains('Мої депозити') // находим элемент содержащий текст
    .trigger('mouseover') // наводим мышкой на элемент
    .get('#archiveDeposits') // находим в появившемся меню эелемнт
    .should('be.visible') // проверяем что этлемент видимый
});

it('Неявная проверка на соответствие значению элемента ', () => {
  cy.visit("https://next.privat24.ua/?lang=en");
  cy.contains('Show cards') // находим элемент содержащий текст
    .should('have.attr', 'type') // проверяем что этлемент содержит атрибут 'type'
    .and('match', /button/) // проверяем что значение найденного атрибута равно 'button' (регулярка)
});

it('Проверка на корректность текущего url', () => {
  cy.visit("https://next.privat24.ua/?lang=en");
  cy.url() // получаем текущий урл
    .should('eq', 'https://next.privat24.ua/?lang=en') // проверка что юрл эквивалентен ожидаемому
});

// Авторизация в мидхабе
it('', () => {
  cy.visit('http://localhost:8084/')
  cy.get('[data-id="go-to-auth-button"]').click()
  cy.get('[data-id="pin-input"]').type('0000')
  cy.get('[data-id="auth-button"]').click()
})


// Тест без page object на пополнение счета телефона 
it('Пополнение украинского мобильного телефона', () => {
  basePage.open('https://next.privat24.ua/mobile?lang=en'); 
  mobileReplenishment.typePhoneNumber('686979712');
  basePage.typeAmount('1');
  basePage.typeDebitCardData('4552331448138217', '0524', '111', 'SHAYNE', 'MCCONNELL');
  cy.wait(1000);      
  basePage.submitForm();
  cy.wait(2000);
  mobileReplenishment.checkDebitCard('4552 **** **** 8217');
  mobileReplenishment.checkDebitAmount('1');
  mobileReplenishment.checkDebitTotal('2');
  mobileReplenishment.checkPaymentCurrency('UAH')
  });


  // Тест без page object на перевод с карты на карту
it('Перевод с карты на карту', () => {
  basePage.open('https://next.privat24.ua/money-transfer/card?lang=en')
    basePage.typeDebitCardData('4552331448138217', '0524', '111', 'SHAYNE', 'MCCONNELL');
    transfers.typeDebitCardNumber('5309233034765085');
    basePage.typeAmount('300');
    transfers.typeComment('cypress_test');
    basePage.submitForm();
    cy.wait(2000);
    transfers.checkDebitAndRecieverCards('4552 3314 4813 8217', '5309 2330 3476 5085');
    transfers.checkPayerAmount('300 UAH')
    transfers.checkPayerCurrency('84.67 UAH')
    transfers.checkTotal('384.67')
    transfers.checkCommentText('cypress_test')
  });

  // Get запрос 
  it('Example GET request', () => {
    cy.request('https://next.privat24.ua')
      .then((response) => {
        console.log(response)
      })
  })

  // Post запрос 
  it.only('Example POST request', () => {

    const requestBody = {
      "action":"info","phone":"+380987654323","amount":300,"currency":"UAH","cardCvv":"111","card":"4552331448138217","cardExp":"0526","xref":"1ca1a79d41c847dad7d72b8f96d240a0","_":1637313457598
      };

    const headersData = {
      cookie: 'pubkey=c2648f454b294190a16f85e21b658bef; fp=17; lfp=11/16/2021, 1:54:16 PM; pa=1637147579259.00850.1910255502578353next.privat24.ua0.9854486950568657+4'
    };

    cy.request({
      method: 'POST',
      url: 'https://next.privat24.ua/api/p24/pub/mobipay',
      body: requestBody,
      headers: headersData
    })
    .then((response) => {
      console.log(response.body)
    })
  })