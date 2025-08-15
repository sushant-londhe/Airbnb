const mysql  = require("mysql2");

const pool = mysql.createPool({
    host : "localhost",
    user: "root",
    password: "hanuman",
    database: "airbnb",
    port : 3306,
    connectionLimit: 10,
})

module.exports = pool

