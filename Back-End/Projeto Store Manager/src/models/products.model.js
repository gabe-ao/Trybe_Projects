const connection = require('./connection');

const selectAllProducts = async () => {
    const [products] = await connection.execute('SELECT * FROM StoreManager.products');
    return products;
};

const selectProductById = async (productId) => {
    const [[product]] = await connection.execute(
        'SELECT * FROM StoreManager.products WHERE id = ?',
        [productId],
    );
    return product;
};

const selectMultipleProducts = async (sales) => {
    const placeholders = sales.map(() => '?').join(', ');
    const values = sales.map((sale) => sale.productId);

    const [products] = await connection.execute(
        `SELECT * FROM StoreManager.products WHERE id IN (${placeholders})`,
        values,
    );
    return products;
};

const insertNewProduct = async (productName) => {
    const [{ insertId }] = await connection.execute(
        'INSERT INTO StoreManager.products (name) VALUES (?)',
        [productName],
    );
    return insertId;
};

const updateProduct = async (newName, productId) => {
    const [{ info }] = await connection.execute(
        'UPDATE StoreManager.products SET name = ? WHERE id = ?',
        [newName, productId],
    );
    return info;
};

const eraseProduct = async (productId) => {
    const [{ affectedRows }] = await connection.execute(
        'DELETE FROM StoreManager.products WHERE id = ?',
        [productId],
    );
    return affectedRows;
};

module.exports = {
    selectAllProducts,
    selectProductById,
    selectMultipleProducts,
    insertNewProduct,
    updateProduct,
    eraseProduct,
};
