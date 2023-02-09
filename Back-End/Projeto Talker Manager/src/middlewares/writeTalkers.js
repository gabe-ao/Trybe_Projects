const fs = require('fs/promises');
const { join } = require('path');

module.exports = async function writeTalkers(req, res) {
    try {
        req.body.id = req.talkers.length + 1;
        let newTalkers = [...req.talkers];
        newTalkers.push(req.body);
        newTalkers = JSON.stringify(newTalkers);
        await fs.writeFile(join(__dirname, '../talker.json'), newTalkers);
        res.status(201).json(req.body);
    } catch (err) {
        res.status(500).json({ message: 'ERROR CODE 500: Internal Server Error' });
    }
};
