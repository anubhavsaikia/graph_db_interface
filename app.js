
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const rou = require('./routes/routes');



const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended:true}));
app.use(express.static(path.join(__dirname,'public')));


app.use('/', rou);


app.listen(3000);