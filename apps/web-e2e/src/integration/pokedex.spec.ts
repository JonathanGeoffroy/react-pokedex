describe('pokedex', () => {
  beforeEach(() => cy.visit('/'));

  const findFirst = () => cy.get('[data-testid=pokemon-card-1]');
  const findAll = () => cy.get('[data-testid^=pokemon-card-]');

  it('should display pokemon list', () => {
    findFirst().contains('#001');
    findFirst().contains('Bulbasaur');
    findFirst().contains('Grass');
    findFirst().contains('Poison');

    findAll().should('have.length', 24);
    cy.contains('Pikachu').should('not.exist');

    cy.scrollTo('bottom');
    cy.contains('Pikachu');
    findAll().should('have.length', 48);
  });

  it('should handle language changes', () => {
    findFirst().contains('#001');
    findFirst().contains('Bulbasaur');
    findFirst().contains('Grass');
    findFirst().contains('Poison');
    findAll().should('have.length', 24);

    cy.scrollTo('bottom');
    cy.contains('Sandshrew');
    findAll().should('have.length', 48);

    cy.get('[data-testid=language-select]')
      .first()
      .click()
      .find('li') // FIXME : not sure why Cypress need this to deeply find selection
      .contains('Français')
      .click();

    findFirst().contains('Bulbasaur').should('not.exist');

    findFirst().contains('Bulbizarre');
    findFirst().contains('Grass').should('not.exist');
    findFirst().contains('Plante');
    findAll().should('have.length', 24); // Pagination has been reset

    cy.scrollTo('bottom');
    cy.contains('Sandshrew').should('not.exist');
    cy.contains('Sabelette');

    findAll().should('have.length', 48);
  });
});
