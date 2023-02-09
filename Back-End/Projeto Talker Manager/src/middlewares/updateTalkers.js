const fs = require('fs/promises');
const { join } = require('path');

module.exports = async function updateTalkers(req, res) {
    try {
        const idNotFound = 'A id enviada não é válida';
        const id = Number(req.params.id);
        const targetIndex = req.talkers.findIndex((talker) => talker.id === id);
        if (targetIndex === -1) return res.status(400).json({ message: idNotFound });

        const updateData = { id, ...req.body };
        req.talkers.splice(targetIndex, 1, updateData);
        const updatedTalkers = JSON.stringify(req.talkers);
        await fs.writeFile(join(__dirname, '../talker.json'), updatedTalkers);
        res.status(200).json(updateData);
    } catch (err) {
        res.status(500).json({ message: 'ERROR CODE 500: Internal Server Error' });
    }
};
