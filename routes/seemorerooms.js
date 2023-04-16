import express from 'express';
import Room from '../src/models/Rooms.js'
import Reservation from '../src/models/Reservations.js'
import {enAuth} from '../middleware/auth.js'
import moment from 'moment'

let seeMoreRoute = express.Router();

//for myrooms or rooms for displaying all rooms in the database
seeMoreRoute.get('/', enAuth, async (req, res) => {
  try {
    let rooms = await Room.find({}).lean()
    let today = new Date().toISOString().slice(0, 10)
    res.render('pages/seemorerooms', {
      title: "Available rooms today",                         //need in every routes for displaying name in navbar
      fname: req.user.firstName,              //need in every routes for displaying name in navbar 
      lname: req.user.lastName,               //need in every routes for displaying name in navbar
      usericon: req.user.image,
      datenow: today,                         //from rooms page, will display rooms-details reservations from date today
      rooms,                                  //displaying all rooms
     
    })
  } catch (err) {
    console.error(err)
    res.render('pages/error/404')
  }
})


export default seeMoreRoute