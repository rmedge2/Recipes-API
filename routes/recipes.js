var express = require('express');
var router = express.Router();
const fs = require('fs');

/* GET recipes listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
