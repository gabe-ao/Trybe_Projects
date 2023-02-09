import { Model, INTEGER, STRING } from 'sequelize';
import tscSequelize from '.';

class Teams extends Model {
  declare id: number;
  declare teamName: string;
}

Teams.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: INTEGER,
  },
  teamName: {
    allowNull: false,
    field: 'team_name',
    type: STRING,
  },
}, {
  sequelize: tscSequelize,
  timestamps: false,
  modelName: 'teams',
});

export default Teams;
