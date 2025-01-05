describe('Burger constructor tests', () => {
  beforeEach(() => {
    cy.viewport(1280, 768);
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('http://localhost:4000/');
  });
  
  describe('Adding ingredients', () => {
    it('Bun adding', () => {
      cy.get('[data-cy=ingredients] ul')
        .eq(0)
        .contains('Добавить')
        .click();
      cy.get('[data-cy=bun_top]').should('exist');
      cy.get('[data-cy=bun_bottom]').should('exist');
    });
  
    it('Filling adding', () => {
      cy.get('[data-cy=burger_element]').should('not.exist');
      cy.get('[data-cy=ingredients] ul')
        .eq(1)
        .contains('Добавить')
        .click();
      cy.get('[data-cy=burger_element]').should('exist');
      cy.get('[data-cy=no_filling]').should('not.exist');
    });
  })
  
  describe('Modal window test', () => {
    beforeEach(() => {
      cy.get('[data-cy=ingredients] ul:first')
        .find('li:first')
        .click();

    });
    it('Ingredient data display in modal window', () => {
      cy.get('[data-cy=modal]').should('exist');
    });
  
    it('Modal window closing using × button', () => {
      cy.get('[data-cy=modal]').should('exist');
      cy.get('[data-cy=close_modal]').click();
      cy.get('[data-cy=modal]').should('not.exist');
    });
  
    it('Modal window closing using overlay click', () => {
      cy.get('[data-cy=modal]').should('exist');
      cy.get('[data-cy=modal_overlay]')
        .should('exist')
        .click({force: true});
      cy.get('[data-cy=modal]').should('not.exist');
    })
  })
});