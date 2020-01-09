require('dotenv').config();
const express = require('express');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const exphbs = require('express-handlebars');
const Category = require('../models/Category');

const index = require('../routes/index');
const doctors = require('../routes/doctors');
const categories = require('../routes/categories');
const users = require('../routes/users');
const auth = require('../routes/auth');
const forgot = require('../routes/forgot');
const reset = require('../routes/reset');

module.exports = app => {
    // Passport
    require('../config/passport')(passport);

    // View Engine
    app.set('views', path.join(__dirname, '../views'));
    app.engine('handlebars', exphbs({
        defaultLayout: 'main'
    }));
    app.set('view engine', 'handlebars');

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, '../public')));

    // Express Session
    app.use(session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    }));

    // Passport Middleware
    app.use(passport.initialize());
    app.use(passport.session());

    // Connect Flash
    app.use(flash());

    // Global Variables
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        res.locals.error = req.flash('error');
        res.locals.user = req.user || null;
        next();
    });

    app.use(async (req, res, next) => {
        try {
            res.locals.categories = await Category.find({});
            next();
        } catch (err) {
            console.log(err);
            res.status(404).send({ msg: err });
        }
    });

    app.use('/', index);
    app.use('/doctors', doctors);
    app.use('/categories', categories);
    app.use('/users/register', users);
    app.use('/auth', auth);
    app.use('/auth/forgot', forgot);
    app.use('/auth/reset/:token', reset);
}