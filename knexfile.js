// Update with your config settings.
const path = require('path');
// Installed dotenv and updated this knex file
require("dotenv").config();
const { DATABASE_URL } = process.env;

module.exports = {

  development: {
    client: 'postgresql',
    connection: DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    }
  },

  production: {
    client: 'postgresql',
    connection: DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    }
  }

};