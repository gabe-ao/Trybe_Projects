module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('sales_products', {
    saleId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      field: 'sale_id',
      references: {
        model: 'sales',
        key: 'id',
      },
    },
    productId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      field: 'product_id',
      references: {
        model: 'products',
        key: 'id',
      },
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
   });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('sales_products');
  }
};

