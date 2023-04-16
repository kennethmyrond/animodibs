import express from 'express';
import Events from '../src/models/Events.js';
import {enAuth} from '../middleware/auth.js'
import moment from 'moment'

let seeEvents = express.Router();

seeEvents.get('/', enAuth, async (req, res)=>{
    try{
        let events = await Events.find({}).lean()
        let today = new Date().toISOString().slice(0, 10)

        res.render('pages/seemoreevents',{
            title: "My Events",
            fname: req.user.firstName,
            lname: req.user.lastName,
            datenow: today,
            usericon: req.user.image,
            events,
        })
    } catch (err) {
        console.error(err)
        res.render('pages/error/404')
    }
})

export default seeEvents