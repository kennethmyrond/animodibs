import express from 'express';
import Room from '../src/models/Rooms.js'
import Reservation from '../src/models/Reservations.js'
import Favorite from '../src/models/Favorites.js'
import {enAuth} from '../middleware/auth.js'
import { ObjectId } from "mongodb"
import moment from 'moment'

let roomRoute = express.Router();

//for myrooms or rooms for displaying all rooms in the database
roomRoute.get('/', enAuth, async (req, res) => {
  try {
    let rooms = await Room.find({}).lean()
    let today = new Date().toISOString().slice(0, 10)
    res.render('pages/rooms', {
      title: "Rooms",                         //need in every routes for displaying name in navbar
      fname: req.user.firstName,              //need in every routes for displaying name in navbar 
      lname: req.user.lastName,               //need in every routes for displaying name in navbar
      usericon: req.user.image,               //need in every routes for displaying usericon in navbar
      datenow: today,                         //from rooms page, will display rooms-details reservations from date today
      rooms,                                  //displaying all rooms
      title1: "All Rooms in Gokongwei Hall"   //h1 title in rooms page
    })
  } catch (err) {
    console.error(err)
    res.render('pages/error/404')
  }
})

// for viewing room-details. link is from room.ejs - line 32
// URL " : " meaning it needs to be included in roomRoute.get('/') kaya may : si id
// " ? " meaning does not need to be included in roomRoute.get('/') like dateto and dateform (see line 38 of rooms.ejs)
// " : " use req.params ; " ? " use req.query
 roomRoute.get('/:id', enAuth, async (req,res) => {
  try {
    console.log('pass')
    const dateto1 = req.query.dateto                      // getting '?dateto=' in the URL from line 38 display current date
    const datefrom1 = req.query.datefrom                  // getting '?datefrom=' in the URL from line 38 display current date
    const id = req.params.id                              // getting ':id' or room id in the URL from line 38 display current date
    const days = req.query.dayCheck
    const arrdays = days.split(',')
    const roomSolo = await Room.findById(req.params.id).lean().exec()     // getting room details of room id from /:id URL
    const reservations1 = await Reservation.findOne({date_to: dateto1, date_from: datefrom1, room_id: id, days: {$in:[arrdays[0],arrdays[1],arrdays[2],arrdays[3],arrdays[4],arrdays[5],arrdays[6]]}, time: '7:30 - 9:00'}).lean().exec()     // get reservation for 7:30 
    const reservations2 = await Reservation.findOne({date_to: dateto1, date_from: datefrom1, room_id: id, days: {$in:[arrdays[0],arrdays[1],arrdays[2],arrdays[3],arrdays[4],arrdays[5],arrdays[6]]}, time: '9:15 - 10:45'}).lean().exec()    // get reservation for 9:15 
    const reservations3 = await Reservation.findOne({date_to: dateto1, date_from: datefrom1, room_id: id, days: {$in:[arrdays[0],arrdays[1],arrdays[2],arrdays[3],arrdays[4],arrdays[5],arrdays[6]]}, time: '11:00 - 12:30'}).lean().exec()   // and so on
    const reservations4 = await Reservation.findOne({date_to: dateto1, date_from: datefrom1, room_id: id, days: {$in:[arrdays[0],arrdays[1],arrdays[2],arrdays[3],arrdays[4],arrdays[5],arrdays[6]]}, time: '12:45 - 2:15'}).lean().exec()
    const reservations5 = await Reservation.findOne({date_to: dateto1, date_from: datefrom1, room_id: id, days: {$in:[arrdays[0],arrdays[1],arrdays[2],arrdays[3],arrdays[4],arrdays[5],arrdays[6]]}, time: '2:30 - 4:00'}).lean().exec()
    const reservations6 = await Reservation.findOne({date_to: dateto1, date_from: datefrom1, room_id: id, days: {$in:[arrdays[0],arrdays[1],arrdays[2],arrdays[3],arrdays[4],arrdays[5],arrdays[6]]}, time: '4:15 - 5:45'}).lean().exec()
    const reservations7 = await Reservation.findOne({date_to: dateto1, date_from: datefrom1, room_id: id, days: {$in:[arrdays[0],arrdays[1],arrdays[2],arrdays[3],arrdays[4],arrdays[5],arrdays[6]]}, time: '6:00 - 7:30'}).lean().exec()
    const isFave = await Favorite.findOne({room_id: id, user_id: req.user._id}).lean().exec()
    console.log(isFave)
    res.render('pages/roomDetails', {
      title: roomSolo.room_num,   //need in every routes for displaying name in navbar
      fname: req.user.firstName,  //need in every routes for displaying name in navbar
      lname: req.user.lastName,   //need in every routes for displaying name in navbar
      usericon: req.user.image,   //need in every routes for displaying user icon in navbar
      roomSolo,                   // passing details of room id from /:id in URL
      reservations1,reservations2,reservations3,reservations4,reservations5,reservations6,reservations7,
      dateto: dateto1,
      datefrom: datefrom1,
      isFave,
      arrdays
    })
  } catch (err) {
    console.error(err)
    res.render('pages/error/404')
  }

  
})

