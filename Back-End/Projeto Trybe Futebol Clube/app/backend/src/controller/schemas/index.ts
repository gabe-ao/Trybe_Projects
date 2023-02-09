import Joi = require('joi');

const reGexForEmails = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;

const loginReqSchema = Joi.object({
  email: Joi.string().regex(reGexForEmails).required(),
  password: Joi.string().min(6).required(),
});

const newMatchSchema = Joi.object({
  id: Joi.any().forbidden(),
  homeTeam: Joi.number().min(1).required(),
  homeTeamGoals: Joi.number().min(0).required(),
  awayTeam: Joi.number().min(1).required(),
  awayTeamGoals: Joi.number().min(0).required(),
  inProgress: Joi.boolean().optional(),
}).required();

const newScoreSchema = Joi.object({
  homeTeamGoals: Joi.number().min(0).required(),
  awayTeamGoals: Joi.number().min(0).required(),
}).required();

export {
  reGexForEmails,
  loginReqSchema,
  newMatchSchema,
  newScoreSchema,
};
