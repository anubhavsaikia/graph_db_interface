
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const rou = require('./routes/routes');
// const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
// const neo_session = driver.session();
var cookieParser = require('cookie-parser');
var session = require('express-session');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));

app.use('/', rou);


app.listen(3000);