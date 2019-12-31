const Doctor = require('../models/Doctor');

module.exports = async (req, res) => {
    if (req.query.state) {
        try {
            const doctors = await Doctor.find({ state: req.query.state });
            res.render('doctors', { doctors });
        } catch (err) {
            console.log(err);
            res.status(404).send({ msg: err });
        }
    } else {
        try {
            const doctors = await Doctor.find({});
            res.render('doctors', { doctors });
        } catch (err) {
            console.log(err);
            res.status(404).send({ msg: err });
        }
    }
}