const Doctor = require('../models/Doctor');

module.exports = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        res.render('doctors/details', { doctor });
    } catch (err) {
        console.log(err);
        res.status(404).send({ msg: err });
    }
}