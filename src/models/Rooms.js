import mongoose from 'mongoose'

const RoomsSchema = new mongoose.Schema({
    img:[{
        type: String
    }],
    room_num:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true,
        default: "Gokongwei Bldg."
    },
    floor:{
        type: Number,
        required: true
    },
    guests_num:{
        type: Number,
        required: true
    },
    equipments:[{
        type: String,
    }],

})


export default mongoose.model('Rooms', RoomsSchema) //module.exports = mongoose.model('User', UserSchema)