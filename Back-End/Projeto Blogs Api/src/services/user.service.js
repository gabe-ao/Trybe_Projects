const { User } = require('../models');
const { validateNewUser } = require('./validations/validationsInputValues');

const userLogin = async (email, password) => {
    const user = await User.findOne({
        where: { email, password },
    });
    if (!user) return { type: 'LOGIN_INVALID', message: 'Invalid fields' };

    const { id, displayName } = user.dataValues;
    return { type: null, message: { payload: { userId: id, userName: displayName } } };
};

const createUser = async (displayName, email, password, image = 'Image Not Set') => {
    const { type, message } = await validateNewUser(displayName, email, password, image);
    if (type) return { type, message };

    const { dataValues } = await User.create({ displayName, email, password, image });
    const { id: userId, displayName: userName } = dataValues;
    
    return { type: null, message: { payload: { userId, userName } } };
};

const selectAllUsers = async () => {
    const allUsers = await User.findAll({
        attributes: ['id', 'displayName', 'email', 'image'],
    });
    return { type: null, message: allUsers };
};

const checkUser = async (id, displayName) => {
    const isUserFound = await User.findOne({
        where: { id, displayName },
    });
    if (!isUserFound) return { type: 'USER_NOT_FOUND', message: 'User does not exist' };
    return { type: null, message: 'Ok, User found' };
};

const selectUserById = async (id) => {
    const user = await User.findOne({
        attributes: ['id', 'displayName', 'email', 'image'],
        where: { id },
    });
    if (!user) return { type: 'USER_NOT_FOUND', message: 'User does not exist' };
    return { type: null, message: user };
};

const deleteUser = async (id) => {
    await User.destroy({ where: { id } });
    return { type: null, message: 'Ok, user deleted successfully' };
};

module.exports = {
    userLogin,
    createUser,
    selectAllUsers,
    selectUserById,
    checkUser,
    deleteUser,
};
