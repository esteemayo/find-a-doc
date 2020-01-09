const Doctor = require('../models/Doctor');

module.exports = async (req, res) => {
    try {
        const doctors = await Doctor.find({ category: req.params.name });
        res.render('doctors/doctors', { doctors });
    } catch (err) {
        console.log(err);
        res.status(400).send({ msg: err });
    }
}