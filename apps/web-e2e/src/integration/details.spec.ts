describe('pokedex', () => {
  beforeEach(() => cy.visit('/1'));

  it('should display pokemon details', () => {
    cy.contains('bulbasaur');
    cy.contains("#001")
    const getTypes = () => cy.get('[data-testid=types]');

    getTypes().contains('grass');
    getTypes().contains('poison');

    cy.get('[data-testid=visual]').should('be.visible');
  });
});
