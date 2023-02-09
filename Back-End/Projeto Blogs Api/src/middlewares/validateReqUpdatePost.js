const { errorMapper } = require('../utils/errorMapper');

const validateReqUpdatePost = async (req, res, next) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(errorMapper('MISSING_FIELDS'))
            .json({ message: 'Some required fields are missing' });
    }

    next();
};

module.exports = validateReqUpdatePost;