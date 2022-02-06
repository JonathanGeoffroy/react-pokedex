describe('pokedex', () => {
  beforeEach(() => cy.visit('/1'));

  it('should display pokemon details', () => {
    cy.contains('bulbasaur');
    const getTypes = () => cy.get('[data-testid=types]');

    getTypes().contains('grass');
    getTypes().contains('poison');

    cy.get('[data-tesid=visual]').should('be.visible');
  });
});
