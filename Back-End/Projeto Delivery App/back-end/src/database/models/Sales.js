// models/sales.js
module.exports = (sequelize, DataTypes) => {
  const Sales = sequelize.define('Sales', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: {type: DataTypes.INTEGER, foreignKey: true},
    sellerId: {type: DataTypes.INTEGER, foreignKey: true},
    totalPrice: { type: DataTypes.DECIMAL(9,2) },
    deliveryAddress: { type: DataTypes.STRING },
    deliveryNumber: { type: DataTypes.STRING },
    status: { type: DataTypes.STRING },
    saleDate: { type: DataTypes.DATE }
  },
  {
    tableName: 'sales',
    timestamps: false,
    underscored: true,
  });

  Sales.associate = (models) => {
    Sales.belongsTo(models.User,
      { foreignKey: 'id', as: 'user' },
      );
    Sales.belongsTo(models.User,
      { foreignKey: 'sellerId', as: 'seller' },
      );
  };

  return Sales;
};
