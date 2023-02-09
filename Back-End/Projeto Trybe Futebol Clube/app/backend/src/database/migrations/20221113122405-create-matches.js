module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER,
        },
        homeTeam: {
            allowNull: false,
            field: 'home_team',
            type: Sequelize.INTEGER,
            references: {
                model: 'teams',
                key: 'id',
            },
        },
        homeTeamGoals: {
            allowNull: false,
            field: 'home_team_goals',
            type: Sequelize.INTEGER,
        },
        awayTeam: {
            allowNull: false,
            field: 'away_team',
            type: Sequelize.INTEGER,
            references: {
                model: 'teams',
                key: 'id',
            },
        },
        awayTeamGoals: {
            allowNull: false,
            field: 'away_team_goals',
            type: Sequelize.INTEGER,
        },
        inProgress: {
            allowNull: false,
            field: 'in_progress',
            type: Sequelize.BOOLEAN,
        },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('matches');
  }
};
