import mongoose from 'mongoose'

const EventSchema = new mongoose.Schema({

    event_name:{
        type: String, 
        required: true
    }, 

    location:{
        type: String,
        required: true
        
    },

    room_num:{
        type: String,
        required: true
    },

    date:{
        type: Date,
        required: true,
        format: 'MM-DD-YYYY'
    },

    time:{
        type: String,
        enum: ['7:30',
        '9:15',
        '11:00',
        '12:45',
        '2:30',
        '4:15',
        '6:00'
        ]
    }
})    

export default mongoose.model('Events', EventSchema)