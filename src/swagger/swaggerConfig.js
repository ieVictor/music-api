const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');
const fs = require('fs');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API RESTful - Musics',
      version: '1.0.0',
      description: "This project consists of building a **RESTful API using Node.js and Express**, with integration to the **SQL** database, " + 
      "to create a system that allows users to manage **musics**.\n\n",
      license: {
        name: 'MIT License',
        url: 'https://github.com/ieVictor/music-api/blob/main/LICENSE',
      },
    },
    components: {
      securitySchemes: {
        jwt: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
          description: "To authenticate, pass the JWT token in the format **Bearer _token_**.",
        },
      },
    },
  },
  apis: ['./src/routes/*.js', './src/models/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const swaggerJsonPath = path.join(__dirname, 'swagger.json');
const swaggerSpecJson = fs.existsSync(swaggerJsonPath) ? JSON.parse(fs.readFileSync(swaggerJsonPath, 'utf8')) : null;

const customCss = fs.readFileSync(path.join(__dirname, '../.././node_modules/swagger-ui-dist/swagger-ui.css'), 'utf8');
const swaggerStyle = {
    customCss
};

module.exports = { swaggerSpec, swaggerSpecJson, swaggerStyle };