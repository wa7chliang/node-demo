var express = require('express');
var router = express.Router();
var userModel = require('../lib/mysqlc')

router.post('/', function (req, res, next) {
  let d = new Date()  
  let obj = {
    content: req.body.content,
    username: req.session.user.username,
    postid: req.body.postid,
    moment: d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + (d.getMinutes()<10?'0'+d.getMinutes():d.getMinutes()) + ':' + (d.getSeconds()<10?'0'+d.getSeconds():d.getSeconds()),  
    comments: req.body.comments
  }
  try {
    if(obj.length == 0) {
      throw new Error('评论内容不能为空')      
    } else {
      userModel.addComment(obj)
      .then(result => {
        if(result.affectedRows !== 0) {
          userModel.UpdateCommentAndMoment(obj)
          res.json({
            state: 1,
            msg: '',
            content: result
          })
          return
        }
      }).catch(e2 => {
        res.json({
          state: 0,
          msg: e2.message
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


module.exports = router