const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "assetdb",
  password: "2007",
  port: 5432,
});

module.exports = pool;