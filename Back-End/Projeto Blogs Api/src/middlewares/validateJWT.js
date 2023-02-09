require('dotenv/config');
const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');
const { errorMapper } = require('../utils/errorMapper');

const secret = process.env.JWT_SECRET;

const validateJWT = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(errorMapper('TOKEN_NOT_FOUND')).json({ message: 'Token not found' });
    }

    try {
        const { payload } = jwt.verify(token, secret);
        req.userId = payload.userId;
        req.userName = payload.userName;
        const { type } = await userService.checkUser(req.userId, req.userName);
        if (type) throw new Error();
    } catch (err) {
        return res.status(errorMapper('TOKEN_INVALID'))
            .json({ message: 'Expired or invalid token' });
    }

    next();
};

module.exports = validateJWT;
