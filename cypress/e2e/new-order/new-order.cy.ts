const mockTokens = {
  accessToken: 'accessToken',
  refreshToken: 'refreshToken'
};

describe('New Order test', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'userData.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'newOrderData.json' });
    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify(mockTokens.refreshToken)
    );
    cy.setCookie('accessToken', mockTokens.accessToken);
    cy.viewport(1280, 768);
    cy.visit('');
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('Adding order', () => {
    //Собирается бургер
    cy.addIngredient(0);
    cy.addIngredient(1);
    cy.addIngredient(2);
    
    //Вызывается клик по кнопке «Оформить заказ»
    cy.get('[data-cy=place_order]')
      .click();

    //Проверяется, что модальное окно открылось и номер заказа верный
    cy.get('[data-cy=modal]').as('modal');
    cy.get('@modal').should('exist');
    cy.get('[data-cy=order_number]')
      .contains('64775')
      .should('exist');

    //Закрывается модальное окно и проверяется успешность закрытия
    cy.closeModalUsingX();
    
    //Проверяется, что конструктор пуст
    cy.get('[data-cy=bun_top]').should('not.exist');
    cy.get('[data-cy=bun_bottom]').should('not.exist');
    cy.get('[data-cy=no_filling]').should('exist');
  })
});
