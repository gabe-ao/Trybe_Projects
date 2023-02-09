const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../src/models/connection');
const salesModel = require('../../../src/models/sales.model');
const {
    salesList,
    allSalesList,
    allSalesCamelized,
    singleSale,
    singleSaleCamelized } = require('./mocks/models.mock');

describe('Testes unitarios do model de sales:', function () { 
    afterEach(sinon.restore);

    it('Inserir nova sales', async function () {
        sinon.stub(connection, 'execute').resolves([{ insertId: 45 }]);

        const result = await salesModel.insertSales();

        expect(result).equal(45);
    });

    it('Inserindo novo sales_products', async function () { 
        const id = 27;
        sinon.stub(connection, 'execute').resolves([{ info: 'Records: 2  Duplicates: 0  Warnings: 0'  }]);

        const result = await salesModel.insertSalesProducts(id, salesList);

        expect(result).equal('Records: 2  Duplicates: 0  Warnings: 0');
    });

    it('Buscando todas as sales', async function () {
        sinon.stub(connection, 'execute').resolves([allSalesList]);

        const result = await salesModel.selectAllSales();

        expect(result).deep.equal(allSalesCamelized);
    });

    it('Obtendo unica sale por id', async function () {
        const saleId = 1;
        sinon.stub(connection, 'execute').resolves([singleSale]);

        const result = await salesModel.selectSaleById(saleId);

        expect(result).deep.equal(singleSaleCamelized);
    });

    it('Deletar uma sale', async function () {
        const saleId = 1;
        sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

        const result = await salesModel.eraseSale(saleId);

        expect(result).equal(1);
    });
});
