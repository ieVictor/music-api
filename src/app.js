const express = require('express');
const cookieParser = require('cookie-parser');
const sequelize = require('./config/database');
const musicRoutes = require('./routes/musicRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const installRoutes = require('./routes/installRoutes');
const swaggerUi = require('swagger-ui-express');
const { swaggerSpec, swaggerSpecJson, swaggerStyle } = require('./swagger/swaggerConfig');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

sequelize.sync({ force: true }).then(async () => {
  console.log('Database connected! 📂');
})

app.use('/user', userRoutes);
app.use('/music', musicRoutes);
app.use('/login', authRoutes);
app.use('/install', installRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerStyle));
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpecJson, swaggerStyle));

module.exports = app;