//for confirm reservation after clicking reserve
  // URL " : " meaning it needs to be included in roomRoute.get('/') kaya may : si id
  // " ? " meaning does not need to be included in roomRoute.get('/') like dateto and dateform (see line 38 of rooms.ejs)
  //" : " use req.params ; " ? " use req.query
  // i use " ? " to transfer data from one page to another u can see in confirm that i was able to pass data with ?
  roomRoute.get('/:id/confirm', enAuth, async (req,res) => {
    const roomSolo = await Room.findById(req.params.id).lean().exec()     // getting room details of room id from /:id URL
    const days = req.query.dayCheck                                       // gets the days of recurring meeting/event 
    const arrdays = days.split(',')                                       // splits the days and places it into an array
    try{
      res.render('pages/confirm',{
      title: 'Confirm Reservation', //need in every routes for displaying title in navbar
      fname: req.user.firstName,    //need in every routes for displaying name in navbar
      lname: req.user.lastName,     //need in every routes for displaying name in navbar
      usericon: req.user.image,     //need in every routes for displaying icon in navbar
      dateto: req.query.dateto,      //passing data of dateto to confirm page then confirm page will read the ?
      datefrom: req.query.datefrom,
      time: req.query.time,         
      roomSolo,
      days, 
      arrdays
      })
    } catch {
      res.render('pages/error/404')
    }
  })


  roomRoute.get('/:id/details', enAuth, async(req,res) => {
    let reserv = await Reservation.findOne({time: req.query.time, room_id: req.params.id, date_to: req.query.dateto, date_from: req.query.datefrom})
    res.json(reserv || "")
  })


  roomRoute.post('/:id/fave', enAuth, async (req,res) => {
    let user = req.user._id
    let room = req.params.id
    const isFave = await Favorite.findOne({room_id: room, user_id: user}).lean().exec()
    if(!isFave){
      let fave = {
        room_id: room,
        user_id: user,
      }
      Favorite.create(fave)
      console.log("fave added to db")
    }else{
    }
    res.redirect('')
  })

  roomRoute.delete('/:id/fave', enAuth, async (req,res) => {
    let user = req.user._id
    let room = req.params.id
    await Favorite.deleteOne({room_id: room, user_id: user})
    console.log('removed from db')
    res.redirect('')
  })

  roomRoute.use(express.json());

  roomRoute.post('/:id/confirm', enAuth, async (req, res) => {
  console.log(req.query.dayCheck);
  const roomSolo = await Room.findById(req.params.id).lean().exec()     // getting room details of room id from /:id URL
  const days = req.query.dayCheck;
  const arrdays = days.split(',');

  const reservation = {
    date_to: req.query.dateto,
    date_from: req.query.datefrom,
    time: req.query.time,
    Day: arrdays, //days: or Day: 
    room_id: roomSolo._id,
    status: "reserved",
    organizer_name: req.body.organizer,
    organizer: req.user._id,
    event_name: req.body.event_name,
    remarks: req.body.remarks,
  }
  console.log(reservation)
  Reservation.create(reservation)
    .then((result) => {
      console.log("Added: " + result);
      res.redirect("/reservations");
      //to myreservations
    }).catch((err) => {
      console.error(err);
    })
})

 

export default roomRoute