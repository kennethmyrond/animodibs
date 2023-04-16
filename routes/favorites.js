import express from 'express';
import Favorites from '../src/models/Favorites.js'
import { enAuth } from '../middleware/auth.js'
import moment from 'moment'



let favRoute = express.Router();

favRoute.get('/', enAuth, async (req, res) => {
  try {
    let favorites = await Favorites.find({ user_id: req.user._id}).populate('room').lean()
    let today = new Date().toISOString().slice(0, 10)
    res.render('pages/favorites', {
      datenow: today,
      fname: req.user.firstName,
      lname: req.user.lastName,
      usericon: req.user.image,
      favorites,
      title: "Favorites",
    })
  } catch (err) {
    console.error(err)
  }
})




favRoute.delete('/favorites/:id', enAuth, async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Favorites.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send(`Favorite with ID "${id}" not found.`);
    }
    res.send(`Favorite with ID "${id}" deleted successfully.`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});








export default favRoute