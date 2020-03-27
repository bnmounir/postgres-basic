const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    password: 'password',
    host: 'localhost',
    port: 3009,
    database: 'postgres'
});

module.exports = pool;
