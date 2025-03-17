describe('App Navigation', () => {
  beforeEach(() => {
    // Visit the homepage before each test
    cy.visit('http://localhost:3000');
  });

  it('should load the homepage', () => {
    // Check if the homepage content is rendered
    cy.contains('Housing').should('be.visible');
  });

  it('should navigate to the Sign In page', () => {
    // Click on the Sign In link in the navigation
    cy.get('a[href*="signin"]').click();

    // Check if the Sign In page content is rendered
    cy.contains('Sign In').should('be.visible');
  });

});
