import 'dotenv/config';
//import { connectToMongo, getDb }  from './db/conn.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import express from 'express'
import morgan from 'morgan'
import passport from 'passport'
import session from 'express-session'
//import exphbs from 'express-handlebars'
// import mongoose from 'mongoose'
import mongoStore from 'connect-mongo';
//let mongoStore = connectMongo.default;
import http from 'http'

import connectDB from './config/db.js'
import confPass from './config/passport.js'

import loginRoute from './routes/login.js'
import dashRoute from './routes/dashboard.js'
import authRoute from './routes/auth.js'
import roomRoute from './routes/rooms.js'
import reservationRoute from './routes/reservations.js';
import resvRoute from './routes/createreservation.js';
import accRoute from './routes/myaccount.js';
import searchRoute from './routes/search.js';
//import deleteReserveRoute from './routes/delReservation.js'
import seeMoreRoute from './routes/seemorerooms.js';
import favRoute from './routes/favorites.js';
import seeEvents from './routes/seemoreevents.js';

import bodyParser from 'body-parser';

//async function main(){
    const app = express()
    const port = process.env.SERVER_PORT || "8080";
    const __dirname = dirname(fileURLToPath(import.meta.url));

    //logging morgan
    if (process.env.NODE_ENV === 'development'){
        app.use(morgan('dev'))
    }

    //passport config
    confPass(passport)

    const server = http.createServer(app)

    server.listen(port, ()=> console.log('listening'))

    //mongodb
    connectDB()

    //static apps
    app.use(express.static(__dirname + '/public'));


    //handlebars
    // app.engine('.hbs', exphbs.engine({extname: '.hbs'}));
    // app.set('view engine', 'hbs');
    // app.set("view cache", false);

    //views
    app.set('view engine', 'ejs')
    app.set("views", "./src/views");

    //sessions
    app.use(session({
        store: mongoStore.create({mongoUrl: process.env.MONGODB_URI}),
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false
    }))

    //passport middleware
    app.use(passport.initialize())
    app.use(passport.session())

    //routes
    app.use('/login', loginRoute)
    app.use('/home', dashRoute)
    app.use('/auth', authRoute)
    app.use('/rooms', roomRoute)
    app.use('/reservations', reservationRoute)
    app.use('/createreservation', resvRoute)
    app.use('/myaccount', accRoute)
    app.use('/search', searchRoute)
    app.delete('/reservations/:id', reservationRoute)
    app.put('/reservations/:id', reservationRoute)
    //app.use('/delete-reservation', deleteReserveRoute)
    app.use('/see-more-rooms', seeMoreRoute)
    app.use('/favorites', favRoute)
    app.delete('/favorites/:id', favRoute)
    app.use('/see-more-events', seeEvents)
    

    app.get('/', (req, res) => {
        res.redirect("/login")
    })

    app.listen(port, 'localhost', () =>{
        console.log("Server is listening ; Listening to port", port)
    });
//}
