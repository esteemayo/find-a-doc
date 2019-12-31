const Category = require('../models/Category');

module.exports = async (req, res) => {
    const { name } = req.body;
    const category = new Category({ name });
    try {
        category.save();
        res.redirect('/doctors');
    } catch (err) {
        console.log(err);
        res.status(401).send({ msg: err });
    }
}