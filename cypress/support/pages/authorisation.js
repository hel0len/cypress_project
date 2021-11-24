import { baseLoc } from "./basePage";

export const AuthLoc = {
  // ---------------------------- Локаторы для страницы авторизации ------------------------

  // Кнопка "Авторизоваться"
  authButton: '[data-id="go-to-auth-button"]',
  // Поле ввода пина
  inputPin: '[data-id="pin-input"]',
  // Кнопка "Login in"
  loginButton: '[data-id="auth-button"]',
  // Сообщение о несуществующем юзере
  invalidPin: '[data-id="pin-input"]~span',
};

export class Authorisation {
  // Авторизация под переданным пином
  adminAuth(pin) {
    cy.visit("/")
      .get(AuthLoc.authButton)
      .click()
      .get(AuthLoc.inputPin)
      .type(pin)
      .get(AuthLoc.loginButton)
      .click();
  }

  // Логаут
  logout() {
    cy.get(baseLoc.logoutButton).click();
  }
}

export const auth = new Authorisation();
