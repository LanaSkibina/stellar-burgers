const testUrl = 'http://localhost:4000';
const modalExampleSelector = 'Соус Spicy-X';

describe('Тесты e2e для главной страницы и модального окна', function() {
    beforeEach(() => {
        cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
        cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });
        cy.visit(testUrl);
    })

    afterEach(() => {
        cy.clearLocalStorage();
        cy.clearCookies();
      });

    it('добавление ингридиентов в конструктор', function () {
        cy.get('[data-cy=bun]').as('bun');
        cy.get('[data-cy=main]').as('main');
        cy.get('[data-cy=sauce]').as('sauce');
    
        cy.get('@bun').contains('Добавить').click();
        cy.get('@main').contains('Добавить').click();
        cy.get('@sauce').contains('Добавить').click();
    })
    
    it('проверка отсутствия модального окна', function () {
        cy.get('#modals').children().should('have.length', 0);
    });
    
    it('проверка открытия модального окна', function () {
        cy.contains(modalExampleSelector).click();
        cy.get('#modals').children().should('have.length', 2);
        cy.get('#modals').contains(modalExampleSelector);
    });
    
    it('проверка закрытия модального окна по кнопке', function () {
        cy.contains(modalExampleSelector).click();
        cy.get('#modals').find('button').click();
        cy.get('#modals').children().should('have.length', 0);
    });
    
    it('проверка закрытия модального окна по esc', function () {
        cy.contains(modalExampleSelector).click();
        cy.get('body').type('{esc}');
        cy.get('#modals').children().should('have.length', 0);
    });
    
    it('проверка закрытия модального окна по клику на overlay', function () {
        cy.contains(modalExampleSelector).click();
        cy.get('body').click('topLeft');
        cy.get('#modals').children().should('have.length', 0);
    });
});

describe('Тесты e2e оформление заказа', function () {
    beforeEach(() => {
        cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
        cy.intercept('POST', '/api/auth/login', { fixture: 'user.json' });
        cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });
        cy.intercept('POST', '/api/orders', { fixture: 'order.json' });
        cy.visit(testUrl);
        cy.setCookie('accessToken', 'accessToken');
        window.localStorage.setItem('refreshToken', 'refreshToken');
    });
    
    afterEach(() => {
        cy.clearLocalStorage();
        cy.clearCookies();
      });
  
    it('проверяем оформление заказа', function () {
        
        cy.get('[data-cy=bun]').as('bun');
        cy.get('[data-cy=main]').as('main');
        cy.get('[data-cy=sauce]').as('sauce');
    
        cy.get('@bun').contains('Добавить').click();
        cy.get('@main').contains('Добавить').click();
        cy.get('@sauce').contains('Добавить').click();
        
        cy.contains('Оформить заказ').click();

        cy.get('#modals').contains(50225).should('exist');
        cy.get('body').type('{esc}');
        cy.get('#modals').children().should('have.length', 0);
        
        cy.contains('Выберите булки').should('be.visible');
        cy.contains('Выберите начинку').should('be.visible');
    });
});
