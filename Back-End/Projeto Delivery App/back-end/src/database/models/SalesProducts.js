const db = require(".");

module.exports = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define('SalesProducts', {
    saleId: DataTypes.INTEGER,
    productId:  DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
  },
    {
      tableName: 'sales_products',
      sequelize: db,
      timestamps: false, 
      underscored: true,
    });

    SalesProducts.associate = (models) => { 
      models.Sales.belongsToMany(models.Product, { 
        as: 'products',
        through: SalesProducts,
        foreignKey: 'saleId',
        otherKey: 'productId',
      });
      models.Product.belongsToMany(models.Sales, {
        as: 'sales', 
        through: SalesProducts, 
        foreignKey: 'productId',
        otherKey: 'saleId',
      });
  };
  return SalesProducts;
};
