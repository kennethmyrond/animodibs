import express from 'express';
import {enGuest} from '../middleware/auth.js'

const loginRoute = express.Router()

//for showing login
loginRoute.get('/', enGuest, (req, res) => {
    res.render('login')
})

export default loginRoute