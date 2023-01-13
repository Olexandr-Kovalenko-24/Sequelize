const express = require('express');
const rootRouter = require('./routes');

const app = express();
const bodyParser = express.json();

app.use(bodyParser);
app.use('/api', rootRouter);

module.exports = app;