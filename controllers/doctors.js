const Doctor = require('../models/Doctor');

module.exports = async (req, res) => {
    let noMatch = null;
    if (req.query.state) {
        try {
            const doctors = await Doctor.find({ state: req.query.state });
            if (doctors.length < 1) {
                noMatch = 'No state match that query, please try again...';
            }
            res.render('doctors/doctors', { doctors, noMatch });
        } catch (err) {
            console.log(err);
            res.status(404).send({ msg: err });
        }
    } else {
        try {
            const doctors = await Doctor.find({});
            res.render('doctors/doctors', { doctors, noMatch });
        } catch (err) {
            console.log(err);
            res.status(404).send({ msg: err });
        }
    }
}