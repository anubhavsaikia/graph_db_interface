const db = require('../models/movie');

exports.get_movie = (req,res2,next) => {
    // get_all_movies

    console.log("search movie");
    const movie_obj =  new db.Movie(req.query.movieid);
    movie_obj.get_all_movies()
        .then(res => {
            const movie_list = res.records;
            req.session.movie_list = movie_list;
            console.log(movie_list[0]._fields);
            console.log("movielist");
            if (req.session.user){
                res2.render('movie', {
                    pageTitle: 'Movie Data',
                    path: '/movie',
                    movie_list: movie_list,
                    username: req.session.user,
                    is_logged_in: true
                });
            } else{
                res2.render('movie', {
                    pageTitle: 'Movie Data',
                    path: '/movie',
                    movie_list: movie_list,
                    username: req.session.user,
                    is_logged_in: false
                });
            }
        })
    
};

exports.post_search = (req,res2,next) => {
    // fetch_movie
    // get_rating
    console.log("post_search_movie");
    const movie_obj = new db.Movie(req.body.search_moviename);
    console.log(req.body.movie)

    const imdb_id = req.body.movie_id;
    req.session.movie_id = imdb_id;
    const userid = req.session.user;
    console.log(imdb_id);

    db.Movie.fetch_movie(imdb_id, userid)
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

// <% if(is_logged_in == true){ %>
//     <h3>MovieID : <%= qmovie[0]._fields[0].properties.movieid %></h3> 
//     <h3>Title : <%= qmovie[0]._fields[0].properties.title %></h3> 
//     <h3>Year : <%= qmovie[0]._fields[0].properties.year %></h3> 
// <% };%>
// <% if(is_logged_in == false){ %>
//     <h3>Can't Rate</h3> 
//     <h3>MovieID : <%= qmovie[0]._fields[0].properties.movieid %></h3> 
//     <h3>Title : <%= qmovie[0]._fields[0].properties.title %></h3> 
//     <h3>Year : <%= qmovie[0]._fields[0].properties.year %></h3> 
// <% };%>

exports.post_rate = (req,res2,next) => {
    // update_rating
    const imdb_id = req.session.movie_id;
    const rating = req.body.new_rating;
    const userid = req.session.user;
    const movie_data = req.session.movie_id;
    console.log(imdb_id);
    console.log(rating);
    
    db.Movie.update_rating(imdb_id, userid, rating)
        .then(res => {
            res2.render('movie', {
                pageTitle: 'Movie Data',
                path: '/movie/?movie_id='+imdb_id,
                movie_data: movie_data,
                user_rating: rating
            });
        })
};

