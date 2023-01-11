//Protector js, which prevents a non-user from creating a post
module.exports = {
    isLoggedIn : function(req, res, next){
        if(req.session.username){
            next();
        }else{
            req.flash("error", "You must be logged in to post");
            req.session.save(function(saveError){
            res.redirect('/login');
            })

        }
    }
}