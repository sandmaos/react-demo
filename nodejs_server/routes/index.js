var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const data = {
    pageTitle: 'Express Pug Example',
    fruits: ['Apple', 'Banana', 'Orange']
  };
  //render .pug file in views
  res.render('index', { data });
  // res.send('<p>HTML Data</p>');
});

module.exports = router;
