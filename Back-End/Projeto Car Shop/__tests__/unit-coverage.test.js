const { executeTests, readCoverageFile, assertCoveragePercentage, clearNycCoverage } = require('./utils/nyc-coverage');


describe('Testes das camadas Model, Service e Controller', () => {
  let coverageResults;
  let coverageResultsArr;

  beforeAll(async () => {
    await executeTests();
    coverageResults = await readCoverageFile();
    coverageResultsArr = Object.entries(coverageResults);
  })

  afterAll(async () => {
    await clearNycCoverage();
  });

  describe('03 - Escreva testes para cobrir 30% da camada de Service', () => {
    it('Será validado que a cobertura total das linhas dos arquivos da camada Services é maior ou igual a 30%', async () => {
      assertCoveragePercentage(coverageResultsArr, 30, 3);
    });
  });

  describe('06 - Escreva testes para cobrir 60% da camada de Service', () => {
    it('Será validado que a cobertura total das linhas dos arquivos da camada Services é maior ou igual a 60%', async () => {
      assertCoveragePercentage(coverageResultsArr, 60, 5);
    });
  });

  describe('09 - Escreva testes para cobrir 80% da camada de Service', () => {
    it('Será validado que a cobertura total das linhas dos arquivos da camada `Services` é maior ou igual a 80%', async () => {
      assertCoveragePercentage(coverageResultsArr, 80, 8);
    });
  });

})
