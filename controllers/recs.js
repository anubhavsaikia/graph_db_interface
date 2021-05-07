const db = require('../models/movie');


exports.get_recs = (req, res2, next) => {
    // get_recommendations
    console.log("get recs")
    const recs_obj = new db.Recommend(req.session.user);
    if (req.session.user){
        recs_obj.get_recommendations(40)
        .then(res =>{
            const all_recs = res.records;
            console.log("recs list");
            req.session.all_recs = all_recs;
            // console.log(all_recs[0]._fields);
            req.session.rec_size = 10;
            req.session.start_id = 0;
            console.log("render recs");
            console.log(req.session.start_id);
            res2.render('recs', {
                pageTitle: 'Recommendations',
                path: '/recs/?username='+req.session.user,
                all_recs: req.session.all_recs,
                username: req.session.user,
                start_id: req.session.start_id,
                rec_size: req.session.rec_size
            });
        })
    } else{
        console.log("log in first");
        res2.redirect('/login');
    }
};

exports.post_submit = (req, res2, next) => {
    // update_recs
    const userid = req.session.user;
    const start_id = req.session.start_id;
    const rec_size = req.session.rec_size;
    const all_recs = req.session.all_recs;
    const rec_obj = new db.Recommend(userid);

    var movies = [];
    var liked_movies = [];
    var disliked_movies = [];
    var preferences = req.body;
    for (var key of Object.keys(preferences)) {
        // console.log(key + " -> " + preferences[key]);
        if (preferences[key]=='1'){
            liked_movies.push(key);
        } else{
            disliked_movies.push(key);
        }
    }
    for (let i = start_id; i < start_id + rec_size; i++) {
        movies.push(all_recs[i]._fields[0].properties.movieid);
    }

    rec_obj.remove_recommendations(movies)
    .then(res => {
        rec_obj.update_recommendations(liked_movies, disliked_movies)
        .then(res =>{
            console.log(req.session.start_id);
            res2.redirect("/home/?username="+userid);
        })
    })
}


exports.post_get_more = (req,res2,next) =>{
    // update_recs
    const userid = req.session.user;
    const start_id = req.session.start_id;
    const rec_size = req.session.rec_size;
    const all_recs = req.session.all_recs;
    const rec_obj = new db.Recommend(userid);

    var movies = [];
    var liked_movies = [];
    var disliked_movies = [];
    var preferences = req.body;
    for (var key of Object.keys(preferences)) {
        // console.log(key + " -> " + preferences[key]);
        if (preferences[key]=='1'){
            liked_movies.push(key);
        } else{
            disliked_movies.push(key);
        }
    }
    for (let i = start_id; i < start_id + rec_size; i++) {
        movies.push(all_recs[i]._fields[0].properties.movieid);
    }

    rec_obj.remove_recommendations(movies)
    .then(res => {
        rec_obj.update_recommendations(liked_movies, disliked_movies)
        .then(res =>{
            req.session.start_id = start_id + rec_size;
            console.log(req.session.start_id);
            res2.render('recs', {
                pageTitle: 'Recommendations',
                path: '/recs/?username='+req.session.user,
                all_recs: req.session.all_recs,
                username: req.session.user,
                start_id: req.session.start_id,
                rec_size: req.session.rec_size
            });
        })
    })
}