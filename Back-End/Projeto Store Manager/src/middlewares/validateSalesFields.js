const validateSalesFields = (req, res, next) => {
    const sales = req.body;
    for (let ind = 0; ind < sales.length; ind += 1) {
        if (!('productId' in sales[ind])) {
            return res.status(400).json({ message: '"productId" is required' });
        }
        if (!('quantity' in sales[ind])) {
            return res.status(400).json({ message: '"quantity" is required' });
        }
    }

    next();
};

module.exports = validateSalesFields;
