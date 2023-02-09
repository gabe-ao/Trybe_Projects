const { getId } = require('../utils/getId');

describe('21 - [TELA DE JOGO] Desenvolva testes para atingir 90% de cobertura da tela de Jogo', () => {
  it('Verifica a cobertura de testes unitários', () => {
    cy.task('getCoverage', getId()).its('Game.functions.pct', { timeout: 0 }).should('be.gte', 90.00);
    cy.task('getCoverage', getId()).its('Game.lines.pct', { timeout: 0 }).should('be.gte', 90.00);
  });
});
