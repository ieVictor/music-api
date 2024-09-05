const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const { swaggerSpec } = require('./swaggerConfig');

fs.writeFile(path.join(__dirname, 'swagger.json'), JSON.stringify(swaggerSpec, null, 2), (err) => {
  if (err) {
    console.error('Error generating swagger.json file:', err);
  } else {
    console.log('Successfully generated swagger.json file!');
  }
});

fs.writeFile(path.join(__dirname, 'swagger.yaml'), yaml.dump(swaggerSpec), (err) => {
  if (err) {
    console.error('Error generating swagger.yaml file:', err);
  } else {
    console.log('Successfully generated swagger.yaml file!');
  }
});