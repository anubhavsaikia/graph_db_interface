// const db = require('../models/movie');

exports.get_logout = (req,res,next) => {
    console.log("get_logout");
    req.session.user = undefined;
    req.session.user_list = undefined;
    req.session.liked_movies = undefined;
    req.session.disliked_movies = undefined;
    req.session.followers_list = undefined;
    req.session.following_list = undefined;
    res.redirect('/login');
    
};