import { createVerify } from "crypto"

describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/auth/login')

    cy.get('#signUp').click()

    cy.location('href').should('eq', 'http://localhost:3000/auth/register')
  })
})