const express = require('express');
const cookieParser = require('cookie-parser');
const sequelize = require('./config/database');
const musicRouter = require('./routes/musicRoute');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

sequelize.sync({ force: true }).then(async () => {
  console.log('Server created! 🗄️');
})

app.use('/', musicRouter);


module.exports = app;
