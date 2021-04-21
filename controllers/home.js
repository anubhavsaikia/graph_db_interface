const home = require('../models/movie');

exports.get_home = (req,res2,next) => {
    // get_history ???
    // get_followers, get_following
    // get_all_users

    home.Home.get_history(req.session.user)
        .then(res =>{
            const history = res.rows;
            home.Home.get_all_users()
                .then(res =>{
                    const users_list = res.rows;
                    home.Home.get_followers(req.session.user)
                        .then(res =>{
                            const followers_list = res.rows;
                            home.Home.get_following(req.session.user)
                                .then(res =>{
                                    const following_list = res.rows;
                                    res2.render('home', {
                                        pageTitle: 'Home Page',
                                        path: '/home/?username='+username,
                                        username: req.session.user,
                                        history: history,
                                        users_list: users_list,
                                        followers_list: followers_list,
                                        following_list: following_list
                                    });
                                })
                        })
                })
        })
};

exports.post_search_friend = (req,res2,next) => {
    // fetch_info
    // is_following
    const friend_id = req.body.search_id;
    const userid = req.session.user;
    console.log(friend_id);
    home.Home.fetch_info(friend_id, userid)
        .then(res =>{
            const friend_data = req.rows;
            home.Home.is_following(friend_id, userid)
                .then(res =>{
                        const is_following = req.rows;
                        res2.render('home', {
                            pageTitle: 'Home Page',
                            path: '/home/?username='+username,
                            username: req.session.user,
                            history: history,
                            users_list: users_list,
                            followers_list: followers_list,
                            following_list: following_list,      //???
                            friend_data: friend_data
                        });
                    })
        })
};

exports.post_follow_toggle = (req,res2,next) => {
    // follow
    // unfollow
    const userid = req.session.user;
    const friend_id = req.body.friend_id;
    console.log(friend_id);
    const f_action = req.body.f_action;
    if(f_action=="follow"){
        home.Home.follow(userid, friend_id)
            .then(res =>{
                console.log("followed");
                res2.render('home', {
                    pageTitle: 'Home Page',
                    path: '/home/?username='+username,
                    username: req.session.user,
                    history: history,
                    users_list: users_list,
                    followers_list: followers_list,
                    following_list: following_list,      //???
                    friend_data: undefined
                });
            })
    }
    else{
        home.Home.unfollow(userid, friend_id)
            .then(res =>{
                console.log("unfollowed");
                res2.render('home', {
                    pageTitle: 'Home Page',
                    path: '/home/?username='+username,
                    username: req.session.user,
                    history: history,
                    users_list: users_list,
                    followers_list: followers_list,
                    following_list: following_list,      //???
                    friend_data: undefined
                });
            })
    }

};



