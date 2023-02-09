const productsList = [
    { id: 1, name: 'Martelinho de Ouro'},
    { id: 2, name: 'Traje de Banho'},
    { id: 3, name: 'Escudo de Hyrule'},
];

const salesList = [
    {
        "productId": 1,
        "quantity": 45
    },
    {
        "productId": 2,
        "quantity": 89
    }
];

const allSalesList = [
    {
        "sale_id": 1,
        "date": "2021-09-09T04:54:29.000Z",
        "product_id": 1,
        "quantity": 2
    },
    {
        "sale_id": 1,
        "date": "2021-09-09T04:54:54.000Z",
        "product_id": 2,
        "quantity": 2
    }
];

const allSalesCamelized = [
    {
        "saleId": 1,
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
    },
    {
        "saleId": 1,
        "date": "2021-09-09T04:54:54.000Z",
        "productId": 2,
        "quantity": 2
    }
];

const singleSale = [
    {
        "date": "2021-09-09T04:54:29.000Z",
        "product_id": 1,
        "quantity": 2
    },
    {
        "date": "2021-09-09T04:54:54.000Z",
        "product_id": 2,
        "quantity": 2
    }
];

const singleSaleCamelized = [
    {
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
    },
    {
        "date": "2021-09-09T04:54:54.000Z",
        "productId": 2,
        "quantity": 2
    }
];

module.exports = {
    productsList,
    salesList,
    allSalesList,
    allSalesCamelized,
    singleSale,
    singleSaleCamelized,
};
