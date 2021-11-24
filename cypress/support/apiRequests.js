// ------------------------- Методы работы с API --------------------------

export class ApiRequests {

  // Создание компании (api/create-company)
  createCompany(pin, name) {
      const responce = cy.request({
        method: 'GET',
        url: 'http://localhost:8081/api/create-company?',
        qs : {
          founderPin: pin,
          name: name
        },
        timeout: 100000
      });
      return responce
  }

}

export const apiRequests = new ApiRequests()