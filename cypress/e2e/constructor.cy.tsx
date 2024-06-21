const testHost = 'http://localhost:4000/';
const details = 'Детали ингредиента';
const ingredient = 'Ингредиент 1';
const anotherIngredient = 'Ингредиент 13';
const addBtn = 'Добавить';
const constructorSelector = '[data-cy=burger-constructor]';

describe('Тесты добавления ингрединтов в конструктор', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit(testHost);
  });
  
  it('Тест добавления булочки', () => {
    cy.get('[data-cy=bun-ingredients]').contains(addBtn).click();
    cy.get('[data-cy=constructor-bun-1]')
      .contains(ingredient)
      .should('exist');
    cy.get('[data-cy=constructor-bun-2]')
      .contains(ingredient)
      .should('exist');
  });

  it('Тест добавления ингредиентов', () => {
    cy.get('[data-cy=mains-ingredients').contains(addBtn).click();
    cy.get('[data-cy=sauces-ingredients').contains(addBtn).click();
    cy.get('[data-cy=constructor-ingredients]')
      .contains('Ингредиент 2')
      .should('exist');
    cy.get('[data-cy=constructor-ingredients]')
      .contains('Ингредиент 4')
      .should('exist');
  });
});

describe('Тесты модальеого окна', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit(testHost);
  });

  it('Тест открытия модального окна', () => {
    cy.contains(details).should('not.exist');
    cy.contains(anotherIngredient).click();
    cy.contains(details).should('exist');
    cy.get('#modal').contains(anotherIngredient).should('exist');
  });

  it('Тест закрытия модального окна кликом на крестик', () => {
    cy.contains(anotherIngredient).click();
    cy.contains(details).should('exist');
    cy.get('#close-btn').click();
    cy.contains(details).should('not.exist');
  });

  it('Тест закрытия модального окна кликом на оверлей', () => {
    cy.contains(anotherIngredient).click();
    cy.contains(details).should('exist');
    cy.get('[data-cy=overlay]').click('right', { force: true });
    cy.contains(details).should('not.exist');
  });
});

describe('Тесты создания заказа и авторизации', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
      'postOrder'
    );

    cy.setCookie('accessToken', 'accessToken');
    window.localStorage.setItem('refreshToken', 'refreshToken');
    cy.visit(testHost);
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    window.localStorage.removeItem('refreshToken');
  })

  it('Тест сборки и оформления заказа', () => {
    cy.get('[data-cy=bun-ingredients]').contains(addBtn).click();
    cy.get('[data-cy=mains-ingredients').contains(addBtn).click();
    cy.get('[data-cy=sauces-ingredients').contains(addBtn).click();
    cy.get('[data-cy=order-button').click();

    cy.wait('@postOrder')
      .its('request.body')
      .should('deep.equal', {
        ingredients: ['1', '2', '4', '1']
      });

    cy.get('[data-cy=order-number]').contains('12345').should('exist');
    cy.get('#close-btn').click();
    cy.get('[data-cy=order-number]').should('not.exist');

    cy.get(constructorSelector)
      .contains(ingredient)
      .should('not.exist');

    cy.get(constructorSelector)
      .contains('Ингредиент 2')
      .should('not.exist');

    cy.get(constructorSelector)
      .contains('Ингредиент 4')
      .should('not.exist');
  });
});
