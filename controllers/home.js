const db = require('../models/movie');

exports.get_home = (req,res2,next) => {
    // get_history ???
    // get_followers, get_following
    // get_all_users
    console.log("get_home*************************************");
    console.log(req.query.queryuser);
    if(req.query.queryuser){
        console.log("queryuser");
    }
    if(req.session.user){
        const home_obj = new db.User(req.session.user);
        home_obj.get_all_users()
            .then(res =>{
                const users_list = res.records;
                req.session.users_list = users_list;
                console.log(users_list[0]._fields);
                console.log("userlist");
                home_obj.fetch_info()
                    .then(res =>{
                        const user_info = res.records[0];  //
                        console.log(user_info)
                        home_obj.get_liked_movies()
                            .then(res =>{
                                const liked_movies = res.records[0];
                                req.session.liked_movies = liked_movies;
                                console.log(liked_movies);
                                home_obj.get_disliked_movies()
                                    .then(res =>{
                                        const disliked_movies = res.records[0];
                                        req.session.disliked_movies = disliked_movies;
                                        console.log(disliked_movies);
                                        home_obj.get_followers()
                                            .then(res =>{
                                                const followers_list = res.records[0];
                                                req.session.followers_list = followers_list;
                                                console.log(followers_list);
                                                home_obj.get_following()
                                                    .then(res =>{
                                                        const following_list = res.records[0];
                                                        req.session.following_list = following_list;
                                                        console.log(following_list);
                                                        res2.render('home', {
                                                            pageTitle: 'Home Page',
                                                            path: '/home/?username='+req.session.user,
                                                            username: req.session.user,
                                                            liked_movies: liked_movies,
                                                            disliked_movies: disliked_movies,
                                                            users_list: users_list,
                                                            followers_list: followers_list,
                                                            following_list: following_list,
                                                            friend_data: undefined,
                                                            is_following: undefined
                                                        });
                                                    })
                                            })
                                    })
                            })
                    })
            })
        
    }
    else{
        console.log("log in first");
        res2.redirect('/login');
    }
};

exports.post_search_friend = (req,res2,next) => {
    // fetch_info
    // is_following
    console.log("post_search_friend");
    const friend_obj = new db.Friends(req.session.user);
    const friend_id = req.body.search_username;
    const userid = req.session.user;
    console.log(friend_id);
    friend_obj.fetch_info(friend_id)
        .then(res =>{
            const friend_data = res.records[0];
            console.log(friend_data)
            friend_obj.is_following(friend_id)
                .then(res =>{
                        const is_following = res.records[0]._fields[0];
                        console.log(is_following);
                        res2.redirect('/home/?username='+req.session.user+'&?queryuser='+friend_id);
                        // res2.render('home', {
                        //     pageTitle: 'Home Page',
                        //     path: '/home/?username='+req.session.user,
                        //     username: req.session.user,
                        //     users_list: req.session.users_list,
                        //     followers_list: req.session.followers_list,
                        //     following_list: req.session.following_list,
                        //     liked_movies: req.session.liked_movies,
                        //     disliked_movies: req.session.disliked_movies,
                        //     friend_data: friend_data,
                        //     is_following: is_following
                        // });
                    })
        })
};

exports.post_follow_toggle = (req,res2,next) => {
    // follow
    // unfollow
    const friend_obj = new db.Friends(req.session.user);
    const friend_id = req.body.search_username;
    console.log(friend_id);
    const f_action = req.body.f_action;
    if(f_action=="follow"){
        friend_obj.follow(friend_id)
            .then(res =>{
                console.log("followed");
                friend_obj.fetch_info(friend_id)
                    .then(res =>{
                        const friend_data = res.records[0];
                        console.log(friend_data);
                        const user_obj = new db.User(userid);
                        user_obj.get_following()
                            .then(res =>{
                                const following_list = res.records[0];
                                console.log(following_list);
                                req.session.following_list = following_list;
                                res2.render('home', {
                                    pageTitle: 'Home Page',
                                    path: '/home/?username='+req.session.user,
                                    username: req.session.user,
                                    users_list: req.session.users_list,
                                    followers_list: req.session.followers_list,
                                    following_list: req.session.following_list,
                                    liked_movies: req.session.liked_movies,
                                    disliked_movies: req.session.disliked_movies,
                                    friend_data: friend_data,
                                    is_following: true
                                })
                            })
                    })
            })
    }
    else{
        friend_obj.unfollow(friend_id)
            .then(res =>{
                console.log("unfollowed");
                friend_obj.fetch_info(friend_id)
                    .then(res =>{
                        const friend_data = res.records[0];
                        console.log(friend_data);
                        const user_obj = new db.User(userid);
                        user_obj.get_following()
                            .then(res =>{
                                const following_list = res.records[0];
                                console.log(following_list);
                                req.session.following_list = following_list;
                                res2.render('home', {
                                    pageTitle: 'Home Page',
                                    path: '/home/?username='+req.session.user,
                                    username: req.session.user,
                                    users_list: req.session.users_list,
                                    followers_list: req.session.followers_list,
                                    following_list: req.session.following_list,
                                    liked_movies: req.session.liked_movies,
                                    disliked_movies: req.session.disliked_movies,
                                    friend_data: friend_data,
                                    is_following: false
                                })
                            })
                    })
            })
    }

};



