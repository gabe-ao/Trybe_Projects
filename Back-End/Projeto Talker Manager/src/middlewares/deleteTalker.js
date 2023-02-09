const fs = require('fs/promises');
const { join } = require('path');

module.exports = async function deleteTalker(req, res) {
    try {
        const idNotFound = 'A id enviada não é válida';
        const id = Number(req.params.id);
        const targetIndex = req.talkers.findIndex((talker) => talker.id === id);
        if (targetIndex === -1) return res.status(400).json({ message: idNotFound });

        req.talkers.splice(targetIndex, 1);
        let updatedTalkers = req.talkers.map((talker) => {
            const newTalker = talker;
            if (newTalker.id > id) newTalker.id -= 1;
            return newTalker;
        });
        updatedTalkers = JSON.stringify(updatedTalkers);
        await fs.writeFile(join(__dirname, '../talker.json'), updatedTalkers);
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ message: 'ERROR CODE 500: Internal Server Error' });
    }
};
