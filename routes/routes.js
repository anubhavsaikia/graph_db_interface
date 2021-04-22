const path = require('path');
const express = require('express');
const con = require('../controllers');
const router = express.Router();

// login page
router.get('/login', con.login.get_login);
router.post('/login', con.login.login);
router.post('/sign_up', con.login.sign_up);
//

// home page
router.get('/home', con.home.get_home);
router.post('/friend', con.home.post_search_friend);
router.post('/follow', con.home.post_follow_toggle);
// 

// recommendations page
router.get('/recs', con.recs.get_recs);
router.post('/submit', con.recs.post_submit);
router.post('/get_recs', con.recs.post_get_more);
// 

// movie details
router.get('/movie', con.movie.get_movie);
router.post('/movie_search', con.movie.post_search);
router.post('/movie_rate', con.movie.post_rate);
// 

router.get('/logout', con.logout.get_logout);

// // recommendations page function mappings
// router.get('/recs', con.recs.get_recommendations);
// router.post('/recs', con.recs.post_data);
// router.post('/logout',con.recs.logout);
//

// // admin login page function mappings
// router.get('/admin_login', con.admin_login.get_test);
// router.post('/admin_login', con.admin_login.login);
// //

// // admin page function mappings
// router.get('/admin_page', con.admin_page.get_test);
// router.post('/admin_logout',con.admin_page.logout)
// //

module.exports = router;
