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

it.only("Using get with find and eq", () => {
  cy.viewport(1800, 700);
  cy.visit("https://docs.cypress.io/api/commands/eq.html#Syntax");
  cy.get('div').find('nav').find('ul').find('li').find('a').eq(0);
});
