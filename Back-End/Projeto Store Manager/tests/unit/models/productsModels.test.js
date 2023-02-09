const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../src/models/connection');
const productsModel = require('../../../src/models/products.model');
const { productsList, salesList } = require('./mocks/models.mock');

describe('Testes unitarios do model de products:', function () {
    afterEach(sinon.restore);
    
    it('Recuperando a lista completa de produtos', async function () {
        sinon.stub(connection, 'execute').resolves([productsList]);

        const result = await productsModel.selectAllProducts();

        expect(result).deep.equal(productsList);
    });

    it('Recuperando um produto por Id', async function () {
        const id = '2';
        sinon.stub(connection, 'execute').resolves([[productsList[id]]]);

        const result = await productsModel.selectProductById(id);
        
        expect(result).deep.equal(productsList[2]);
    });

    it('Recuperando multiplos produtos por id', async function () {
        const products = [productsList[0], productsList[1]];
        sinon.stub(connection, 'execute').resolves([products]);

        const result = await productsModel.selectMultipleProducts(salesList);

        expect(result).deep.equal(products);
    });

    it('Inserindo novos produtos', async function () { 
        const name = 'Training Spear';
        sinon.stub(connection, 'execute').resolves([{ insertId: 7 }]);

        const result = await productsModel.insertNewProduct(name);

        expect(result).equal(7);
    });

    it('Atualizando o nome do produto', async function () { 
        const productId = 27;
        const newName = 'Beric Flaming Sword';
        sinon.stub(connection, 'execute').resolves([{ info: 'Update info' }]);

        const result = await productsModel.updateProduct(newName, productId);

        expect(result).equal('Update info');
    });

    it('Deletando um produto', async function () {
        const productId = 2;
        sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

        const result = await productsModel.eraseProduct(productId);

        expect(result).equal(1);
    });
});
