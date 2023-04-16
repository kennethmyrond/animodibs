import express from 'express';
import {enAuth} from '../middleware/auth.js'
import Room from '../src/models/Rooms.js'
import Reservation from '../src/models/Reservations.js'
import Events from '../src/models/Events.js';

const dashRoute = express.Router()

//for dashboard routing showing dashboard.ejs
dashRoute.get('/', enAuth, async (req, res) => {
    try{
        let rooms = await Room.find({}).lean().exec()
        let availrooms = await Reservation.find({}).lean().exec()
        let reservations = await Reservation.find({organizer: req.user._id}).lean().exec()
        let today = new Date().toISOString().slice(0, 10)
        let events = await Events.find({}).lean().exec()
        //console.log(reservations)
        res.render('pages/dashboard', {
            title: "Home",
            fname: req.user.firstName,
            lname: req.user.lastName,
            usericon: req.user.image,
            rooms, 
            availrooms,
            reservations,
            datenow: today,
            events,
            title1: "My Reservations",
            title2: "My Events "
        })
    } catch(err){
        res.render('pages/error/404')
    }
})

dashRoute.get('/about', enAuth, async(req,res)=>{
  try{
    res.render('pages/about',{
        title: "About",
        fname: req.user.firstName,
        lname: req.user.lastName,
        usericon: req.user.image,
        title1: "About"
      })
  } catch(err){
    res.render('pages/error/404')
  }
})



dashRoute.get('/:id', enAuth, async (req, res) => {
    try
    {
       
        const id = req.params.id
        const reservationSolo = await Reservations.findById(req.params.id).lean().exec()
        
  
     
     
     res.render('pages/viewreservations', {
         title: reservationSolo.event_name,   //need in every routes for displaying name in navbar
         fname: req.user.firstName,  //need in every routes for displaying name in navbar
         lname: req.user.lastName,   //need in every routes for displaying name in navbar
         reservationSolo,
         usericon: req.user.image,       
              
     })
  
     
    } catch(err){
     console.error(err)
     res.render('pages/error/404')
    }
  })
  
  dashRoute.get('/viewevents/:id', enAuth, async (req, res) => {
    try {
      const eventId = req.params.id
      const eventSolo = await Events.findById(req.params.id).lean().exec()
  
      res.render('pages/viewevents', {
        title: eventSolo.event_name,
        fname: req.user.firstName,
        lname: req.user.lastName,
        usericon: req.user.image,
        eventSolo,
      })
    } catch (err) {
      console.error(err)
      res.render('pages/error/404')
    }
  })

export default dashRoute //module.exports = dashRoute