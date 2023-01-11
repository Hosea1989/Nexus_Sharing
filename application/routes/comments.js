const express = require('express');
const router = express.Router();
const db = require('../conf/database');


router.post('/create', function(req,res, next){

    if(!req.session.userid){
        res.json({
            status: "error",
            message: "you must be logged in"
        });
    } else {
        const {comment,postId} = req.body;
        // const {userId, username} = req.session;
        // const comment = req.body;
        // const postId = req.body;
        const userId = req.session.userid;
        const username = req.session.username;

        let baseSQL = `INSERT INTO comments (text, fk_authorid, fk_postid) VALUE(?,?,?);`
        return db.execute(baseSQL, [comment, userId, postId])
            .then(function([results, fields]){
                if(results && results.affectedRows===1){
                    res.json({
                        status: "success",
                        message: "Your comment was created",
                        data:{
                            comment : comment,
                            username : username,
                            commentId : results.insertId
                        }
                    })
                }else{
                    res.json({
                        status: "error",
                        message: "Comment could not be created"
                    })
                }
            }) .catch(err => next(err));

    }
    // console.log(req.body);
    // res.json(req.body);
})


module.exports = router