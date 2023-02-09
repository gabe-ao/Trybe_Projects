module.exports = function validateAuth(req, res, next) {
    const undefinedToken = 'Token não encontrado';
    const invalidToken = 'Token inválido';
    const token = req.header('authorization');
    
    if (!token) return res.status(401).json({ message: undefinedToken });
    if (token.length !== 16) return res.status(401).json({ message: invalidToken });

    next();
};
