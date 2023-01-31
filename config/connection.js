// require the sequelize package referencing the db, un, and password from the .env file
const Sequelize = require('sequelize');
require('dotenv').config();

// declare sequelize so that db name, un, and password may be fed through and exported for reference
let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}
module.exports = sequelize;
