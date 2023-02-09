const express = require('express');
require('express-async-errors');
const userRouter = require('./routers/userRouter');
const categoriesRouter = require('./routers/categoriesRouter');
const postRouter = require('./routers/postRouter');
const userController = require('./controllers/user.controller');
const validateReqLogin = require('./middlewares/validateReqLogin');

// ...

const app = express();
app.use(express.json());

app.post('/login', validateReqLogin, userController.postLogin);
app.use('/user', userRouter);
app.use('/categories', categoriesRouter);
app.use('/post', postRouter);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
