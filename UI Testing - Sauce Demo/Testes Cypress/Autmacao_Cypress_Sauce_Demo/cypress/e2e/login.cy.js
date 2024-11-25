
afterEach(() => {
  cy.screenshot();
});

describe('Login', () => {
  it.only('Realizar login com sucesso', () => {
    
    cy.visit('https://www.saucedemo.com/')

    cy.get('[data-test="username"]').type('standard_user')

    cy.get('[data-test=password]').type('secret_sauce')

    cy.get('[data-test="login-button"]').click()

    cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')

  })

  it.only('Realizar login com usuário inválido', () => {
    cy.visit('https://www.saucedemo.com/')

    cy.get('[data-test="username"]').type('invalido')

    cy.get('[data-test="password"]').type('123')

    cy.get('[data-test="login-button"]').click()

    cy.get('[data-test="error"]')
    .should(
      'contain.text',
      'Username and password do not match any user in this service'
    )
  })

  it.only('Realizar login sem preencher os campos obrigatorios', () => {
    cy.visit('https://www.saucedemo.com/')

    cy.get('[data-test="username"]').type(' ')

    cy.get('[data-test="password"]').type(' ')

    cy.get('[data-test="login-button"]').click()

    cy.get('.text-danger').should('not.exist');
      
  })
  
});
