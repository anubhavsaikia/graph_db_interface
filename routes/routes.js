const path = require('path');
const express = require('express');

const routes = require('../controllers');

const router = express.Router();

// user login page function mappings
router.get('/login', routes.login.get_test);
router.post('/login', routes.login.login);
router.post('/sign_up', routes.login.sign_up);
//

// recommendations page function mappings
router.get('/recs', routes.recs.get_recommendations);
router.post('/recs', routes.recs.post_data);
router.post('/logout',routes.recs.logout);
//

// admin login page function mappings
router.get('/admin_login', routes.admin_login.get_test);
router.post('/admin_login', routes.admin_login.login);
//

// admin page function mappings
router.get('/admin_page', routes.admin_page.get_test);
router.post('/admin_logout',routes.admin_page.logout)
//

module.exports = router;
