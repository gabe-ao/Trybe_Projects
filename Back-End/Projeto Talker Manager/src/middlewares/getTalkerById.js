module.exports = function getTalkerById(req, res) {
    const id = Number(req.params.id);
    const targetTalker = req.talkers.find((talker) => talker.id === id);
    
    if (!targetTalker) {
        const talkerNotFound = {
            message: 'Pessoa palestrante não encontrada',
        };
        return res.status(404).json(talkerNotFound);
    }

    res.status(200).json(targetTalker);
};
