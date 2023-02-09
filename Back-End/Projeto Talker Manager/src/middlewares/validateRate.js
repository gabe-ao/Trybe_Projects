module.exports = function validateRate(req, res, next) {
    const undefinedRate = 'O campo "rate" é obrigatório';
    const invalidRate = 'O campo "rate" deve ser um inteiro de 1 à 5';
    const { rate } = req.body.talk;

    if (rate === 0) return res.status(400).json({ message: invalidRate });
    if (!rate) return res.status(400).json({ message: undefinedRate });
    if (rate > 5 || rate < 1) return res.status(400).json({ message: invalidRate });

    next();
};
