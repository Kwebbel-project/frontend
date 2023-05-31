import { createVerify } from "crypto"

describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/auth/login')

    cy.get('#email').type('lemmensolutions@gmail.com')
    cy.get('#password').type('test123')

    cy.get('#sign-in-button').click()

    cy.location('href').should('eq', 'http://localhost:3000/home')
  })
})