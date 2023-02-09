module.exports = function validateNameAge(req, res, next) {
    const undefinedName = 'O campo "name" é obrigatório';
    const invalidName = 'O "name" deve ter pelo menos 3 caracteres';
    const undefinedAge = 'O campo "age" é obrigatório';
    const invalidAge = 'A pessoa palestrante deve ser maior de idade';
    const { name, age } = req.body;

    if (!name) return res.status(400).json({ message: undefinedName });
    if (name.length < 3) return res.status(400).json({ message: invalidName });
    if (!age) return res.status(400).json({ message: undefinedAge });
    if (age < 18) return res.status(400).json({ message: invalidAge });

    next();
};
