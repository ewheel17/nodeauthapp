module.exports = function(app, passport) {
    // Home Page
    app.get('/', (req,res) => {
        res.render('index.ejs');
    });

    // Login
    app.get('/login', (req,res) => {
        res.render('login.ejs', {message: req.flash('loginMessage')});
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }));

    // Signup
    app.get('/signup', (req,res) => {
        res.render('signup.ejs', {message: req.flash('signupMessage')});
    });

    // Process Signup Form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    // Profile
    app.get('/profile', isLoggedIn, (req,res) => {
        res.render('profile.ejs', {
            user: req.user
        });
    });

    // Logout
    app.get('/logout', (req,res) => {
        req.logout();
        res.redirect('/');
    });
};

// Route Middleware
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect('/');
    }
}