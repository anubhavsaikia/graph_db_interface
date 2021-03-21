const login = require('../models/login');

exports.get_test = (req,res,next) => {

    res.render('login', {
        pageTitle: 'Login or Sign Up',
        path: '/login',
        error: req.query.error


    });
};

exports.sign_up = (req,res,next) => {

    const username = req.body.username;
    const password = req.body.password;
    const age = req.body.age;
    console.log(username);
    console.log(password);
    console.log(age);
    res.redirect('/login/?error=2');

};

exports.login = (req,res,next) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username);
    console.log(password);
    
    if((username=="Anubhav" || username=="Utkarsh" || username=="Rhushabh" || username=="Arjun") && password == "graph")
    {
        req.session.user = username;
        res.redirect('/recs/?username='+username);
        
    }
    else
    {
        res.redirect('/login/?error=1');
    }
};



