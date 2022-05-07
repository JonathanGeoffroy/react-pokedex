describe('pokedex', () => {
  it('should display pokemon details', () => {
    cy.visit('/1');

    cy.contains('Bulbasaur');
    cy.contains('#001');
    const getTypes = () => cy.get('[data-testid=types]');

    getTypes().contains('Grass');
    getTypes().contains('Poison');

    cy.contains(
      'A strange seed was planted on its back at birth. The plant sprouts and grows with this POKéMON.'
    ).should('be.visible');

    cy.get('[data-testid=visual]').should('be.visible');

    cy.get('[data-key=stats]').click();
    cy.get('[data-testid=hp]').contains('45');
    cy.get('[data-testid=attack]').contains('49');
    cy.get('[data-testid=defense]').contains('49');
    cy.get('[data-testid=specialAttack]').contains('65');
    cy.get('[data-testid=specialDefense]').contains('65');
    cy.get('[data-testid=speed]').contains('45');
  });

  it('should display siblings', () => {
    cy.visit('/2');
    cy.contains('Ivysaur');
    cy.contains('#002');

    cy.get('[data-testid=pokemon-sibling-1]').should('exist');
    cy.get('[data-testid=pokemon-sibling-3]').should('exist');
    cy.get('[data-testid^=pokemon-sibling]').should('have.length', 2);

    cy.get('[data-testid=pokemon-sibling-1]').click();
    cy.location('pathname').should('eq', '/1');

    cy.get('[data-testid=pokemon-sibling-2]').should('exist');
    cy.get('[data-testid^=pokemon-sibling]').should('have.length', 1);
  });

  it('should handle first pokemon (with no previous sibling)', () => {
    cy.visit('/1');

    cy.get('[data-testid=pokemon-sibling-2]').should('exist');
    cy.get('[data-testid^=pokemon-sibling]').should('have.length', 1);
  });

  it('should handle last pokemon (with no next sibling)', () => {
    cy.visit('/898');

    cy.get('[data-testid=pokemon-sibling-897]').should('exist');
    cy.get('[data-testid=pokemon-sibling-899]').should('not.exist');
    cy.get('[data-testid^=pokemon-sibling]').should('have.length', 1);
  });

  it('should handle language changes', () => {
    cy.visit('/1');

    cy.get('[data-testid=language-select]')
      .first()
      .click()
      .find('li') // FIXME : not sure why Cypress need this to deeply find selection
      .contains('Français')
      .click();

    cy.contains('Bulbizarre');
    cy.contains('#001');
    const getTypes = () => cy.get('[data-testid=types]');

    getTypes().contains('Plante');
    getTypes().contains('Poison');

    cy.contains(
      'Au matin de sa vie, la graine sur son dos lui fournit les éléments dont il a besoin pour grandir.'
    ).should('be.visible');

    cy.contains('Statistiques').click();
    cy.contains('Attaque spéciale');
  });
});
