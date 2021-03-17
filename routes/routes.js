const path = require('path');
const express = require('express');

const routes = require('../controllers');

const router = express.Router();


router.get('/login', routes.login.get_test);
router.post('/login', routes.login.post_test);



module.exports = router;
