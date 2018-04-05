var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var state = ''
  if(req.session.user) {
    state = req.session.user.name
  }
  res.render('index', { title: 'express', state: state })
});

module.exports = router;
