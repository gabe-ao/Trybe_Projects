const { getId } = require('../utils/getId');

describe('22 - Desenvolva testes para atingir 95% de cobertura total', () => {
  it('Verifica a cobertura de testes unitários', () => {
    cy.task('getCoverage', getId()).its('total.branches.pct', { timeout: 0 }).should('be.gte', 95.00);
  });
});
