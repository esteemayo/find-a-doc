const async = require('async');
const nodemailer = require('nodemailer');
const User = require('../models/User');

module.exports = (req, res) => {
    async.waterfall([
        function (done) {
            User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, (err, user) => {
                if (!user) {
                    req.flash('error_msg', 'Password reset token is invalid or has expired.');
                    return res.redirect('back');
                }
                if (req.body.password === req.body.password2) {
                    user.setPassword(req.body.password, err => {
                        user.resetPasswordToken = undefined;
                        user.resetPasswordExpires = undefined;

                        user.save(err => {
                            req.logIn(user => {
                                done(err, user);
                            });
                        });
                    });
                } else {
                    req.flash('error_msg', 'Password do not match');
                    return res.redirect('back');
                }
            });
        },

        function (user, done) {
            let smtpTransporter = nodemailer.createTransport({
                service: process.env.MAIL_SERVICE,
                auth: {
                    user: process.env.CLIENT_MAIL,
                    pass: process.env.CLIENT_PASSWORD
                }
            });

            let mailOptions = {
                to: user.email,
                from: process.env.CLIENT_MAIL,
                subject: 'Your password has been changed',
                text: 'Hello,\n\n' +
                    'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
            };

            smtpTransporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(info.response);
                    req.flash('success_msg', 'Success! Your password has been changed.');
                    done(err);
                }
            });
        }
    ], err => {
        res.redirect('/');
    });
}