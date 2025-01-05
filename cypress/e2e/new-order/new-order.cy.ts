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
    cy.visit('http://localhost:4000/');
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('Adding order', () => {
    //Собирается бургер
    cy.get('[data-cy=ingredients] ul')
      .eq(0)
      .contains('Добавить')
      .click();
    cy.get('[data-cy=ingredients] ul')
      .eq(1)
      .contains('Добавить')
      .click();
    cy.get('[data-cy=ingredients] ul')
      .eq(2)
      .contains('Добавить')
      .click();
    
    //Вызывается клик по кнопке «Оформить заказ»
    cy.get('[data-cy=place_order]')
      .click();

    //Проверяется, что модальное окно открылось и номер заказа верный
    cy.get('[data-cy=modal]').should('exist');
    cy.get('[data-cy=order_number]')
      .contains('64775')
      .should('exist');

    //Закрывается модальное окно и проверяется успешность закрытия
    cy.get('[data-cy=close_modal]').click();
    cy.get('[data-cy=modal]').should('not.exist');
    
    //Проверяется, что конструктор пуст
    cy.get('[data-cy=bun_top]').should('not.exist');
    cy.get('[data-cy=bun_bottom]').should('not.exist');
    cy.get('[data-cy=no_filling]').should('exist');
  })
});
