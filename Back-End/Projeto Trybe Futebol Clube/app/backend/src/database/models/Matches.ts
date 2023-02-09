import { Model, INTEGER, BOOLEAN } from 'sequelize';
import tscSequelize from '.';
import Teams from './Teams';

class Matches extends Model {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matches.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: INTEGER,
  },
  homeTeam: {
    allowNull: false,
    field: 'home_team',
    type: INTEGER,
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  homeTeamGoals: {
    allowNull: false,
    field: 'home_team_goals',
    type: INTEGER,
  },
  awayTeam: {
    allowNull: false,
    field: 'away_team',
    type: INTEGER,
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  awayTeamGoals: {
    allowNull: false,
    field: 'away_team_goals',
    type: INTEGER,
  },
  inProgress: {
    allowNull: false,
    field: 'in_progress',
    type: BOOLEAN,
  },
}, {
  sequelize: tscSequelize,
  timestamps: false,
  modelName: 'matches',
});

Matches.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'teamHome' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'teamAway' });

Teams.hasMany(Matches, { foreignKey: 'homeTeam' });
Teams.hasMany(Matches, { foreignKey: 'awayTeam' });

export default Matches;
