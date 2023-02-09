const fs = require('fs/promises');
const { join } = require('path');

module.exports = async function readTalkers(req, res, next) {
    try {
        const rawData = await fs.readFile(join(__dirname, '../talker.json'), { encoding: 'utf-8' });
        const talkers = JSON.parse(rawData);
        req.talkers = talkers;
        next();
    } catch (err) {
        res.status(500).json({ message: 'ERROR CODE 500: Internal Server Error' });
    }
};
