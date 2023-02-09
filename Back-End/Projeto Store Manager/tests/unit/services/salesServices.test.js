const sinon = require('sinon');
const { expect } = require('chai');

const salesService = require('../../../src/services/sales.service');
const salesModel = require('../../../src/models/sales.model');
const productsModel = require('../../../src/models/products.model');
const {
    salesList,
    salesProducts,
    invalidSalesList,
    allSalesCamelized,
    singleSaleCamelized } = require('./mocks/services.mock');

describe('Testes unitarios dos services de sales:', function () {
    afterEach(sinon.restore);

    it('Registrando novas sales', async function () { 
        const salesId = 37;
        sinon.stub(productsModel, 'selectMultipleProducts').resolves(salesProducts);
        sinon.stub(salesModel, 'insertSales').resolves(salesId);
        sinon.stub(salesModel, 'insertSalesProducts').resolves();

        const result = await salesService.registerSales(salesList);

        expect(result.type).equal(null);
        expect(result.message).deep.equal({ id: 37, itemsSold: salesList });
    });

    it('Falha ao tentar registrar sales com quantidade invalida', async function () { 
        const salesId = 76;
        sinon.stub(productsModel, 'selectMultipleProducts').resolves(salesProducts);
        sinon.stub(salesModel, 'insertSales').resolves(salesId);
        sinon.stub(salesModel, 'insertSalesProducts').resolves();

        const result = await salesService.registerSales(invalidSalesList);

        expect(result.type).equal('UNPROCESSABLE_ENTITY');
        expect(result.message).equal('"quantity" must be greater than or equal to 1');
    });

    it('Falha ao tentar registrar sales com produto invalido', async function () {
        const salesId = 23;
        const invalidProductSales = [invalidSalesList[0], invalidSalesList[2]]
        sinon.stub(productsModel, 'selectMultipleProducts').resolves([salesProducts[0]]);
        sinon.stub(salesModel, 'insertSales').resolves(salesId);
        sinon.stub(salesModel, 'insertSalesProducts').resolves();

        const result = await salesService.registerSales(invalidProductSales);

        expect(result.type).equal('PRODUCT_NOT_FOUND');
        expect(result.message).equal('Product not found');
    });

    it('Obtendo todas as sales registradas', async function () {
        sinon.stub(salesModel, 'selectAllSales').resolves(allSalesCamelized);

        const result = await salesService.listAllSales();

        expect(result.type).equal(null);
        expect(result.message).deep.equal(allSalesCamelized);
    });

    it('Pesquisando uma sale por id com sucesso', async function () {
        const salesId = 1;
        sinon.stub(salesModel, 'selectSaleById').resolves(singleSaleCamelized);

        const result = await salesService.findSaleById(salesId);

        expect(result.type).equal(null);
        expect(result.message).deep.equal(singleSaleCamelized);
    });

    it('Falha ao pesquisar uma sale com id invalida', async function () {
        const salesId = -9;
        sinon.stub(salesModel, 'selectSaleById').resolves([]);

        const error = await salesService.findSaleById(salesId);

        expect(error.type).equal('SALE_NOT_FOUND');
        expect(error.message).equal('Sale not found');
    });

    it('Deletando uma sale por id com sucesso', async function () {
        const salesId = 1;
        sinon.stub(salesModel, 'selectSaleById').resolves(singleSaleCamelized);
        sinon.stub(salesModel, 'eraseSale').resolves();

        const result = await salesService.eliminateSale(salesId);

        expect(result.type).equal(null);
        expect(result.message).equal('');
    });

    it('Falha ao tentar deletar sale com id invalida', async function () {
        const invalidId = -75;
        sinon.stub(salesModel, 'selectSaleById').resolves([]);
        sinon.stub(salesModel, 'eraseSale').resolves();

        const error = await salesService.eliminateSale(invalidId);

        expect(error.type).equal('SALE_NOT_FOUND');
        expect(error.message).equal('Sale not found');
    });
});