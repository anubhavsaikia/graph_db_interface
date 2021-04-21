const login = require('../models/movie');

exports.get_login = (req,res,next) => {

    res.render('login', {
        pageTitle: 'Login or Sign Up',
        path: '/login',
        error: req.query.error
    });
};

exports.sign_up = (req,res2,next) => {

    const username = req.body.username;
    const password = req.body.password;
    const age = req.body.age;
    console.log(username);
    console.log(password);
    console.log(age);
    const user_signup = new login.sign_up(username, password);
    const ret = user_signup.check_uniqueness()
        .then(res => {
            if(res.rows.length==0){
                user_signup.add_user()
                    .then(res => {
                        req.session.user = username;
                        console.log("added user to db");
                        res2.redirect('/home/?username='+username);
                    })
            }
            else{
                res2.redirect('/login/?error=2');
            }
        })
    // check_uniqueness, add_user
};

exports.login = (req,res2,next) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username);
    console.log(password);
    // verify_login
    const user_login = new login.login(username, password);
    const ret = user_login.verify_login()
        .then(res => {
            if(res.rows.length==0){
                req.session.user = username;
                console.log("user login successful");
                res2.redirect('/home/?username='+username);
            }
            else{
                res2.redirect('/login/?error=1');
            }
        })

};



