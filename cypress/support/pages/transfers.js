export class Transfers {
  
  // Заполнение номера банковской карты
  typeDebitCardNumber(cardNumber) {
    cy.get('[data-qa-node="numberreceiver"]').type(cardNumber)
  }

  // Заполнение комментария перевода
  typeComment(textComment) {
    cy.get('[data-qa-node="toggle-comment"]').click()
      .get('[data-qa-node="comment"]').type(textComment)
  }

  // Клик на отправку формы
  submitForm() {
    cy.get('[type="submit"]').click()
  }

  // Проверка номеров карт с которой и на которую будет перевод
  checkDebitAndRecieverCards(debitCard, receiverCard) {
    cy.get('[data-qa-node="payer-card"]').should('have.text', debitCard);
    cy.get('[data-qa-node="receiver-card"]').should('have.text', receiverCard)
  }

  // Проверка суммы платежа 
  checkPayerAmount(amount) {
    cy.get('[data-qa-node="payer-amount"]').should('have.text', amount)
  }

  // Проверка комиссии платежа
  checkPayerCurrency(payerCurrency) {
    cy.get('[data-qa-node="payer-currency"]').should('have.text', payerCurrency)
  }

  // Проверка общей суммы транзакции 
  checkTotal(total) {
    cy.get('[data-qa-node="total"]').find('div').should('contain.text', total).and('contain.text', 'UAH')
  }

  checkCommentText(comment) {
    cy.get('[data-qa-node="comment"]').should('have.text', comment)
  }
}

export const transfers = new Transfers()