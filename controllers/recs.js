const Recs = require('../models/recs');


exports.get_recommendations = (req, res, next) => {

    const all_products = Recs.get_all();
    if(req.session.user)
    {
        res.render('recs', {
            pageTitle: 'All Recommendations',
            path: '/recs',
            listnames: all_products,
            username: req.session.user
        });
    }
    else 
    {
        res.redirect('/login');
    }
};

exports.post_data = (req, res, next) => {
    
    var preferences = req.body;
    for (var key of Object.keys(preferences)) {
        console.log(key + " -> " + preferences[key])
    }
    res.redirect('/recs/?username='+req.session.user);
}

exports.logout = (req,res,next) =>{
    req.session.user = undefined;
    res.redirect('/login');
}
