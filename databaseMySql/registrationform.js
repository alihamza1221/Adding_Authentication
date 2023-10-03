const sql   = require('mysql2/promise');

const pool = sql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Player.123',
    database: 'register',
    port:'3306'
})

module.exports = pool;