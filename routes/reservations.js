import express from 'express';
import MyReservation from '../src/models/Reservations.js'
import { enAuth } from '../middleware/auth.js'
import moment from 'moment'
import bodyParser from 'body-parser';

let reservationRoute = express.Router();
reservationRoute.use(bodyParser.json());
reservationRoute.use(bodyParser.urlencoded({extended: true}));

reservationRoute.get('/', enAuth, async (req, res) => {
  try {
    let reservation = await MyReservation.find({organizer: req.user._id}).populate('room_num').lean()
    let today = new Date().toISOString().slice(0, 10)
    res.render('pages/reservations', {
      title: "Reservations",
      datenow: today,
      fname: req.user.firstName,
      lname: req.user.lastName,
      usericon: req.user.image,
      reservation,
      title: "My Reservations",
    })

    

  } catch (err) {
    console.error(err)
  }
})


reservationRoute.get('/:id', enAuth, async (req, res) => {
  try {
    const reservation = await MyReservation.findById(req.params.id).populate('room_num').lean();
    res.render('pages/reservation-details', {
      fname: req.user.firstName,
      lname: req.user.lastName,
      usericon: req.user.image,
      reservation,
      title: 'Reservation Details',
    });
  } catch (err) {
    console.error(err);
  }
});




reservationRoute.delete('/reservations/:id', enAuth, async (req, res) => {
  try {
    const id = req.params.id;
    const result = await MyReservation.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send(`Reservation with ID "${id}" not found.`);
    }
    res.send(`Reservation with ID "${id}" deleted successfully.`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


reservationRoute.put('/reservations/:id', enAuth, async (req, res) => {
  try {
    console.log(req.body)
    const newData = req.body;
    const id = req.params.id;
    const updatedReservation = { $set: { event_name: newData.event_name } };
    console.log(newData)
    const reservation = await MyReservation.findByIdAndUpdate(id, updatedReservation, { new: true }).lean().exec();
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    console.log('Reservation updated successfully');
    res.json(reservation);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


export default reservationRoute