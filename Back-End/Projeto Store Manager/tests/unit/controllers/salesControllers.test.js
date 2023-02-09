const sinon = require('sinon');
const { expect } = require('chai');

const salesController = require('../../../src/controllers/sales.controller');
const salesService = require('../../../src/services/sales.service');
const {
    salesList,
    invalidSalesList,
    allSalesCamelized,
    singleSaleCamelized,
} = require('./mocks/controller.mock');

describe('Testes unitarios dos controllers de sales:', function () {
    afterEach(sinon.restore);
    it('Registrando novas sales com sucesso', async function () {
        const req = { body: salesList };
        const res = {};
        const contract = { type: null, message: { id: 78, itemsSold: salesList} };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(salesService, 'registerSales').resolves(contract);

        await salesController.postNewSales(req, res);
        expect(res.status.calledOnceWithExactly(201)).to.be.true;
        expect(res.json.calledOnceWithExactly(contract.message)).to.be.true;
    });

    it('Falha ao tentar registar novas sales com requisicao invalida', async function () {
        const req = { body: invalidSalesList };
        const res = {};
        const contract = { type: 'UNPROCESSABLE_ENTITY', message: '"quantity" must be greater than or equal to 1' };
        const { message } = contract;

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(salesService, 'registerSales').resolves(contract);

        await salesController.postNewSales(req, res);
        expect(res.status.calledOnceWithExactly(422)).to.be.true;
        expect(res.json.calledOnceWithExactly({ message })).to.be.true;
    });

    it('Pesquisando todas as sales registradas', async function () {
        const req = {};
        const res = {};
        const contract = { type: null, message: allSalesCamelized };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(salesService, 'listAllSales').resolves(contract);

        await salesController.getAllSales(req, res);
        expect(res.status.calledOnceWithExactly(200)).to.be.true;
        expect(res.json.calledOnceWithExactly(contract.message)).to.be.true;
    });

    it('Obtendo uma sale por id', async function () {
        const req = { params: { id: 1 } };
        const res = {};
        const contract = { type: null, message: singleSaleCamelized };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(salesService, 'findSaleById').resolves(contract);

        await salesController.getSaleById(req, res);
        expect(res.status.calledOnceWithExactly(200)).to.be.true;
        expect(res.json.calledOnceWithExactly(contract.message)).to.be.true;
    });

    it('Falha ao buscar uma sale com id invalida', async function () {
        const req = { params: { id: -7 } };
        const res = {};
        const contract = { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
        const { message } = contract;

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(salesService, 'findSaleById').resolves(contract);

        await salesController.getSaleById(req, res);
        expect(res.status.calledOnceWithExactly(404)).to.be.true;
        expect(res.json.calledOnceWithExactly({ message })).to.be.true;
    });

    it('Deletando uma sale por id', async function () {
        const req = { params: { id: 1 } };
        const res = {};
        const contract = { type: null, message: '' };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        res.end = sinon.stub().returns();
        sinon.stub(salesService, 'eliminateSale').resolves(contract);

        await salesController.deleteSale(req, res);
        expect(res.status.calledOnceWithExactly(204)).to.be.true;
        expect(res.json.notCalled).to.be.true;
        expect(res.end.calledOnce).to.be.true;
    });

    it('Falha ao usar id invalida para deletar sale', async function () {
        const req = { params: { id: -99 } };
        const res = {};
        const contract = { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        res.end = sinon.stub().returns();
        sinon.stub(salesService, 'eliminateSale').resolves(contract);

        await salesController.deleteSale(req, res);
        expect(res.status.calledOnceWithExactly(404)).to.be.true;
        expect(res.json.calledOnceWithExactly({ message: 'Sale not found' })).to.be.true;
        expect(res.end.notCalled).to.be.true;
    });
});