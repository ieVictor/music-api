const dotenv = require('dotenv');

dotenv.config();

const config = {
  port: parseInt(process.env.PORT || '8080', 10),
}

module.exports = config