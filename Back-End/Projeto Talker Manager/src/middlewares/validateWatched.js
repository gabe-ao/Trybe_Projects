module.exports = function validateWatched(req, res, next) {
    const undefinedWatchedAt = 'O campo "watchedAt" é obrigatório';
    const invalidWatchedAt = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
    const validateRegex = /^\d{2}\/\d{2}\/\d{4}$/i;
    const { watchedAt } = req.body.talk;

    if (!watchedAt) return res.status(400).json({ message: undefinedWatchedAt });
    if (!validateRegex.test(watchedAt)) return res.status(400).json({ message: invalidWatchedAt });
    
    next();
};
