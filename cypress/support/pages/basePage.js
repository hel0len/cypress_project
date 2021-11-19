export class BasePage {

  // Открытие страницы
   open(url) {
    cy.visit(url)
   }

  // Заполнение данных банковской карты
  typeDebitCardData(cardNumber, expDate, cvv, firstName, lastName) {
    cy.get('[data-qa-node="numberdebitSource"]').type(cardNumber)
      .get('[data-qa-node=expiredebitSource]').type(expDate)
      .get('[data-qa-node="cvvdebitSource"]').type(cvv)
      .wait(2000)
      .get('[data-qa-node="firstNamedebitSource"]').type(firstName)
      .get('[data-qa-node="lastNamedebitSource"]').type(lastName)
  }

   // Заполнение поля сумма платежа
   typeAmount(amount) {
    cy.get('[data-qa-node="amount"]').type(amount)  
  }

    // Отправка формы
    submitForm() {
      cy.get('[type="submit"]').click()
    }
}

export const basePage = new BasePage()