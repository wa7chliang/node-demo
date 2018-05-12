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
  let code = req.body.code.toUpperCase()
  let captcha = req.session.captcha
  // 校验参数
  try {
    if (!(name.length >= 1 && name.length <= 10)) {
      throw new Error('名字请限制在1-10个字符')
    } else if (password.length < 6) {
      throw new Error('密码至少6个字符')
    } else if (password !== repassword) {
      throw new Error('两次输入密码不一致')
    } else if (code !== captcha) {
      throw new Error('验证码错误')
    } else {

      password = sha1(password)
      let obj = {
        name: name,
        password: password,
      } 

      userModel.findDataByUserName(name)
      .then(result => {
        if(result[0]) {
          throw new Error('已存在注册账号')
        } else {
          userModel.writeDataByUser(obj)
            .then(result2 => {
              if(result2.affectedRows !== 0) {
                userModel.findDataByUserName(name)
                  .then(result3 => {
                    delete result3[0].password
                    req.session.user = result3[0] //使用session
                    res.json({
                      state: 1,
                      msg: '',
                      cont: result3[0]
                    })
                    return                  
                  }).catch(err3 => {
                    res.json({
                      state: 0,
                      msg: '添加失败'
                    })
                    return
                  }) 
              }
            }).catch(err2 => {
              res.json({
                state: 0,
                msg: '添加失败'
              })
              return 
            })
        }
      }).catch(err => {
        res.json({
          state: 0,
          msg: err.message
        })
        return  
      })

    }
  } catch (e) {
    res.json({
      state: 0,
      msg: e.message
    })
    return
  }

})

// 登录
router.get('/signin', function (req, res, next) {
  return res.render('signin', {msg: ''})
})

// 登录
router.post('/signin', function (req, res, next) {
  const name = req.body.username
  let password = req.body.password
  let code = req.body.code.toUpperCase()
  let captcha = req.session.captcha

  try {
    if (!(name.length >= 1 && name.length <= 10)) {
      throw new Error('名字请限制在1-10个字符')
    } else if (password.length < 6) {
      throw new Error('密码至少6个字符')
    } else if (code !== captcha) {
      throw new Error('验证码错误')
    } else {
      password = sha1(password)
      let obj = {
        name: name,
        password: password
      }

      userModel.findDataByUserName(name)
        .then(result => {
          if(!result[0]) {
            throw new Error('账号未注册')
          } else if(result[0].password !== obj.password) {
            throw new Error('密码错误')
          }
          delete result[0].password
          req.session.user = result[0]
          res.json({
            state: 1,
            msg: '',
            cont: result[0]
          })
          return
        }).catch(err => {
          res.json({
            state: 0,
            msg: err.message
          })
          return
        })
    }
  } catch (e) {
    res.json({
      state: 0,
      msg: e.message
    })
    return
  }
})

// 个人中心
router.get('/personal', function (req, res, next) {
  var objmsg = req.session.user
  res.render('personal', {username: objmsg.username, avatar: objmsg.avator, moment: objmsg.moment})
})

// 修改个人资料
router.get('/editPersonal', function (req, res, next) {
  var objmsg = req.session.user
  res.render('editPersonal', {username: objmsg.username, moment: objmsg.moment})
})

// 点击提交修改个人资料
router.post('/editPersonal', function (req, res, next) {
  let moment = req.body.moment
  let state = req.session.user
  userModel.modefieDateByMoment({moment: moment,username: state.username})
    .then(result => {
      if(result.affectedRows !== 0) {
        req.session.user.moment = moment
        res.json({
          state: 1,
          msg: ''
        })
        return
      } else {
        throw new Error('修改失败')
      }
    }).catch(e => {
      res.json({
        state: 0,
        msg: e.message
      })
      return
    })
})

// 得到签到表
router.get('/checkTime', function (req, res, next) {
  let users = req.session.user
  let obj = {
    id: users.id
  }
  userModel.FindIdByCheckTime(obj)
  .then(result => {   
    if(result[0]) {
      res.json({
        state: 1,
        list: result[0]
      })
    } else {
      userModel.CreateCheckTimeById(obj)
        .then(result2 => {
          if(result2.affectedRows !== 0) {
            res.json({
              state: 2,
              content: result2
            })
          } else {
            throw new Error('创建失败')
          }          
        }).catch(e2 => {
          res.json({
            state: 0,
            msg: e2.message
          })
        })
    }
  }).catch(e => {
    console.log(e)
  })
})

// 点击签到
router.post('/checkTime', function (req, res, next) {
  let users = req.session.user
  let isMonth = req.body.isMonth
  let obj = {
    id: users.id,
    checkM: req.body.checkM,
    checkD: JSON.parse(req.body.checkD) || []
  }
  if (isMonth) {
    obj.checkD.push(new Date().getDate())    
    obj.checkD = JSON.stringify(obj.checkD)    
  } else {
    obj.checkD = []
    obj.checkD.push(new Date().getDate())
    obj.checkD = JSON.stringify(obj.checkD)
  }
  userModel.UpdateCheckTimeById(obj)
    .then(result => {
      if(result.affectedRows !== 0) {
        res.json({
          state: 1,
          content: result
        })
      } else {
        throw new Error('插入失败')
      }
    }).catch(e => {
      res.json({
        state: 0,
        msg: e.message
      })
    })
})


module.exports = router;
