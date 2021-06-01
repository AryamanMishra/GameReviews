const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/GameReviews', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('CONNECTION CONFIRMED')
})
.catch(err => {
    console.log('Connection refused')
    console.log(err)
})

// const Game = require('./models/game');

// const gta5 = new Game({
//     name: 'GTA5'
// })
// gta5.save().then(() => {
//     console.log('Game saved in db')
// }).catch(err => {
//     console.log(err,'Not saved')
// })

// const Review = require('./models/review')

// const review = new Review({
//     game_name:'Minecraft',
//     review:'Best game ever'
// })

// review.save().then(() => {
//     console.log('Review Saved in db')
// }).catch (err => {
//     console.log(err,'not saved')
// })