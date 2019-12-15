/****************************************************************************************************
 * Authour: Youngjin Kwak(곽영진)
 * Purpose:
 * list of API:
 * startedAt: 12/14/2019
 * Last Update: 12/14/2019
 * Version: 1.0
*****************************************************************************************************/
const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();

/****************************************************************************************************
 * Authour: Youngjin Kwak(곽영진)
 * RESTful API: Post
 * Middlewares: isNotLoggedIn
 * Purpose: Create the user
 * startedAt: 12/14/2019
 * Last Update: 12/14/2019
 * Version: 1.0
*****************************************************************************************************/
router.post('/signUp', isNotLoggedIn, (req, res, next) => {

    /* Data from body */
    const { email, username, password, img, phoneNumber } = req.body;
    try {
        const exUser = User.findOne({
            where: { username: username }
        });

        if(exUser) {
            res.status(406).json({
                errorCode: 1,
                message: 'Username already has been used',
            })
        }

        const bash = bcrypt.hash(password, 12);
        User.create({
            img,
            email,
            username,
            password: bash,
            phoneNumber,
        })

        return res.json({
            message: "success to login"
        })
    } catch (error) {
        console.error(error);
        next(error);
    }
});

/****************************************************************************************************
 * Authour: Youngjin Kwak(곽영진)
 * RESTful API: Post
 * Middlewares: isNotLoggedIn
 * Purpose: Create the user
 * startedAt: 12/14/2019
 * Last Update: 12/14/2019
 * Version: 1.0
*****************************************************************************************************/
router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }

        if(!user) {
            return res.status(401).json({
                errorCode : 2,
                message: info.message
            });
        }

        return req.login(user, (loginError) => {
            if(loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.json({
                user
            });
        });

    }) (req, res, next);
});

/****************************************************************************************************
 * Authour: Youngjin Kwak(곽영진)
 * RESTful API: Post
 * Middlewares: isNotLoggedIn
 * Purpose: Create the user
 * startedAt: 12/14/2019
 * Last Update: 12/14/2019
 * Version: 1.0
*****************************************************************************************************/
router.post('/logout', isLoggedIn, (req, res) => {
    req.logout();
    return res.status(200).send('LOGOUT');
});

module.exports = router;