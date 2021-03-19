const Admin_login = require('../models/admin_login');

exports.get_test = (req,res,next) => {

    
    res.render('admin_login', {
        pageTitle: 'Admin Login',
        path: '/admin_login',
        error: req.query.error


    });
};

exports.login = (req,res,next) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username);
    console.log(password);
    if((username=="Anubhav" || username=="Utkarsh" || username=="Rhushabh" || username=="Arjun") && password == "graph")
    {
        req.session.admin_user=username;
        res.redirect('/admin_page/?username='+username);
    }
    else 
    {
        res.redirect('/admin_login/?error=1');
    } 
    

};

