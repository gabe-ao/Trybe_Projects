const errorMap = {
    LOGIN_INVALID: 400,
    REGISTRATION_INVALID: 400,
    MISSING_FIELDS: 400,
    NAME_NOT_FOUND: 400,
    CATEGORY_NOT_FOUND: 400,
    INVALID_VALUE: 400,
    TOKEN_NOT_FOUND: 401,
    TOKEN_INVALID: 401,
    UNAUTHORIZED_USER: 401,
    USER_NOT_FOUND: 404,
    POST_NOT_FOUND: 404,
    USER_ALREADY_REGISTERED: 409,
    CATEGORY_ALREADY_REGISTERED: 409,
    INTERNAL_ERROR: 500,
};

const errorMapper = (type) => errorMap[type]; 

module.exports = {
    errorMap,
    errorMapper,
};