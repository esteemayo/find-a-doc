const Doctor = require('../models/Doctor');

module.exports = async (req, res) => {
    const { full_name, category, practice_name, grad_year, city, state } = req.body;

    let new_patients;
    if (req.body.new_patients) {
        new_patients = true;
    } else {
        new_patients = false;
    }

    const doctor = new Doctor({
        full_name,
        category,
        new_patients: new_patients,
        practice_name,
        grad_year,
        city,
        state
    });

    try {
        await doctor.save();
        res.redirect('/doctors')
    } catch (err) {
        console.log(err);
        res.status(404).send({ msg: err });
    }
}