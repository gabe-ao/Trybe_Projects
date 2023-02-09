/* O modulo Crypto oferece ferramentas para produzir algoritmos de criptografia.
Também pode gerar valores e hashes randomicos com força de criptografia para necessidades mais simples,
como e o caso de gerar um token de autenticacao para esta aplicacao.
Fonte: https://nodejs.org/en/knowledge/cryptography/how-to-use-crypto-module/ */
const { randomBytes } = require('crypto');

module.exports = function generateToken(req, res) {
    let token = randomBytes(32).toString('hex'); // Cria um valor randomico de 64 bytes
    token = token.slice(24, 40); // Reduz o token para 16 caracteres, extraindo eles do meio do valor randomico gerado 
    const authKey = {
        token,
    };
    res.status(200).send(authKey);
};
