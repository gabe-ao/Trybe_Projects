module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    }, 
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }, 
    urlImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'products',
  });

  return Product;
}
