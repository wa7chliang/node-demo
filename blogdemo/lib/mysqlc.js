var conn = require('./conn')

let query = ( sql ) => {
  return new Promise(( resolve, reject ) => {
    conn.conn(function (connection) {
      connection.query(sql, function (err, result) {
        if ( err ) {
          reject( err )
        } else {
          resolve( result )
        }
        // connection.release()
      })
    })
  })
}


// 通过名字查找用户
let findDataByUserName =  ( name ) => {
  let _sql = `select * from user where username="${name}";`
  return query(_sql)
}

// 将注册账号写入数据库
let writeDataByUser = ( obj ) => {
  let _sql = `INSERT INTO user(username,password,avator) VALUES("${obj.name}","${obj.password}","${obj.avatar}");`
  return query(_sql)
}

module.exports = {
  query,
  findDataByUserName,
  writeDataByUser
}