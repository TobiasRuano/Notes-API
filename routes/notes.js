var express = require('express');
var router = express.Router();

/* GET notes listing. */
router.get('/', function(req, res, next) {
  res.send('Llegaste al router de Notes directo');
});

module.exports = router;
