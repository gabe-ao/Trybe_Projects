module.exports = function validateTalk(req, res, next) {
    const undefinedTalk = 'O campo "talk" é obrigatório';
    
    const { talk } = req.body;
    if (!talk) return res.status(400).json({ message: undefinedTalk });
    
    next();
};
