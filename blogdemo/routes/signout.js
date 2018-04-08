var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  // 清空session中用户信息
  req.session.user = null
  res.json({
    state: 1,
    msg: ''
  })
});


module.exports = router;