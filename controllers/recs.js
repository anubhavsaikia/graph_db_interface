const Recs = require('../models/recs');


exports.get_recommendations = (req, res, next) => {

    const all_products = Recs.get_all();
    res.render('recs', {
        pageTitle: 'All Recommendations',
        path: '/recs',
        listnames: all_products
    });
};

exports.post_data = (req, res, next) => {
    
    var preferences = req.body;
    for (var key of Object.keys(preferences)) {
        console.log(key + " -> " + preferences[key])
    }
    res.redirect('/recs');
}
