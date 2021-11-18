/// <reference types="Cypress" />

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
  cy.visit('https://next.privat24.ua/mobile?lang=en')  
    .get('[data-qa-node="phone-number"]')
    .type('686979712')
    .get('[data-qa-node="amount"]')
    .type('1')
    .get('[data-qa-node="numberdebitSource"]')
    .type('4552331448138217')
    .get('[data-qa-node=expiredebitSource]')
    .type('0524')
    .get('[data-qa-node="cvvdebitSource"]')
    .type('111')
    .wait(1000)
    .get('[data-qa-node="firstNamedebitSource"]')
    .type('SHAYNE')
    .get('[data-qa-node="lastNamedebitSource"]')
    .type('MCCONNELL')
    .get('[data-qa-node="submit"]')
    .click()
    .wait(2000)
    .get('[data-qa-node="card"]')
    .should('have.text', '4552 **** **** 8217')
    .get('[data-qa-node="amount"]')
    .should('have.text', '1')
    .get('[data-qa-node="currency"]')
    .eq(1)
    .should('contain.text', 'UAH')
    .get('[data-qa-node="commission"]').eq(1)
    .should('have.text', '2')
    .get('[data-qa-node="commission-currency"]')
    .should('contain.text', 'UAH')
  });


  // Тест без page object на перевод с карты на карту
it.only('Пополнение украинского мобильного телефона', () => {
  cy.visit('https://next.privat24.ua/money-transfer/card?lang=en')
    .get('[data-qa-node="numberdebitSource"]').type('4552331448138217')
    .get('[data-qa-node=expiredebitSource]').type('0524')
    .get('[data-qa-node="cvvdebitSource"]').type('111')
    .get('[data-qa-node="firstNamedebitSource"]').type('SHAYNE')
    .get('[data-qa-node="lastNamedebitSource"]').type('MCCONNELL')
    .get('[data-qa-node="numberreceiver"]').type('5309233034765085')
    .get('[data-qa-node="amount"]').type('300')
    .get('[data-qa-node="toggle-comment"]').click()
    .get('[data-qa-node="comment"]').type('cypress_test')
    .get('[type="submit"]').click()
    .wait(2000)
    .get('[data-qa-node="payer-card"]')
      .should('have.text', '4552 3314 4813 8217')
    .get('[data-qa-node="receiver-card"]')
      .should('have.text', '5309 2330 3476 5085')
    .get('[data-qa-node="payer-amount"]')
      .should('have.text', '300 UAH')
    .get('[data-qa-node="payer-currency"]')
      .should('have.text', '84.67 UAH')
    .get('[data-qa-node="total"]').find('div')
      .should('contain.text', '384.67')
      .and('contain.text', 'UAH')
    .get('[data-qa-node="comment"]')
      .should('have.text', 'cypress_test')
  });
