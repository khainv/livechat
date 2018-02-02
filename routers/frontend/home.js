var express = require('express');
var bodyParser = require("body-parser");
var router = express.Router();
var app=express();
var mongoose=require('mongoose');
var session = require('express-session');
app.use(bodyParser.json());
router.get('/',function (req, res) {
    console.log('home');
    res.send('live chat home');
});
module.exports = router;
