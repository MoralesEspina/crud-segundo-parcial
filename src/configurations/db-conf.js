const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'j8oay8teq9xaycnm.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'zkwgkh7sv0wfa6mo',
    password: 's07vymop90jj7xqs',
    database: 'u1ntiesb2kvna45k',
    multipleStatements: true
  });

  mysqlConnection.connect(function (err) {
    if (err) {
      console.error(err);
      return;
    } else {
      console.log('Ahora estamos en Linea :D');
    }
  });

  module.exports = mysqlConnection;