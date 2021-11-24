const exp = require("constants")

// ----------------------- Локаторы -------------------------------

export const baseLoc = {
  // Левая панель с навигацией 
  navMenu: '[data-id="navigation-menu"]',
  // Кнопка логаута
  logoutButton: '[data-id="user-menu-logout-button"]',
  // Ссылка на модуль доменов в левом меню
  domainsLink: 'Домены'

}

// --------------------------- Методы ------------------------------

export class BasePage {

  // Переход на переданный модуль
   openModule(locator) {
    cy.contains(locator, { timeout: 30000 }).click()
   };

  // Получение тела iframe 
  getIframeDocument(locator) {
    return cy.get(locator).its('0.contentDocument').should('exist')
  }
  getIframeBody(locator) {
    return this.getIframeDocument(locator).its('body').should('not.be.undefined').then(cy.wrap)
  }
}

export const basePage = new BasePage()
