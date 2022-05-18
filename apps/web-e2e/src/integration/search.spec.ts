describe('search', () => {
  function findResult(id: string) {
    return searchResults().find(`[data-testid=searchbar-result-${id}]`);
  }

  function searchResults() {
    return cy.get('[data-testid=searchbar-resultlist]');
  }

  function searchInput() {
    return cy.get('[data-testid=searchbar-input]');
  }

  beforeEach(() => cy.visit('/'));

  it('searchbar should be empty on startup', () => {
    searchInput().should('be.visible');
    searchResults().should('not.exist');
  });

  it('searching pokemon should show the only result', () => {
    searchInput().type('Bulbasaur');

    findResult('1').contains('Bulbasaur');
    findResult('1').contains('Grass');
    findResult('1').contains('Poison');
  });

  it('searching pokemon should show the multiple results', () => {
    searchInput().type('saur');

    findResult('1').contains('Bulbasaur');
    findResult('2').contains('Ivysaur');
    findResult('3').contains('Venusaur');
  });

  it('searching pokemon should show default image when there is no results', () => {
    searchInput().type('nothing');

    cy.get(`[data-testid^=searchbar-result-]`).should('not.exist');
    return searchResults().contains('No result found').should('be.visible');
  });
});
