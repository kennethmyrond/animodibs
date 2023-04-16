import express from 'express';
import { enAuth } from '../middleware/auth.js'

const accRoute = express.Router()

accRoute.get('/', enAuth, async (req, res) => {
    try {
        res.render('pages/myaccount', {
            title: "My Account",
            fname: req.user.firstName,
            lname: req.user.lastName,
            usericon: req.user.image,
            image: req.user.image,
        })
    } catch (err) {
        console.error(err);
        res.render('pages/error/404')
    };
});

export default accRoute
