const recs = require('../models/movie');


exports.get_recs = (req, res2, next) => {
    // get_recommendations
    recs.Recs.get_recommendations(res.session.user)
        .then(res =>{
            if(req.session.user){
                const all_reccos = res.rows;
                res.session.all_recs = all_reccos;
                res2.render('recs', {
                    pageTitle: 'All Recommendations',
                    path: '/recs/?username='+req.session.user,
                    listnames: all_reccos,
                    username: req.session.user,
                    start_id: 0
                });
            }
            else{
                res.redirect('/login');
            }
        })
};

exports.post_submit = (req, res, next) => {
    // update_recs
    // ????????????????????????????????????
    var preferences = req.body;
    for (var key of Object.keys(preferences)) {
        console.log(key + " -> " + preferences[key])
    }
    res.redirect('/home/?username='+username);
    // res.redirect('/recs/?username='+req.session.user);
}


exports.post_get_more = (req,res,next) =>{
    // update_recs
    // get_more ????
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
