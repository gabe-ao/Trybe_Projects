const { errorMapper } = require('../utils/errorMapper');

const errorType = 'REGISTRATION_INVALID';
const nameErrorMsg = '"displayName" length must be at least 8 characters long';
const passwordErrorMsg = '"password" length must be at least 6 characters long';
const emailErrorMsg = '"email" must be a valid email';

const validateReqNewUser = (req, res, next) => {
    const { displayName, email, password } = req.body;
    const validateRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;

    try {
        if (displayName.length < 8) {
            return res.status(errorMapper(errorType)).json({ message: nameErrorMsg });
        }

        if (password.length < 6) {
            return res.status(errorMapper(errorType)).json({ message: passwordErrorMsg });
        }

        if (!validateRegex.test(email)) {
            return res.status(errorMapper(errorType)).json({ message: emailErrorMsg });
        }
    } catch (e) {
        return res.status(errorMapper(errorType))
            .json({ message: 'Some required fields are missing' });
    }

    next();
};

module.exports = validateReqNewUser;
