import { baseLoc } from "../support/pages/basePage.js";
import { auth } from "../support/pages/authorisation";
import { AuthLoc } from "../support/pages/authorisation";
import { apiRequests } from "../support/apiRequests.js";
const faker = require("faker");

// -------------------------------    Тесты на страницу авторизации ----------------------------------

describe("Test suite 1", () => {
  beforeEach(() => {
    
  });

  it("Авторизация под валидным пином админа", () => {
    auth.adminAuth("0000");
    // Проверям отображение на странице меню
    cy.get(baseLoc.navMenu, { timeout: 30000 }).should("be.visible");
  });

  it("Авторизация под неcуществующим пином", () => {

    // Генерируем случайный 4-значный пин от 1000 до 9999
    let randomPin = Math.floor(Math.random() * (9999 - 1000) + 1000);

    // Авторизация 
    auth.adminAuth(randomPin);
    // Проверка отображения на странице сообщения об ошибке
    cy.get(AuthLoc.invalidPin, { timeout: 30000 })
      .should("be.visible")
      // Проверка соответствия текста сообщения
      .and("have.text", "User not found ");
  });

  it("Авторизация под компанией, созданной ботом", () => {

    // Генерируем пин и название компании
    let randomPin = Math.floor(Math.random() * (9999 - 1000) + 1000);
    let companyName = faker.company.companyName();

    // Создаем компанию через бот
    apiRequests.createCompany(randomPin, companyName).then((response) => {
      console.log(response);
      // Проверка кода ответа = 200
      expect(response).to.have.property("status").to.equal(200);
      // Проверка значения пина компании в теле ответа
      expect(response.body.founder)
        .to.have.property("pin")
        .to.equal(`${randomPin}`);
    });
    // Авторизуемся под созданной компанией
    auth.adminAuth(randomPin);
    // Проверям отображение на странице меню
    cy.get(baseLoc.navMenu, { timeout: 30000 }).should("be.visible");
  });


  it("Логаут", () => {
    // Авторизация под админом
    auth.adminAuth("0000");
    // Проверям отображение на странице навигационного меню
    cy.get(baseLoc.navMenu, { timeout: 30000 }).should("be.visible");
    // Логаут
    auth.logout();
    // Проверка отображения на странице кнопки "Log in"
    cy.get(AuthLoc.authButton, { timeout: 30000 }).should("be.visible");
    false === true
  });
});
