var express = require('express');
var router = express.Router();
var path = require('path')
var fs = require('fs')
var sha1 = require('sha1')
var userModel = require('../lib/mysqlc')

/* GET users listing. */
router.get('/', function(req, res, next) {
  return res.send('respond with a resource');
});

router.get('/register', function (req, res, next) {
    return res.render('register')
})

// 注册提交
router.post('/register', function (req, res, next) {
  const name = req.body.username
  let password = req.body.password
  const repassword = req.body.repassword
  // res.json({a: 1})
  // const name = req.fields.name
  // let password = req.fields.password
  // const repassword = req.fields.repassword
  // const avatar = req.files.avatar.path.split(path.sep).pop()
  // 校验参数
  try {
    if (!(name.length >= 1 && name.length <= 10)) {
      throw new Error('名字请限制在1-10个字符')
    } else if (password.length < 6) {
      throw new Error('密码至少6个字符')
    } else if (password !== repassword) {
      throw new Error('两次输入密码不一致')
    }
  } catch (e) {
    res.json({
      state: 0,
      msg: e.message
    })
    return
  }
  password = sha1(password)
  let obj = {
    name: name,
    password: password,
  } 

  userModel.findDataByUserName(name)
    .then(result => {
      if(result[0]) {
        res.json({
          state: 0,
          msg: '已存在注册账号'
        })
        return
      } else {
        userModel.writeDataByUser(obj)
          .then(result2 => {
            if(result2.affectedRows !== 0) {
              userModel.findDataByUserName(name)
                .then(result3 => {
                  delete result3[0].password
                  res.json({
                    state: 1,
                    msg: '',
                    cont: result3[0]
                  })
                  return                  
                }).catch(err3 => {
                  res.json({
                    state: 0,
                    msg: err3
                  })
                  return                  
                }) 
            }
          }).catch(err2 => {
            res.json({
              state: 0,
              msg: err2
            })
            return            
          })
      }

      // if(result[0]) {
      //   fs.unlink(req.files.avatar.path)
      //   req.flash('error', '已存在注册账号')
      //   return res.redirect('/users/register')
      // } else {
    //   userModel.writeDataByUser(obj)
    //     .then(result2 => {
    //       delete obj.password
    //       req.session.user = obj  //使用session
    //       return res.redirect('/')
    //     }).catch(err2 => {
    //       // console.log(err2)
    //       // return res.render('register', {msg: '注册失败'})
    //     })
    }).catch(err => {
      res.json({
        state: 0,
        msg: err
      })
    })

})

// 登录
router.get('/signin', function (req, res, next) {
  return res.render('signin', {msg: ''})
})

// 登录
router.post('/signin', function (req, res, next) {
  const name = req.fields.name
  let password = req.fields.password
  try {
    if (!(name.length >= 1 && name.length <= 10)) {
      throw new Error('名字请限制在1-10个字符')
    } else if (password.length < 6) {
      throw new Error('密码至少6个字符')
    }
  } catch (e) {
    return res.render('signin', {msg: e.message})
  }
  password = sha1(password)
  let obj = {
    name: name,
    password: password
  }
  userModel.findDataByUserName(name)
    .then(result => {
      let obj0 = result[0]
      try {
        if(!obj0) {
          throw new Error('账号未注册')
        } else if(obj0.password !== obj.password) {
          throw new Error('密码错误')
        }
      } catch (e) {
        console.log(e)
        return res.render('signin', {msg: e.message})
      }
      delete obj0.password
      req.session.user = obj0
      return res.redirect('/')
    }).catch(err => {
      console.log(err)
      return res.render('signin', {msg: '登录失败'})
    })
})

// 个人中心
router.get('/personal', function (req, res, next) {
  var objmsg = req.session.user
  res.render('personal', {username: objmsg.username, avatar: objmsg.avator, moment: objmsg.moment})
})


module.exports = router;
