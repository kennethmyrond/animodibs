//const passport = require('passport');
//const GoogleStrategy = require('passport-google-oauth20').Strategy;

//import { MongoCredentials } from 'mongodb'
import mongoose from 'mongoose'
import GoogleStrategy from 'passport-google-oauth2'
import User from '../src/models/User.js'

const confPass = async (passport) => { //idk if this should have await  module.exports = function (passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:"/auth/google/callback"
        //passReqToCallback:true
        },
        async (accessToken, refreshToken, profile, done)=>{
            console.log(profile)
            const newUser = {
                googleId: profile.id,
                displayName: profile.displayName,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                image: profile.photos[0].value
            }
            console.log(newUser)
            try{
                let user = await User.findOne({googleId: profile.id})
                if (user) {
                    done(null, user)
                  } else {
                    user = await User.create(newUser)
                    done(null, user)
                  }
            }
            catch (err) {
                console.error(err)
            }
        }
    ));

    passport.serializeUser((user , done) => {
        done(null , user.id);
    })

    passport.deserializeUser(async (id, done) => {
      const user = await User.findById(id);
      done(null, user);
    });
}

export default confPass


