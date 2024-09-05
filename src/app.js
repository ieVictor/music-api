const express = require('express');
const cookieParser = require('cookie-parser');
const sequelize = require('./config/database');
const musicRoutes = require('./routes/musicRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

sequelize.sync().then(async () => {
  console.log('Database created! 📂');
})

app.use('/user', userRoutes);
app.use('/music', musicRoutes);


module.exports = app;
