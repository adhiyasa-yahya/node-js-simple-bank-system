const { User, validate } = require('../models/userModel');
const _ = require('lodash');
const bcrypt = require('bcrypt');

async function register(req, res) {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send('That user already exisits!');
    }
    let userID =  Math.floor(100000 + Math.random() * 900000);
    console.log(userID)
    user = new User({
        _id: userID,
        ...req.body
    });
    await user.save();

    return res.status(200).json(_.pick(user, ['id', 'name', 'email']));
}

const allUser = async  (req, res) => {

}

const profile = async (req, res) => {
    let userID = req.params.id;
    if (userID) {
        return res.status(400).send("user id is required");
    }
    let user = await User.findOne({ id: userID });
    return res.status(200).json(_.pick(user, ['name', 'email']));
}

module.exports = { register, profile }