const errorMap = {
    BAD_REQUEST: 400,
    PRODUCT_NOT_FOUND: 404,
    SALE_NOT_FOUND: 404,
    UNPROCESSABLE_ENTITY: 422,
};

const errorStatus = (type) => errorMap[type] || 500;

module.exports = {
    errorMap,
    errorStatus,
};
