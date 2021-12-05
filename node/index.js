var express = require('express');
var app = express();
var user = require('./routers/user');
var home = require('./routers/home');

app.use('/user', user);
app.use('/', home);

app.listen(3001);