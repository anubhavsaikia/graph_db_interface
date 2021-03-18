const login = require('../models/login');

exports.get_test = (req,res,next) => {

    
    res.render('login', {
        pageTitle: 'Login or Sign Up',
        path: '/login',
        error: req.query.error


    });
};

exports.post_test = (req,res,next) => {
    const username = req.body.username;
    const password = req.body.password;
    const action = req.body.action;
    console.log(username);
    console.log(password);
    console.log(action);
    if((username=="Anubhav" || username=="Utkarsh" || username=="Rhushabh" || username=="Arjun") && password == "graph")
    {
        res.redirect('/recs');
    }
    else if(action=="login")
    {
        res.redirect('/login/?error=1');
    }
    else if(action=="signup")
    {
        res.redirect('/login/?error=2');
    }
    else 
    {
        res.redirect('/login/?error=0');
    } 
    

};

