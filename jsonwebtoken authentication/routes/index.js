var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    console.log("inside home");
    res.render('layout', { title: 'Auth0 Webapp sample Nodejs' });
});
module.exports = router;