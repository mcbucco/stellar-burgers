describe('Burger constructor tests', () => {
  beforeEach(() => {
    cy.viewport(1280, 768);
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('');
  });
  
  describe('Adding ingredients', () => {
    it('Bun adding', () => {
      cy.addIngredient(0);
      cy.get('[data-cy=bun_top]').should('exist');
      cy.get('[data-cy=bun_bottom]').should('exist');
    });
  
    it('Filling adding', () => {
      cy.addIngredient(1);
      cy.get('[data-cy=burger_element]').should('exist');
      cy.get('[data-cy=no_filling]').should('not.exist');
    });
  })
  
  describe('Modal window tests', () => {
    beforeEach(() => {
      cy.get('[data-cy=ingredients] ul:first')
        .find('li:first')
        .click();
      cy.get('[data-cy=modal]').as('modal');
    });

    it('Ingredient data display in modal window', () => {
      cy.isModalOpened();
    });
  
    it('Modal window closing using × button', () => {
      cy.closeModalUsingX();
    });
  
    it('Modal window closing using overlay click', () => {
      cy.get('[data-cy=modal_overlay]')
        .should('exist')
        .click({force: true});
      cy.get('@modal').should('not.exist');
    })
  })
});