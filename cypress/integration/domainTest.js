import { baseLoc } from '../support/pages/basePage'
import { auth } from "../support/pages/authorisation";
import { basePage } from "../support/pages/basePage";
import { domLoc } from "../support/pages/domains";
import { domains } from "../support/pages/domains";
const faker = require("faker");

// ------------------------------- Тесты на страницу доменов ----------------------------------

it("Создание кастомного домена", () => {
  // Авторизация под админом
  auth.adminAuth("0000");
  // Переход в приложение Доменов
  basePage.openModule(baseLoc.domainsLink);
  // Генерируем тестовые данные
  var domainName = faker.address.country();
  var domainCode = faker.address.countryCode();
  // Создаем домен
  domains.createDomain(domainName, domainCode);
  // Переходим в Midhub Global
  domains.goToMidhub();
  // Переход в созданный домен
  domains.goToDomain(domLoc.ifarmeDomains, domainName);
  // Проверка названия домена
  basePage
    .getIframeBody(domLoc.ifarmeDomains)
    .find("h5")
    .should("have.text", domainName);
});
