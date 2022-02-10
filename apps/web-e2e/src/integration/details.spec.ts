describe('pokedex', () => {
  beforeEach(() => cy.visit('/1'));

  it('should display pokemon details', () => {
    cy.contains('bulbasaur');
    cy.contains('#001');
    const getTypes = () => cy.get('[data-testid=types]');

    getTypes().contains('grass');
    getTypes().contains('poison');

    cy.get('[data-testid=visual]').should('be.visible');

    cy.get('[data-key=stats]').click();
    cy.get('[data-testid=hp]').contains('45');
    cy.get('[data-testid=attack]').contains('49');
    cy.get('[data-testid=defense]').contains('49');
    cy.get('[data-testid=specialAttack]').contains('65');
    cy.get('[data-testid=specialDefense]').contains('65');
    cy.get('[data-testid=speed]').contains('45');
  });
});
