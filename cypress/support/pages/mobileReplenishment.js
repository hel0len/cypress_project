export class MobilePhoneReplenishment {
  // Заполение поля телефон
  typePhoneNumber(phoneNumber) {
    cy.get('[data-qa-node="phone-number"]').type(phoneNumber)
  }

  // Отправка формы
  submitPayment() {
    cy.get('[data-qa-node="submit"]').click()
  }

  // Проверка номера карты
  checkDebitCard(debitCard) {
    cy.get('[data-qa-node="card"]').should('have.text', debitCard)
  }

  // Проверка суммы платежа
  checkDebitAmount(amount) {
    cy.get('[data-qa-node="amount"]').should('have.text', amount)
  }

  // Проверка платежа суммы с комиссией 
  checkDebitTotal(amount) {
    cy.get('[data-qa-node="commission"]').eq(1).should('have.text', amount)

  }

  // Проверка валюты платежа
  checkPaymentCurrency(paymentCurrency) {
    cy.get('[data-qa-node="commission-currency"]').should('contain.text', paymentCurrency)
  }
}


export const mobileReplenishment = new MobilePhoneReplenishment()