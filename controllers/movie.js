const db = require('../models/movie');

exports.get_movie = (req,res2,next) => {
    // get_all_movies

    console.log("search movie");
    const movie_obj =  new db.Movie(req.query.movieid);
    
    movie_obj.get_all_movies()
    .then(res => {
        const movie_list = res.records;
        // req.session.movie_list = movie_list;
        console.log(movie_list[0]._fields);
        console.log("movielist");
        if (req.session.user){
            req.session.is_logged_in = true;
            res2.render('movie', {
                pageTitle: 'Movie Data',
                path: '/movie',
                movie_list: movie_list,
                username: req.session.user,
                is_logged_in: req.session.is_logged_in,
                movie_data: false
            });
        } else{
            req.session.is_logged_in = false;
            res2.render('movie', {
                pageTitle: 'Movie Data',
                path: '/movie',
                movie_list: movie_list,
                username: req.session.user,
                is_logged_in: req.session.is_logged_in,
                movie_data: false
            });
        }
    })
    
    
};

exports.post_search = (req,res2,next) => {
    // fetch_movie
    // get_rating
    console.log("post_search_movie");
    const imdb_id = req.body.search_movieid;
    const userid = req.session.user;
    const movie_obj = new db.Movie(imdb_id);
    const user_obj = new db.User(userid);
    // console.log(req.body.movie)

    req.session.movie_id = imdb_id;
    console.log(imdb_id);

    movie_obj.fetch_movie()
    .then(res => {
        const movie_data = res.records;
        // req.session.movie_id = imdb_id;
        req.session.movie_data = movie_data;
        console.log(movie_data);
        movie_obj.get_all_movies()
        .then(res => {
            const movie_list = res.records;
            console.log(movie_list[0]._fields);
            console.log("movielist");
                
            if (req.session.user){
                user_obj.get_rating(imdb_id)
                .then(res => {
                    const user_rating = res.records[0];
                    console.log(user_rating);
                    res2.render('movie', {
                        pageTitle: 'Movie Data',
                        path: '/movie/?movie_id='+imdb_id,
                        movie_data: req.session.movie_data,
                        user_rating: user_rating,
                        movie_list: movie_list,
                        username: req.session.user,
                        is_logged_in: req.session.is_logged_in
                    });
                })
            } else{
                res2.render('movie', {
                    pageTitle: 'Movie Data',
                    path: '/movie/?movie_id='+imdb_id,
                    movie_data: req.session.movie_data,
                    user_rating: false,
                    movie_list: movie_list,
                    username: req.session.user,
                    is_logged_in: req.session.is_logged_in
                });
            }
        })
    })
};

exports.post_rate = (req,res2,next) => {
    // update_rating
    const imdb_id = req.session.movie_id;
    var rating = 1;
    if (req.body.rate == "dislike"){
        rating = 0;
    }
    const userid = req.session.user;
    console.log(imdb_id);
    console.log(rating);
    const user_obj = new db.User(userid);
    const movie_obj = new db.Movie(imdb_id);
    
    user_obj.remove_rating(imdb_id)
    .then(res => {
        user_obj.update_rating(imdb_id, rating)
        .then(res => {
            const out = res.records;
            console.log(out);
            user_obj.get_rating(imdb_id)
            .then(res => {
                const user_rating = res.records[0];
                console.log(user_rating);
                movie_obj.get_all_movies()
                .then(res => {
                    const movie_list = res.records;
                    console.log(movie_list[0]._fields);
                    console.log("movielist");

                    res2.render('movie', {
                        pageTitle: 'Movie Data',
                        path: '/movie/?movie_id='+imdb_id,
                        movie_data: req.session.movie_data,
                        user_rating: user_rating,
                        movie_list: movie_list,
                        username: req.session.user,
                        is_logged_in: req.session.is_logged_in
                    });
                })
            })
        })
    })
};

