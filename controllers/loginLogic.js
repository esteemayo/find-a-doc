const passport = require('passport');

module.exports = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth/login',
        failureFlash: true,
        successFlash: 'Welcome to FindaDoc'
    })(req, res, next);
}