const sinon = require('sinon');
const { expect } = require('chai');

const productsController = require('../../../src/controllers/products.controller');
const productsService = require('../../../src/services/products.service');
const {
    contractProductList,
    contractProductId,
    contractNotFound,
    singleProduct,
} = require('./mocks/controller.mock');

describe('Testes unitarios dos controllers de products:', function () {
    afterEach(sinon.restore);
    it('Obtendo todos os produtos registrados', async function () {
        const req = {};
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productsService, 'listAllProducts')
            .resolves(contractProductList);
        
        await productsController.getAllProducts(req, res);
        expect(res.status.calledOnceWithExactly(200)).to.be.true;
        expect(res.json.calledOnceWithExactly(contractProductList.message)).to.be.true;
    });

    it('Falha ao tentar obter todos os produtos registrados', async function () {
        const req = {};
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productsService, 'listAllProducts')
            .resolves({ type: 'INTERNAL_SERVER_ERROR', message: 'Internal Server Error!' });

        await productsController.getAllProducts(req, res);
        expect(res.status.calledOnceWithExactly(500)).to.be.true;
        expect(res.json.calledOnceWithExactly({ message: 'Internal Server Error!' })).to.be.true;
    });
    
    it('Achando um produto por sua id', async function () { 
        const req = { params: { id: '2' } };
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productsService, 'findProductById')
            .resolves(contractProductId);
        
        await productsController.getProductById(req, res);
        expect(res.status.calledOnceWithExactly(200)).to.be.true;
        expect(res.json.calledOnceWithExactly(contractProductId.message)).to.be.true;
    });

   it('Buscando produto por id invalida', async function () {
        const req = { params: { id: '16546' } };
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productsService, 'findProductById')
            .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

        await productsController.getProductById(req, res);
        expect(res.status.calledOnceWithExactly(404)).to.be.true;
        expect(res.json.calledOnceWithExactly({ message: 'Product not found' })).to.be.true;
   });
    
    it('Adicionando um novo produto com sucesso', async function () {
        const req = { body: { name: singleProduct.name } };
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productsService, 'addNewProduct')
            .resolves({ type: null, message: singleProduct });
        
        await productsController.postNewProduct(req, res);
        expect(res.status.calledOnceWithExactly(201)).to.be.true;
        expect(res.json.calledOnceWithExactly(singleProduct)).to.be.true;
    });

    it('Falha ao adicionar produto com nome invalido', async function () {
        const req = { body: { name: 'pow' } };
        const res = {};
        const error = {
            type: 'UNPROCESSABLE_ENTITY',
            message: '"name" length must be at least 5 characters long',
        };
        const { message } = error;

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productsService, 'addNewProduct').resolves(error);

        await productsController.postNewProduct(req, res);
        expect(res.status.calledOnceWithExactly(422)).to.be.true;
        expect(res.json.calledOnceWithExactly({ message })).to.be.true;
    });

    it('Atualizando um produto com sucesso', async function () {
        const req = {
            body: { name: 'Spear of Destiny' },
            params: { id: 7 },
        };
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productsService, 'changeProductName')
            .resolves({ type: null, message: singleProduct });

        await productsController.putProductName(req, res);
        expect(res.status.calledOnceWithExactly(200)).to.be.true;
        expect(res.json.calledOnceWithExactly(singleProduct)).to.be.true;
    });

    it('Falha ao usar nome ou id invalidos para atualizar produto', async function () {
        const req = {
            body: { name: 'ear' },
            params: { id: -44 },
        };
        const res = {};
        const message = 'Product not found';

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productsService, 'changeProductName')
            .resolves(contractNotFound);

        await productsController.putProductName(req, res);
        expect(res.status.calledOnceWithExactly(404)).to.be.true;
        expect(res.json.calledOnceWithExactly({ message })).to.be.true;
    });

    it('Deletando um produto com sucesso', async function () {
        const req = { params: { id: 7 } };
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        res.end = sinon.stub().returns();
        sinon.stub(productsService, 'eliminateProduct')
            .resolves({ type: null, message: '' });

        await productsController.deleteProduct(req, res);
        expect(res.status.calledOnceWithExactly(204)).to.be.true;
        expect(res.json.notCalled).to.be.true;
        expect(res.end.calledOnce).to.be.true;
    });

    it('Falha ao utilizar id invalida para deletar um produto', async function () {
        const req = { params: { id: -55 } };
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        res.end = sinon.stub().returns();
        sinon.stub(productsService, 'eliminateProduct')
            .resolves(contractNotFound);

        await productsController.deleteProduct(req, res);
        expect(res.status.calledOnceWithExactly(404)).to.be.true;
        expect(res.json.calledOnceWithExactly({ message: 'Product not found'})).to.be.true;
        expect(res.end.notCalled).to.be.true;
    });
});
