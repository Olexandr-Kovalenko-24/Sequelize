const express = require('express');
const UserController = require('./controllers/user.controller')

const bodyParser = express.json();
const app = express();

app.use(bodyParser);

app.post('/', UserController.createUser);
app.get('/', UserController.getAllUser);






module.exports = app;