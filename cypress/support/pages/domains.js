import { basePage } from "./basePage";

export const domLoc = {

  // --------------------------------- Локаторы для модуля доменов ------------------------

  // ifarme Домены
  ifarmeDomains: 'iframe',
  // Домен Midhub Global
  midhubGlobal: '[href="/domains/documents/domain/1"]',
  // Шестеренка
  gear: '[data-id="domain-settings-button"]',
  // Кнопка в шестеренке для создания поддомена
  createSubdomain: '[href="/domains/documents/domain/1/create"]',
  // Кнопка "Назад" на список доменов 
  backButton: '[xmlns="http://www.w3.org/2000/svg"]',
  // Поле имена на эране создания Домена
  domainName: '[name="name"]',
  // Поле кода на экране создания Домена 
  domainCode: '[name="domainCode"]',
  // Чекбокс согласия с условиями на экране создания Домена
  checkAgree: '[data-id="domain-agree-create-btn"]',
  // Кнопка Create на экране создания Домена
  createButton: '[data-id="domain-create-btn"]'

}

export class Domains {
  
  // Создание кастомного домена
  createDomain(name, code) {
    // Получаем тело iframe Домены
    const domainsIframe = basePage.getIframeBody(domLoc.ifarmeDomains);
    cy.wait(5000);
    basePage
      .getIframeBody(domLoc.ifarmeDomains)
      .find(domLoc.midhubGlobal, { timeout: 30000 })
      .click();
    basePage
      .getIframeBody(domLoc.ifarmeDomains)
      .find(domLoc.gear, { timeout: 10000 })
      .click();
    basePage
      .getIframeBody(domLoc.ifarmeDomains)
      .find(domLoc.createSubdomain, { timeout: 60000 })
      .click();
    basePage
      .getIframeBody(domLoc.ifarmeDomains)
      .find(domLoc.domainName)
      .click()
      .type(name);
    basePage
      .getIframeBody(domLoc.ifarmeDomains)
      .find(domLoc.domainCode)
      .click()
      .type(code);
    basePage
      .getIframeBody(domLoc.ifarmeDomains)
      .find(domLoc.checkAgree)
      .click();
    basePage
      .getIframeBody(domLoc.ifarmeDomains)
      .find(domLoc.createButton)
      .click();
  }

  goToMidhub() {
    // Переходим в Midhub Global
    basePage
      .getIframeBody(domLoc.ifarmeDomains)
      .find(domLoc.backButton, { timeout: 20000 })
      .click();
  }

  goToDomain(locator, domainName) {
    // Переходим в определенный домен
    basePage
      .getIframeBody(locator)
      .contains("div", domainName, { timeout: 30000 })
      .click();
  }
}

export const domains = new Domains();
