const path = require('path');
const express = require('express');

const routes = require('../controllers');

const router = express.Router();

// login page
router.get('/login', routes.login.get_login);
router.post('/login', routes.login.login);
router.post('/sign_up', routes.login.sign_up);
//

// home page
router.get('/home', routes.home.get_home);
router.post('/friend', routes.home.post_search_friend);
router.post('/follow', routes.home.post_follow_toggle);
// 

// recommendations page
router.get('/recs', routes.recs.get_recs);
router.post('/submit', routes.recs.post_submit);
router.post('/get_recs', routes.recs.post_get_more);
// 

// movie details
router.get('/movie', routes.movie.get_movie);
router.post('/movie_search', routes.movie.post_search);
router.post('/movie_rate', routes.movie.post_rate);
// 

// // recommendations page function mappings
// router.get('/recs', routes.recs.get_recommendations);
// router.post('/recs', routes.recs.post_data);
// router.post('/logout',routes.recs.logout);
//

// // admin login page function mappings
// router.get('/admin_login', routes.admin_login.get_test);
// router.post('/admin_login', routes.admin_login.login);
// //

// // admin page function mappings
// router.get('/admin_page', routes.admin_page.get_test);
// router.post('/admin_logout',routes.admin_page.logout)
// //

module.exports = router;
