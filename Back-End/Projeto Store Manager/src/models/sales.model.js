const camelize = require('camelize');
const connection = require('./connection');

const insertSales = async () => {
    const [{ insertId }] = await connection.execute(
        'INSERT INTO StoreManager.sales (date) VALUES (DEFAULT)',
    );
    return insertId;
};

const insertSalesProducts = async (salesId, sales) => {
    const placeholders = sales.map((_key) => `(${salesId}, ?, ?)`).join(', ');

    const values = sales.reduce((acc, current) => {
        const objectEntries = Object.values(current);
        objectEntries.forEach((entry) => acc.push(entry));
        return acc;
    }, []);
    
    const [{ info }] = await connection.execute(
        `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
        VALUES ${placeholders}`,
        values,
    );
    return info;
};

const selectAllSales = async () => {
    const [sales] = await connection.execute(
        `SELECT t2.sale_id, t1.date, t2.product_id, t2.quantity 
        FROM StoreManager.sales AS t1
        INNER JOIN StoreManager.sales_products AS t2
        ON t1.id = t2.sale_id`,
    );
    return camelize(sales);
};

const selectSaleById = async (saleId) => {
    const [sale] = await connection.execute(
        `SELECT t1.date, t2.product_id, t2.quantity 
        FROM StoreManager.sales AS t1
        INNER JOIN StoreManager.sales_products AS t2
        ON t1.id = t2.sale_id
        WHERE t1.id = ?`,
        [saleId],
    );
    return camelize(sale);
};

const eraseSale = async (saleId) => {
    const [{ affectedRows }] = await connection.execute(
        'DELETE FROM StoreManager.sales WHERE id = ?',
        [saleId],
    );
    return affectedRows;
};

module.exports = {
    insertSales,
    insertSalesProducts,
    selectAllSales,
    selectSaleById,
    eraseSale,
};
