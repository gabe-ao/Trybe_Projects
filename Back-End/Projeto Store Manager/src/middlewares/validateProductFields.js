const validateProductFields = (req, res, next) => {
    if (!req.body || !req.body.name) {
        return res.status(400).json({ message: '"name" is required' });
    }
    next();
};

module.exports = validateProductFields;
