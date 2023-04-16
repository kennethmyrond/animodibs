import express from 'express';
import passport from 'passport'
const authRoute = express.Router()

//this is for login with google
authRoute.get('/google', passport.authenticate('google', { scope: ['profile'] }))

authRoute.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req,res) =>{
    res.redirect('/home')
})

authRoute.get('/logout',(req,res)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
})

export default authRoute