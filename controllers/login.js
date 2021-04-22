const db = require('../models/movie');

exports.get_login = (req,res,next) => {
    console.log("get_login");
    if(req.session.user){
        res.redirect('/home/?username='+req.session.user);
    }
    else{
        res.render('login', {
            pageTitle: 'Login or Sign Up',
            path: '/login',
            error: req.query.error
        });
    }
    
};

exports.sign_up = (req,res2,next) => {

    const username = req.body.username;
    const password = req.body.password;
    const age = req.body.age;
    const gender = req.body.gender;
    const name = req.body.name;
    console.log(username);
    console.log(password);
    console.log(age);
    console.log(gender);
    const user_signup = new db.Login(username, name, password, age, gender);
    user_signup.check_uniqueness()
        .then(res => {
            console.log(res);
            if(res.rows){       //check this
                user_signup.add_user()
                    .then(res => {
                        req.session.user = username;
                        console.log("added user to db");
                        res2.redirect('/home/?username='+username);
                    })
            }
            else{
                res2.redirect('/login/?error=2');
                console.log("username taken");
            }
        })
    // check_uniqueness, add_user
};

exports.login = (req,res2,next) => {
    console.log("login");
    // console.log(req);
    // console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;
    console.log(username);
    console.log(password);
    // verify_login
    const user_login = new db.Login(username, undefined, password, undefined, undefined);
    user_login.verify_login()
        .then(res => {
            if(res.rows){       //check
                req.session.user = username;
                console.log("user login successful");
                res2.redirect('/home/?username='+username);
            }
            else{
                res2.redirect('/login/?error=1');
                console.log("incorrect password/username");
            }
        })

};



