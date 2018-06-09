const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const configDB = require('./config/database.js');


// Configuration
mongoose.connect(configDB.url);

require('./config/passport')(passport);

// Set up express app
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.set('view engine', 'ejs');

// Required for passport
app.use(session({secret: 'helloworld'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routes
require('./app/routes.js')(app,passport);

// Launch
app.listen(port, () => {
    console.log('Server is open on port: ' + port);
});