var express = require('express');
var router = express.Router();
var userModel = require('../lib/mysqlc')

/* GET users listing. */
router.get('/', function(req, res, next) {
  return res.redirect('/writeposts')
})

router.get('/writeposts', function (req, res, next) {
  var state = ''
  if(req.session.user) {
    state = req.session.user
  }
  return res.render('writeposts', { state: state })
})

router.post('/writeposts', function (req, res, next) {
  const username = req.session.user.username
  const title = req.body.title
  const content = req.body.content

  try {
    if (title.length == 0) {
      throw new Error('标题不能为空')
    } else if (content.length == 0) {
      throw new Error('内容不能为空')
    } else {
      let d = new Date()
      let obj = {
        username: username,
        title: title,
        content: content,
        moment: d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + (d.getMinutes()<10?'0'+d.getMinutes():d.getMinutes()) + ':' + (d.getSeconds()<10?'0'+d.getSeconds():d.getSeconds())
      }
      userModel.writeDataByposts(obj)
        .then(result => {
          if(result.affectedRows !== 0) {
            res.json({
              state: 1,
              msg: '',
              content: result
            })
            return
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

// 查看文章详情
router.get('/article/:id', function (req, res, next) {
  let obj = {}
  obj.id = req.params.id
  var obj2 = {}
  obj2.id = req.params.id
  let page = req.query.page || 1
  let list = []
  userModel.findPostsById(obj)
    .then(result => {
      if(result[0]) {
        obj2.pv = parseInt(result[0].pv) + 1
        userModel.addDataByPv(obj2)
        userModel.findCommentByPostid({postid: req.params.id, page, page})
          .then(result2 => {
            list = result2
            return res.render('article', {content: result[0], err: '', list: list})         
          }).catch(e2 => {
            return res.render('article', {content: '', err: e.message, list: list})            
          })
      } else {
        throw new Error('404')
      }
    }).catch(e => {
      return res.render('article', {content: '', err: e.message, list: list})      
    })
})

module.exports = router