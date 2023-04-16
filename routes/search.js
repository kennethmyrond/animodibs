import express from 'express';
import Room from '../src/models/Rooms.js'
import {enAuth} from '../middleware/auth.js'

let searchRoute = express.Router();

searchRoute.get('/', enAuth, async (req, res) => {
    try {
        let regex = new RegExp(req.query.q, 'i');
        let rooms = await Room.find({room_num: regex}).lean().exec()
        let today = new Date().toISOString().slice(0, 10)
        res.render('pages/rooms', {
          title: "Search",                         //need in every routes for displaying name in navbar
          fname: req.user.firstName,              //need in every routes for displaying name in navbar 
          lname: req.user.lastName,               //need in every routes for displaying name in navbar
          usericon: req.user.image,               //need in every routes for displaying usericon in navbar
          datenow: today,                         //from rooms page, will display rooms-details reservations from date today
          rooms,                                  //displaying all rooms
          title1: "Results for: "+ req.query.q   //h1 title in rooms page
        })
      } catch (err) {
        console.error(err)
        res.render('pages/error/404')
      }
  })

  export default searchRoute
