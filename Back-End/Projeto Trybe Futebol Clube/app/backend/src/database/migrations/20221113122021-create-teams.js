module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teams', {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER,
        },
        teamName: {
            allowNull: false,
            field: 'team_name',
            type: Sequelize.STRING,
        },
    })
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('teams');
  }
};
