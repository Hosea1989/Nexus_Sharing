var express = require('express');
var router = express.Router();
const db = require('../conf/database');
const bcrypt = require('bcrypt');
const UserError = require('../helpers/error/UserError')
const {request} = require("express");



//METHOD : POST
//localhost:3333/users/register
router.post("/register",
    function(req,res, next){
const {username, email, password} = req.body;

//server side validation


//check for duplicates
    db.query('select id from users where username=?', [username])
        .then (function([results, fields]){
            if(results && results.length == 0) {
                return db.execute('select id from users where email=?', [email])
            }else{
                throw new Error('username already exist')
            }
        }).then(function([results, fields]) {
        if (results && results.length == 0) {
           return bcrypt.hash(password, 2 );
        } else {
            throw new Error('email already exist');
        }
    }).then(function(hashedPasswords){
        return db.execute('insert into users (username, email, password) value (?,?,?)',
            [username, email, hashedPasswords])
    })
        .then(function([results, fields]){
            if(results && results.affectedRows === 1){

                req.flash(`success`, `You're account have been created`);
                req.flash(`message`, `Success!!`);
                res.redirect('/login');
            }else{
                throw new Error('user could not be made ');

            }
        }).catch(function(err){
            res.redirect('/registration');
    })
//insert into db
//respond

});

//METHOD : POST
//localhost:3333/users/login
router.post("/login",
    function(req,res,next){
const {username, password} = req.body;

let loggedUserid;
let loggedUsername;

db.query('select id, username, password from users where username=?', [username])
    .then(function([results, fields]){
        if(results && results.length == 1){
            loggedUserid = results[0].id;
            loggedUsername = results[0].username;
           let dbpassword = results[0].password;
           return bcrypt.compare(password, dbpassword)
        }else{
            throw new UserError('Failed Login: Invalid user credentials', "/login", 200);
        }
    })
    .then(function(passwordsMatched){
        if(passwordsMatched){
            req.session.userid = loggedUserid;
            req.session.username = loggedUsername;
            req.flash(`success`, `Hi! ${loggedUsername}, you are now logged in`);
            req.session.save(function(saveError){
                res.redirect('/');
            })
        }else{
            throw new UserError('Failed Login: Invalid user credentials', "/login", 200);
        }
    })
    .catch(function(err){
        if(err instanceof UserError){
            req.flash("error", err.getMessage());
            req.session.save(function(saveErr){
            res.redirect(err.getRedirectURL());
            })
        }else{
            next(err);
        }
    })

});

//METHOD : POST
//localhost:3333/logout
router.post("/logout", function(req, res){

    req.session.destroy(function (destroyError) {
        if (destroyError) {
            req.flash(`success`, `Hi! ${loggedUsername}, you are now logged in`);
            next(err);
        } else {
            res.json({
                status: 200,
                message: "you have been logged out"
            });

        }
    })

})



module.exports = router;
