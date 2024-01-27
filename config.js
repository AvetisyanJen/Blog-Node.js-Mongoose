require('dotenv').config();

module.exports = {
  dbURI: process.env.DB_URI,
  port: process.env.PORT || 3000,
  SECRET: process.env.SECRET
};