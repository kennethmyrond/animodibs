// @ts-nocheck
import express from 'express';
import { enAuth } from '../middleware/auth.js'
import Room from '../src/models/Rooms.js'
import Reservations from '../src/models/Reservations.js'


let resvRoute = express.Router();

resvRoute.get('/', enAuth, async (req, res) => {
    try {
        let rooms = await Room.find({}).lean()

        res.render('pages/createreservation', {
            title: "Create Reservation",
            fname: req.user.firstName,
            lname: req.user.lastName,
            usericon: req.user.image, rooms
        })
    } catch (err) {
        console.error(err);
        res.render('pages/error/404')
    };
});

resvRoute.use(express.json());

resvRoute.post('/', enAuth, async (req, res) => {

    const date_to = req.body.data_to;
    const date_from = req.body.data_from;
    const time = req.body.time;
    const room_id = req.body.roomselect;
    const day = req.body.days;

    const reservation = {
        date_to: date_to,
        date_from: date_from,
        time: time,
        Day: day,
        room_id: room_id,
        organizer: req.user._id,
        status: "reserved",
        organizer_name: req.user.firstName,
        event_name: req.body.event_name,
        remarks: req.body.remarks,
        equipment: req.body.equipment,
    }

    const resvCheck = await Reservations.findOne({
        date_to: date_to, date_from: date_from, room_id: room_id, days: {
            $in: [day[0], day[1], day[2], day[3], day[4], day[5], day[6]]
        }, time: time

    });


    if (resvCheck) {
        console.log("NOT OK");
        res.status(500).json({});
        return;
    }
    else {
        console.log("OK");
        Reservations.create(reservation)
            .then((result) => {
                console.log("Added: " + result);
                res.redirect("/reservations");
            }).catch((err) => {
                console.error(err);
            })

    }
}

)

export default resvRoute