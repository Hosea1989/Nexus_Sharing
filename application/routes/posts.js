const express = require('express');
const router = express.Router();

const db = require('../conf/database');
const multer = require('multer');
const sharp = require('sharp');
const {isLoggedIn} = require("../middleware/protectors");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/image/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1E9)}`)
    }
})

const upload = multer({ storage: storage })

router.post("/create",isLoggedIn ,upload.single("uploadImage"),
    function(req,res,next){
   let uploadedFile = req.file.path;
   let thumbnailName = `thumbnail-${req.file.filename}`;
   let destinationOfThumbnail = `${req.file.destination}/${thumbnailName}`;
   const {title, description} = req.body;
   const userID = req.session.userid;

   sharp(uploadedFile)
       .resize(200)
       .toFile(destinationOfThumbnail)
       .then(function(){
           let baseSQL = `INSERT INTO posts (title, description, image, thumbnail, fk_authorid) VALUE(?,?,?,?,?)`

           return db.query(baseSQL, [title, description,uploadedFile,destinationOfThumbnail,userID])
       })
       .then(function([results, fields]){
           if(results && results.affectedRows){
               req.flash("success", "Your post has been created!")
               req.session.save(function(saveErr){
                   res.redirect('/')
               })
           }
       })
       .catch(err => next(err))


    });

router.get('/search', function(req, res, next){
    let searchText = `%${req.query.searchText}%`;
    let originalSearchTerm = req.query.searchText;
    let baseSQL = `SELECT 
    id, title, thumbnail, concat_ws(" ", title) as haystack
    FROM posts
    HAVING haystack like ?;`
    db.execute(baseSQL,[searchText])
        .then(function([results, fields]){
            res.locals.results = results;
            res.locals.searchValue = originalSearchTerm;
            req.flash('success', `${results.length} results found`);
            req.session.save(function (saveErr){
                res.render('index');
            })
        })

    // console.log(searchText);
    // res.render('index');
});

module.exports = router;


