const db = require('../models/movie');


exports.get_recs = (req, res2, next) => {
    // get_recommendations
    const recs_obj = new db.Recommend(req.session.user);
    if (req.session.user){
        recs_obj.get_recommendations(40)
        .then(res =>{
            const all_recs = res.records;
            res.session.all_recs = all_recs;
            req.session.rec_size = 10;
            console.log(all_recs[0]._fields);
            console.log("recs list");

            res2.render('recs', {
                pageTitle: 'Recommendations',
                path: '/recs/?username='+req.session.user,
                all_recs: req.session.all_recs,
                username: req.session.user,
                start_id: 0,
                rec_size: req.session.rec_size
            });
        })
    } else{
        console.log("log in first");
        res2.redirect('/login');
    }
};

exports.post_submit = (req, res, next) => {
    // update_recs
    var preferences = req.body;
    for (var key of Object.keys(preferences)) {
        console.log(key + " -> " + preferences[key])
    }
    res.redirect('/home/?username='+username);
    // res.redirect('/recs/?username='+req.session.user);
}


exports.post_get_more = (req,res,next) =>{
    // update_recs
    const all_reccos = res.session.all_reccos;
    const old_start_id = res.body.start_id;
    res.body.start_id = old_start_id+10;
    var preferences = req.body;
    recs.Recs.update_recs(res.session.user, preferences)
        .then(res =>{
            res.render('recs', {
                pageTitle: 'All Recommendations',
                path: '/recs/?username='+req.session.user,
                listnames: all_reccos,
                username: req.session.user,
                start_id: old_start_id+10
            });
        })
}














// exports.logout = (req,res,next) =>{
//     // update_recs
//     // get_more ????
//     req.session.user = undefined;
//     res.redirect('/login');
// }
