const sql = require("mysql");
const connection = sql.createConnection({
    host:'localhost',
    user:'root',
    password: 'hahaha',
    database: "web_proj",
});


module.exports = connection;