const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const Category = require('../models/Category');

const index = require('../routes/index');
const doctors = require('../routes/doctors');
const categories = require('../routes/categories');

module.exports = app => {
    // View Engine
    app.set('views', path.join(__dirname, '../views'));
    app.engine('handlebars', exphbs({
        defaultLayout: 'main'
    }));
    app.set('view engine', 'handlebars');

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, '../public')));

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
}