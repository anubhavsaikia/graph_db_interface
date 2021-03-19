const Admin_class = require('../models/admin_page');

exports.get_test = (req,res,next) => {

    if(req.session.admin_user)
    {
        res.render('admin_page', {
            pageTitle: 'Admin Page',
            path: '/admin_page',
            admin_user: req.session.admin_user


        });
    }
    else 
    {
        res.redirect('/admin_login');
    }
};

exports.post_test = (req,res,next) => {
    

};

exports.logout = (req,res,next) => {
    
    req.session.admin_user = undefined;
    res.redirect('/admin_login');
};

