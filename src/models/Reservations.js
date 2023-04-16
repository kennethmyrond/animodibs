import mongoose from 'mongoose'

const ReservesSchema = new mongoose.Schema({
    date_to:{
        type: Date,
        required: true,
        format: 'YYYY-MM-DD'
    },
    date_from:{
        type: Date,
        required: true,
        format: 'YYYY-MM-DD'
    },
    time:{
        type: String,
        enum: ['7:30 - 9:00',
                '9:15 - 10:45',
                '11:00 - 12:30',
                '12:45 - 2:15',
                '2:30 - 4:00',
                '4:15 - 5:45',
                '6:00 - 7:30'
        ]
    },
    Day:{
        type: [String]
    },
    room_id:{
        type: String,
        required: true
    },
    status:{ //remove status
        type: String,
        required: true,
        enum: ['reserved','available'],
        default: 'available'
    },
    organizer:{
        type: String,
        required: true
    },
    organizer_name:{
        type: String,
        required: true
    },
    event_name:{
        type: String,
        // required: true
    },
    remarks:{
        type: String,
    },

})

ReservesSchema.virtual('room_num', {
    ref: 'Rooms',
    localField: 'room_id',
    foreignField: '_id',
    justOne: true,
    options: { select: 'room_num' }
  });



export default mongoose.model('Reservations', ReservesSchema) 