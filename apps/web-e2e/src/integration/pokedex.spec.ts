describe('pokedex', () => {
  beforeEach(() => cy.visit('/'));

  it('should display pokemon list', () => {
    const findFirst = () => cy.get('[data-testid=pokemon-card-1]');
    const findAll = () => cy.get('[data-testid^=pokemon-card-]');

    findFirst().contains('#001');
    findFirst().contains('Bulbasaur');
    findFirst().contains('grass');
    findFirst().contains('poison');

    findAll().should('have.length', 24);
    cy.contains('Pikachu').should('not.exist');

    cy.scrollTo('bottom');
    cy.contains('Pikachu');
    findAll().should('have.length', 48);
  });
});
