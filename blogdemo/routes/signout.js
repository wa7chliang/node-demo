var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  // 清空session中用户信息
  req.session.user = null
  return res.redirect('/')
  // res.render('index', { title: 'express', state: ''})
});


module.exports = router;