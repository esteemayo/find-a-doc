const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = async (req, res) => {
    let errors = [];
    const { name, email, password, password2 } = req.body;

    if (!name) {
        errors.push({ msg: 'Name field is required' });
    }

    if (!email) {
        errors.push({ msg: 'Email field is required' });
    }

    if (!password) {
        errors.push({ msg: 'Password field is required' });
    }

    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.render('users/register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        let user = await User.findOne({ email })
        if (user) {
            req.flash('error_msg', 'Email already exist');
            res.redirect('/users/register');
        } else {
            user = new User({
                name,
                email,
                password
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);

            try {
                await user.save()
                req.flash('success_msg', 'You are now registered and can log in');
                res.redirect('/auth/login');
            } catch (err) {
                console.log(err);
            }
        }
    }
}