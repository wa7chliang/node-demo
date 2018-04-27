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

// 发表文章
let writeDataByposts = ( obj ) => {
  let _sql = `INSERT INTO posts(username,title,content,moment) VALUES("${obj.username}","${obj.title}","${obj.content}","${obj.moment}");`
  return query(_sql)
}

// 通过id查找文章
let findPostsById = ( obj ) => {
  let _sql = `select * from posts where id="${obj.id}";`
  return query(_sql)
}

// 添加浏览次数
let addDataByPv = ( obj ) => {
  let _sql = `UPDATE posts SET pv="${obj.pv}" WHERE id="${obj.id}";`
  return query(_sql)
}

// 查询分页文章
let findDataByArticle = ( obj ) => {
  let _sql = `select * FROM posts ORDER BY moment DESC limit ${(obj.page-1)*10},10;`
  return query(_sql)
}

// 查询文章列表总数
let findCountByArticle = () => {
  let _sql = `select count(*) AS listCount from posts` //查询总数并命名为listCount
  return query(_sql)
}

// 通过username查询分页文章
let findUsernameByArticle = ( obj ) => {
  let _sql = `select * FROM posts  WHERE username="${obj.username}" ORDER BY moment DESC limit ${(obj.page-1)*10},10;`
  return query(_sql)
}

// 通过username查询分页列表总数
let findCountByAricleWhereUsername = ( obj ) => {
  let _sql = `select count(*) AS listCount from posts WHERE username="${obj.username}";` //查询总数并命名为listCount  
  return query(_sql)
}

// 提交评论
let addComment = ( obj ) => {
  let _sql = `INSERT INTO comment(username,postid,content,moment) VALUES("${obj.username}","${obj.postid}","${obj.content}","${obj.moment}");`
  return query(_sql)
}

// 搜索文章评论
let findCommentByPostid = ( obj ) => {
  let _sql = `select * FROM comment WHERE postid=${obj.postid} ORDER BY moment DESC limit ${(obj.page-1)*10},10;`
  return query(_sql)  
}

// 添加评论数并更新修改时间
let UpdateCommentAndMoment = ( obj ) => {
  let _sql = `UPDATE posts SET comments="${obj.comments}",moment="${obj.moment}" WHERE id="${obj.postid}";`
  return query(_sql)      
}

module.exports = {
  query,
  findDataByUserName,
  writeDataByUser,
  modefieDateByMoment,
  modifieDataByAvatar,
  writeDataByposts,
  findPostsById,
  addDataByPv,
  findDataByArticle,
  findCountByArticle,
  findUsernameByArticle,
  findCountByAricleWhereUsername,
  addComment,
  findCommentByPostid,
  UpdateCommentAndMoment
}