const express = require('express');
const getTalkerById = require('../middlewares/getTalkerById');
const readTalkers = require('../middlewares/readTalkers');
const validateAuth = require('../middlewares/validateAuth');
const validateTalk = require('../middlewares/validateTalk');
const validateNameAge = require('../middlewares/validateNameAge');
const validateRate = require('../middlewares/validateRate');
const validateWatched = require('../middlewares/validateWatched');
const writeTalkers = require('../middlewares/writeTalkers');
const updateTalkers = require('../middlewares/updateTalkers');
const deleteTalker = require('../middlewares/deleteTalker');

const talkerRouter = express.Router();

talkerRouter.get('/', readTalkers, (req, res) => {
    res.status(200).json(req.talkers);
});

talkerRouter.post('/', validateAuth, validateTalk, validateNameAge,
    validateWatched, validateRate, readTalkers, writeTalkers);

talkerRouter.get('/:id', readTalkers, getTalkerById);

talkerRouter.put('/:id', validateAuth, validateTalk, validateNameAge,
    validateWatched, validateRate, readTalkers, updateTalkers);

talkerRouter.delete('/:id', validateAuth, readTalkers, deleteTalker);

module.exports = talkerRouter;
