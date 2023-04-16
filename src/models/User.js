import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    googleId:{
        type: String,
        required: true
    },
    displayName:{
        type: String,
        required: true
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    image:{
        type: String,
    },
    // role:{
    //     type: String,//edit student or faculty
    //     required: true
    //      enum: {'student','faculty'}
    // },
    createdAt:{
        type: Date,
        default: Date.now
    }

})


export default mongoose.model('User', UserSchema) //module.exports = mongoose.model('User', UserSchema)