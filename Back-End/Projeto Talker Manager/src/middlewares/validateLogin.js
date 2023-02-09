module.exports = function validateLogin(req, res, next) {
    const undefinedEmail = 'O campo "email" é obrigatório';
    const undefinedPassword = 'O campo "password" é obrigatório';
    const invalidEmail = 'O "email" deve ter o formato "email@email.com"';
    const invalidPassword = 'O "password" deve ter pelo menos 6 caracteres';
    const validateRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;

    const { email, password } = req.body;
    if (!email) return res.status(400).json({ message: undefinedEmail });
    if (!password) return res.status(400).json({ message: undefinedPassword });
    if (!validateRegex.test(email)) return res.status(400).json({ message: invalidEmail });
    if (password.length < 6) return res.status(400).json({ message: invalidPassword });

    next();
};
