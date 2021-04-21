const movies = require('../models/movie');

exports.get_movie = (req,res2,next) => {
    // get_all_movies

    movies.Movie.get_all_movies()
        .then(res => {
            const movie_list = res.rows;
            res2.render('movie', {
                pageTitle: 'Movie Data',
                path: '/movie',
                movies_list: movie_list
            });
        })
    
};

exports.post_search = (req,res2,next) => {
    // fetch_movie
    // get_rating
    const imdb_id = req.body.movie_id;
    req.session.movie_id = imdb_id;
    const userid = req.session.user;
    console.log(imdb_id);

    movies.Movie.fetch_movie(imdb_id, userid)
        .then(res => {
            const movie_data = res.rows;
            req.session.movie_id = imdb_id;
            req.session.movie_data = movie_data;
            movies.Movie.get_rating(imdb_id, userid)
                .then(res => {
                    const user_rating = res.rows;
                    res2.render('movie', {
                        pageTitle: 'Movie Data',
                        path: '/movie/?movie_id='+imdb_id,
                        movie_data: movie_data,
                        user_rating: user_rating
                    });
                })
        })
};

exports.post_rate = (req,res2,next) => {
    // update_rating
    const imdb_id = req.session.movie_id;
    const rating = req.body.new_rating;
    const userid = req.session.user;
    const movie_data = req.session.movie_id;
    console.log(imdb_id);
    console.log(rating);
    
    movies.Movie.update_rating(imdb_id, userid, rating)
        .then(res => {
            res2.render('movie', {
                pageTitle: 'Movie Data',
                path: '/movie/?movie_id='+imdb_id,
                movie_data: movie_data,
                user_rating: rating
            });
        })
};

