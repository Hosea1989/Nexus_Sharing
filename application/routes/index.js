var express = require('express');
const {isLoggedIn} = require('../middleware/protectors');
var router = express.Router();
const {getRecentPosts, getPostById, getCommentForPostById} = require('../middleware/posts');

/* GET home page. */
//METHOD : Get
//localhost:3333/
router.get("/", getRecentPosts ,function(req, res,next){
  res.render('index',{js:["index.js"], css:["indexStyle.css"]})
})

//METHOD : Get
//localhost:3333/login
router.get("/login",function(req, res, next) {
  res.render('login', {css:["loginStyle.css"]})
})

//METHOD : Get
//localhost:3333/post
router.get("/post",isLoggedIn, function(req, res, next) {
  res.render('post', {css:["createpostStyle.css"]})
})

//METHOD : Get
//localhost:3333/registration
router.get("/registration", function(req, res, next){
  res.render('registration',{js:["Registration.js"], css:["registrationStyle.css"]})
})

//METHOD : Get
//localhost:3333/posts/id(\\d+)
router.get( "/posts/:id(\\d+)",getPostById, getCommentForPostById, function(req, res){
  res.render('viewpost', {css:["viewPostStyle.css"], js:["viewPost.js"]})
})

module.exports = router;
