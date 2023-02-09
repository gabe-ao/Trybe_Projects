module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
      {
        timestamps: false,
        underscored: true,
        tableName: 'users',
      });
  
      // User.associate = (models) => {
      //   User.hasMany(models.Sales,
      //     { foreignKey: 'userId', as: 'User Sales'});
      // };
  
    return User;
  };
  