// db.js
/* const mysql = require('mysql2/promise'); */
const mysql = require('mysql2');

const  connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'parcial'
    }
).promise();


module.exports = connection ;
