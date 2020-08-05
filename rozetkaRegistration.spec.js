const rozetkaLandingPageUrl = 'https://rozetka.com.ua/' 
const signInSignUpLinkSelector = 'p.header-topline__user-text a';  
const signInSignUpFormSelector = 'form.auth-modal__form'
const registeredUserName = 'Тест' 
var emailValue = '' 
var passwordValue = ''

describe('Rozetka Sing in / Sign up', () => {
  before(() => {
      cy.visit(rozetkaLandingPageUrl)
  })

  beforeEach(() => {
        cy.viewport(1366, 768)
   })

  specify('Navigate to registration page', () => {
     
  cy.get(".header-topline__language li a", { timeout: 10000 }).contains('UA', { matchCase: false }) 
         .click()
      
  cy.get(".header-topline__language li a", { timeout: 10000 }) 
         .should('have.text', 'RU')

  const signInSignUpLink = cy.get(signInSignUpLinkSelector, { timeout: 5000 })
      signInSignUpLink
         .should('be.visible')
         .click()

  const registrationLink = cy.get('.auth-modal__register-link', { timeout: 5000 })
      registrationLink
         .should('be.visible')
         .should(($elem) => {
          expect($elem.text().trim()).equal('Зареєструватися');
        })
          .click()
 
  const registrationModal = cy.get('div.modal__content', { timeout: 10000 }) 
       registrationModal
         .should('be.visible')
  })

  specify('Sign up', () => {
  const namefield = cy.get('[formcontrolname="name"]')
 
       namefield
         .type(registeredUserName)

  const emailfield = cy.get('[formcontrolname="username"]')  
  var randomEmail = Math.random().toString(36).substring(2,11) + '@gmail.com' 
  emailValue = randomEmail

       emailfield
         .type(randomEmail)

  const passfield = cy.get('[formcontrolname="password"]') 
  var randomPassword = Array(20)
         .fill('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$')
         .map(x => x[Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1) * x.length)])
         .join('')
  passwordValue = randomPassword

       passfield
         .type(randomPassword)

  cy.get(signInSignUpFormSelector)
         .should('be.visible')
         .submit()
 }) 

 specify('Log out', () => { 
  var profileLink = cy.get('.header-topline__user .header-topline__user-link', { timeout: 10000 })
      profileLink
        .should('be.visible')
        .should(($elem) => {
          expect($elem.text().trim()).equal(registeredUserName);
       })
        .click()

   const exitLink = cy.get("section.account-actions div button:nth-of-type(2)", { timeout: 20000 }) 
     exitLink
         .scrollIntoView()
         .should('be.visible')
         .click()
      
         cy.get(signInSignUpLinkSelector, { timeout: 5000 })
         .should(($elem) => {
          expect($elem.text().trim()).equal('увійдіть в особистий кабінет');
       })
 }) 
  
 specify('Sign in', () => { 
         cy.get('input.search-form__input').click()
         cy.get(signInSignUpLinkSelector, { timeout: 5000 }).click()
  
     const emailfield = cy.get('#auth_email', { timeout: 5000 })  
        emailfield
         .should('be.visible')
         .type(emailValue)

   const passfield = cy.get('#auth_pass')

      passfield
         .should('be.visible')
         .type(passwordValue)

          cy.get(signInSignUpFormSelector)
         .should('be.visible')
         .submit()
        
   var profileLink = cy.get('.header-topline__user .header-topline__user-link', { timeout: 10000 })
       profileLink
         .should('be.visible')
         .should(($elem) => {
          expect($elem.text().trim()).equal(registeredUserName);
       })
       .click()
        
    var personalDataFirstName = cy.get("[for='firstName'] + p", { timeout: 10000 }) 
      personalDataFirstName
         .should('be.visible')
         .should(($elem) => {
          expect($elem.text().trim()).equal(registeredUserName);
     }) 
      
     var personalDataEmail = cy.get("p.personal-data__value:nth-of-type(2)") 
       personalDataEmail
         .first()
         .scrollIntoView()
         .should('be.visible')
         .should(($elem) => {
          expect($elem.text().trim()).equal(emailValue);
     })
    })
})