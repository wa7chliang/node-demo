var express = require('express');
var router = express.Router();
var userModel = require('../lib/mysqlc')

router.get('/:username', function (req, res, next) {
  let page = req.query.page || ''
  let count = 0
  let list  = ''
  let obj = {}
  obj.page = page || 1
  obj.username = req.params.username

  userModel.findUsernameByArticle(obj)
    .then(result => {
      if (result) {
        list = result
        userModel.findCountByAricleWhereUsername(obj)
          .then(result2 => {
            count = result2[0].listCount
            return res.render('personlist', {username: obj.username, list: list, count: count})                
          }).catch(e2 => {
            return res.render('personlist', {username: obj.username, list: list, count: count})            
          })
      } else {
        throw new Error('没有信息了')
      }
    }).catch(e => {
      list = ''
      return res.render('personlist', {username: obj.username, list: list, count: count})      
    })
})

module.exports = router
