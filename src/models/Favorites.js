import mongoose from 'mongoose'
import Room from './Rooms.js'

const FavoriteSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true
    },
   
    room_id: {
        type: String,
        required: true,
        ref: 'Rooms'
    },
    user_id:{
        type: String,
        required: true,
    },
    img: [{
        type: String
    }],

})

FavoriteSchema.virtual('room', {
    ref: 'Rooms',
    localField: 'room_id',
    foreignField: '_id',
    justOne: true
});

FavoriteSchema.virtual('room_num', {
    ref: 'Rooms',
    localField: 'room_id',
    foreignField: '_id',
    justOne: true,
    options: { select: 'room_num' }
});

FavoriteSchema.virtual('location', {
    ref: 'Rooms',
    localField: 'room_id',
    foreignField: '_id',
    justOne: true,
    options: { select: 'location' }
});

FavoriteSchema.virtual('floor', {
    ref: 'Rooms',
    localField: 'room_id',
    foreignField: '_id',
    justOne: true,
    options: { select: 'floor' }
});

FavoriteSchema.virtual('guest_num', {
    ref: 'Rooms',
    localField: 'room_id',
    foreignField: '_id',
    justOne: true,
    options: { select: 'guest_num' }
});


export default mongoose.model('Favorites', FavoriteSchema, 'favorites');
