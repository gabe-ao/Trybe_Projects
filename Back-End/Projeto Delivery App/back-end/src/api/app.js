const express = require('express');
const cors = require('cors');
const loginRouter = require('../routes/loginRouter');
const customerProducts = require('../routes/customerProductsRouter');
const customerOrders = require('../routes/customerOrdersRouter');
const customerCheckout = require('../routes/customerCheckoutRouter');
const sellersRouter = require('../routes/sellersRouter');
const usersRouter = require('../routes/usersRouter');
const salesRouter = require('../routes/salesRouter');
const errorMiddleware = require('../middlewares/errorMiddleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use(loginRouter);
app.use(customerProducts);
app.use(customerOrders);
app.use(customerCheckout);
app.use(sellersRouter);
app.use(usersRouter);
app.use(salesRouter);
app.get('/coffee', (_req, res) => res.status(418).end());
app.use(express.static('public'));

app.use(errorMiddleware);

module.exports = app;
