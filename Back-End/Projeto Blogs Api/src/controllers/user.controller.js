require('dotenv/config');
const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');
const { errorMapper } = require('../utils/errorMapper');

const secret = process.env.JWT_SECRET;

const postLogin = async (req, res) => {
    const { email, password } = req.body;
    const { type, message } = await userService.userLogin(email, password);
    if (type) return res.status(errorMapper(type)).json({ message });

    const { payload } = message;
    const jwtConfig = {
        algorithm: 'HS256',
        expiresIn: '12h',
    };
    const token = jwt.sign({ payload }, secret, jwtConfig);
    return res.status(200).json({ token });
};

const postUser = async (req, res) => {
    const { displayName, email, password, image } = req.body;
    const { type, message } = await userService.createUser(
        displayName, email, password, image,
    );
    if (type) return res.status(errorMapper(type)).json({ message });

    const { payload } = message;
    const jwtConfig = {
        algorithm: 'HS256',
        expiresIn: '12h',
    };
    const token = jwt.sign({ payload }, secret, jwtConfig);
    return res.status(201).json({ token });
};

const getUsers = async (_req, res) => {
    try {
        const { message } = await userService.selectAllUsers();
        return res.status(200).json(message);
    } catch (error) {
        return res.status(errorMapper('INTERNAL_ERROR')).json({ message: 'Internal server error' });
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    const { type, message } = await userService.selectUserById(id);
    if (type) return res.status(errorMapper(type)).json({ message });
    
    return res.status(200).json(message);
};

const deleteUser = async (req, res) => {
    try {
        const { type, message } = await userService.deleteUser(req.userId);
        if (type) return res.status(errorMapper(type)).json({ message });
        
        return res.status(204).end();
    } catch (error) {
        return res.status(errorMapper('INTERNAL_ERROR')).json({ message: 'Internal server error' });
    }
};

module.exports = {
    postLogin,
    postUser,
    getUsers,
    getUserById,
    deleteUser,
};
