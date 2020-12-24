var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    console.log("inside welcome");
    res.render('welcome', { title: 'Auth0 Webapp sample Nodejs' });
});

module.exports = router;