const { User } = require('../models/userModel');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const config = require('../config')
const Joi = require('joi');
const jwt = require('jsonwebtoken')

async function login(req, res) {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    try {
        let user = await User.findOne({ email: `${req.body.email}` });
        if (!user) {
            return res.status(400).send('Sorry, Your email was not found in our system.');
        }

        const validUser = `${req.body.name}` === `${user.name}`;
        if (!validUser) {
            return res.status(400).send('Incorrect email or username.');
        }

        const accessToken = generateAccessToken(user)
        return res.json({
            token:accessToken,
            user: user
        });
    } catch (e) {
        console.log(e)
        return res.status(400).json({
            success: false,
            message: e
        })
    }
}

function logout(req, res) {
    const authHeader = req.headers["authorization"];
    jwt.sign(authHeader, "", { expiresIn: 1 } , (logout, err) => {
        if (logout) {
            res.send({msg : 'You have been Logged Out' });
        } else {
            res.send({msg:'Error'});
        }
    });
}

function generateAccessToken(user) {
    return jwt.sign(user.toJSON(), config.JWT_KEY, { expiresIn: `${config.JWT_EXPIRED}s` })
}

function validate(req) {
    const schema = Joi.object().keys({
        name: Joi.string().min(3).max(255).required(),
        email: Joi.string().min(5).max(255).required().email()
    });

    return schema.validate(req);
}

module.exports = { login, logout }