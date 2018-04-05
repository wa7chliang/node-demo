const mysql = require('mysql')

var db = {}

db.conn = function (cb) { 
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'nodeblog'
  })
  connection.connect()
  cb(connection)
}

module.exports = db
