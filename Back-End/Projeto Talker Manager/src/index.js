const express = require('express');
require('express-async-errors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const talkerRouter = require('./routes/talkerRouter');
const loginRouter = require('./routes/loginRouter');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/talker', talkerRouter);
app.use('/login', loginRouter);

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Servidor Talker Manager Online!');
});
