var express = require('express');
var router = express.Router();
var userModel = require('../lib/mysqlc')


/* GET home page. */
router.get('/', function(req, res, next) {
  var state = ''
  let page = req.query.page || ''
  let list = ''
  let count = 0
  if(req.session.user) {
    state = req.session.user
    let obj = {}
    obj.page = page || 1
    userModel.findDataByArticle(obj)
      .then(result => {
        if(result) {
          list = result
          userModel.findCountByArticle()
            .then(result2 => {
              count = result2[0].listCount
              return res.render('index', { title: 'express', state: state, list: list, count: count })
            })
        } else {
          throw new Error('没有信息了')
        }
      }).catch(e => {
        list = []
        return res.render('index', { title: 'express', state: state, list: list, count: count })        
      })
  } else {
    return res.render('index', { title: 'express', state: state, list: list, count: count })
  }
})

module.exports = router;
