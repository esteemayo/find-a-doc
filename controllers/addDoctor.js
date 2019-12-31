const Category = require('../models/Category');

module.exports = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.render('add-doctors', { categories });
    } catch (err) {
        console.log(err);
        res.status(404).send({ msg: err });
    }
}