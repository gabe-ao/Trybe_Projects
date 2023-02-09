const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../../src/services/products.service');
const productsModel = require('../../../src/models/products.model');
const { productsList, singleProduct } = require('./mocks/services.mock');

describe('Testes unitarios dos services de products:', function () {
    afterEach(sinon.restore);
    
    it('Servico retornando a lista completa de produtos', async function () {
        sinon.stub(productsModel, 'selectAllProducts').resolves(productsList);

        const result = await productsService.listAllProducts();

        expect(result.type).equal(null);
        expect(result.message).deep.equal(productsList);
    });

    it('Buscando um produto por id com sucesso', async function () { 
        const id = '2';
        sinon.stub(productsModel, 'selectProductById').resolves(productsList[id]);

        const result = await productsService.findProductById(id);

        expect(result.type).equal(null);
        expect(result.message).deep.equal(productsList[2]);
    });

    it('Procurando um produto por uma id invalida', async function () {
        const id = '164619'
        sinon.stub(productsModel, 'selectProductById').resolves(undefined);

        const result = await productsService.findProductById(id);

        expect(result.type).equal('PRODUCT_NOT_FOUND');
        expect(result.message).deep.equal('Product not found');
    });

    it('Adicionando um novo produto e retornando-o por inteiro', async function () { 
        sinon.stub(productsModel, 'insertNewProduct').resolves(singleProduct.id);
        sinon.stub(productsModel, 'selectProductById').resolves(singleProduct);

        const result = await productsService.addNewProduct(singleProduct.name);

        expect(result).deep.equal({ type: null, message: singleProduct });
    });

    it('Falha ao tentar adicionar novo produto invalido', async function () { 
        const invalidName = 'pow';
        const error = await productsService.addNewProduct(invalidName);
        
        expect(error.type).equal('UNPROCESSABLE_ENTITY');
        expect(error.message).equal('"name" length must be at least 5 characters long');
    });

    it('Modificando o nome de um produto com sucesso', async function () { 
        const productId = 27;
        const newName = 'Beric Flaming Sword';
        const updatedProduct = { id: productId, name: newName };

        sinon.stub(productsModel, 'selectProductById').resolves(singleProduct);
        sinon.stub(productsModel, 'updateProduct').resolves();

        const result = await productsService.changeProductName(newName, productId);

        expect(result).deep.equal({ type: null, message: updatedProduct });
    });

    it('Falha ao usar nome invalido para modificar produto', async function () {
        const productId = 83;
        const invalidName = 'lami';

        sinon.stub(productsModel, 'selectProductById').resolves(singleProduct);
        sinon.stub(productsModel, 'updateProduct').resolves();

        const error = await productsService.changeProductName(invalidName, productId);

        expect(error.type).equal('UNPROCESSABLE_ENTITY');
        expect(error.message).equal('"name" length must be at least 5 characters long');
    });

    it('Falha ao usar id invalida para modificar produto', async function () {
        const invalidId = -29;
        const newName = 'Beric Flaming Sword';

        sinon.stub(productsModel, 'selectProductById').resolves(undefined);
        sinon.stub(productsModel, 'updateProduct').resolves();

        const error = await productsService.changeProductName(newName, invalidId);

        expect(error.type).equal('PRODUCT_NOT_FOUND');
        expect(error.message).equal('Product not found');
    });

    it('Eliminando um produto com sucesso', async function () {
        const id = 7;
        sinon.stub(productsModel, 'selectProductById').resolves(singleProduct);
        sinon.stub(productsModel, 'eraseProduct').resolves();

        const result = await productsService.eliminateProduct(id);

        expect(result.type).equal(null);
        expect(result.message).equal('');
    });

    it('Falha ao usar id invalida para modificar produto', async function () {
        const invalidId = -57;
        sinon.stub(productsModel, 'selectProductById').resolves(undefined);

        const error = await productsService.eliminateProduct(invalidId);

        expect(error.type).equal('PRODUCT_NOT_FOUND');
        expect(error.message).equal('Product not found');
    });
});
