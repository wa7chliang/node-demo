var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var state = ''
  if(req.session.user) {
    state = req.session.user.username
  }

  // 利用异步解决promise产生的渲染小bug
  setTimeout(function () {
    return res.render('index', { title: 'express', state: state })
  },1)
})

module.exports = router;
