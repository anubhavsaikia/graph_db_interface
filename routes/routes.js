const path = require('path');
const express = require('express');

const routes = require('../controllers');

const router = express.Router();


router.get('/login', routes.login.get_test);
router.post('/login', routes.login.post_test);

router.get('/recs', routes.recs.get_recommendations);
router.post('/recs', routes.recs.post_data);



module.exports = router;
