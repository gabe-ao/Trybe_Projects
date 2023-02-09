const { errorMapper } = require('../utils/errorMapper');

const validateReqNewPost = (req, res, next) => {
    const { title, content, categoryIds } = req.body;
    if (!title || !content || !categoryIds) {
        return res.status(errorMapper('MISSING_FIELDS'))
            .json({ message: 'Some required fields are missing' });
    }

    next();
};

module.exports = validateReqNewPost;
