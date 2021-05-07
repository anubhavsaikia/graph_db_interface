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
    var preferences = req.body;
    console.log(Object.keys(preferences));
    for (var key of Object.keys(preferences)) {
        console.log(key + " -> " + preferences[key])
    }
    console.log(asdfaskdfa);
    const userid = req.session.user;
    const start_id = req.session.start_id;
    const rec_size = req.session.rec_size;
    const rec_obj = new db.Recommend(userid);
    const movies = req.session.all_recs[start_id, start_id + rec_size];
    rec_obj.remove_recommendations(movies)
    .then(res => {
        var liked_movies = [];
        var disliked_movies = [];
        rec_obj.update_recommendations(liked_movies, disliked_movies)
        .then(res =>{
            res2.redirect("/home/?username="+userid);
        })
    })
}


exports.post_get_more = (req,res2,next) =>{
    // update_recs
    const all_reccos = req.session.all_reccos;
    const old_start_id = req.body.start_id;
    req.body.start_id = old_start_id+10;
    var preferences = req.body;
    recs.Recs.update_recs(req.session.user, preferences)
        .then(res =>{
            res2.render('recs', {
                pageTitle: 'All Recommendations',
                path: '/recs/?username='+req.session.user,
                listnames: all_reccos,
                username: req.session.user,
                start_id: old_start_id+10
            });
        })
}