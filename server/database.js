const sql = require("mysql2");

const connection = sql.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"",
    database: "web_proj",
});


module.exports = connection;