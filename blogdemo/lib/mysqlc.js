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
  let _sql = `INSERT INTO user(username,password,avator) VALUES("${obj.name}","${obj.password}","upload_7eb0f17c485156efad980e49259fd408.jpg");`
  return query(_sql)
}

// 修改用户个人简介
let modefieDateByMoment = ( obj ) => {
  let _sql = `UPDATE user SET moment="${obj.moment}" WHERE username="${obj.username}";`
  return query(_sql)
}

// 修改用户个人头像
let modifieDataByAvatar = ( obj ) => {
  let _sql = `UPDATE user SET avator="${obj.avatar}" WHERE username="${obj.username}";`
  return query(_sql)
}

module.exports = {
  query,
  findDataByUserName,
  writeDataByUser,
  modefieDateByMoment,
  modifieDataByAvatar
}