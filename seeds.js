const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/GameReviews', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('CONNECTION CONFIRMED')
})
.catch(err => {
    console.log('Connection refused')
    console.log(err)
})


const Game = require('./models/game');

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

// const Fortnite = new Game({
//     name: 'Fortnite'
// })
// Fortnite.save().then(() => {
//     console.log('Game saved in db')
// }).catch(err => {
//     console.log(err,'Not saved')
// })

// const Roblox = new Game({
//     name: 'Roblox'
// })
// Roblox.save().then(() => {
//     console.log('Game saved in db')
// }).catch(err => {
//     console.log(err,'Not saved')
// })

// const Garena_Free_Fire = new Game({
//     name: 'Garena Free Fire'
// })
// Garena_Free_Fire.save().then(() => {
//     console.log('Game saved in db')
// }).catch(err => {
//     console.log(err,'Not saved')
// })


// const Among_Us = new Game({
//     name: 'Among Us'
// })
// Among_Us.save().then(() => {
//     console.log('Game saved in db')
// }).catch(err => {
//     console.log(err,'Not saved')
// })


// const Call_of_Duty = new Game({
//     name: 'Call of Duty'
// })
// Call_of_Duty.save().then(() => {
//     console.log('Game saved in db')
// }).catch(err => {
//     console.log(err,'Not saved')
// })



// const Valorant = new Game({
//     name: 'Valorant'
// })
// Valorant.save().then(() => {
//     console.log('Game saved in db')
// }).catch(err => {
//     console.log(err,'Not saved')
// })


// const RDR2 = new Game({
//     name: 'Read Dead Redemption 2'
// })
// RDR2.save().then(() => {
//     console.log('Game saved in db')
// }).catch(err => {
//     console.log(err,'Not saved')
// })



// const CSGO = new Game({
//     name: 'Counter-Strike Global Offensive'
// })
// CSGO.save().then(() => {
//     console.log('Game saved in db')
// }).catch(err => {
//     console.log(err,'Not saved')
// })


// const Dota_2 = new Game({
//     name: 'Dota 2'
// })
// Dota_2.save().then(() => {
//     console.log('Game saved in db')
// }).catch(err => {
//     console.log(err,'Not saved')
// })


// const LOL = new Game({
//     name: 'League Of Legends'
// })
// LOL.save().then(() => {
//     console.log('Game saved in db')
// }).catch(err => {
//     console.log(err,'Not saved')
// })


// const RL = new Game({
//     name: 'Rocket League'
// })
// RL.save().then(() => {
//     console.log('Game saved in db')
// }).catch(err => {
//     console.log(err,'Not saved')
// })


// const FH4 = new Game({
//     name: 'Forza Horizon 4'
// })
// FH4.save().then(() => {
//     console.log('Game saved in db')
// }).catch(err => {
//     console.log(err,'Not saved')
// })


// const RSS = new Game({
//     name: 'Rainbow Six Siege'
// })
// RSS.save().then(() => {
//     console.log('Game saved in db')
// }).catch(err => {
//     console.log(err,'Not saved')
// })



// const Enlisted = new Game({
//     name: 'Enlisted'
// })
// Enlisted.save().then(() => {
//     console.log('Game saved in db')
// }).catch(err => {
//     console.log(err,'Not saved')
// })


// const Overwatch = new Game({
//     name: 'Overwatch'
// })
// Overwatch.save().then(() => {
//     console.log('Game saved in db')
// }).catch(err => {
//     console.log(err,'Not saved')
// })


// const AL = new Game({
//     name: 'Apex Legends'
// })
// AL.save().then(() => {
//     console.log('Game saved in db')
// }).catch(err => {
//     console.log(err,'Not saved')
// })



// const GI = new Game({
//     name: 'Genshin Impact'
// })
// GI.save().then(() => {
//     console.log('Game saved in db')
// }).catch(err => {
//     console.log(err,'Not saved')
// })



// const Cyberpunk_2077 = new Game({
//     name: 'Cyberpunk 2077'
// })
// Cyberpunk_2077.save().then(() => {
//     console.log('Game saved in db')
// }).catch(err => {
//     console.log(err,'Not saved')
// })


// const WOW = new Game({
//     name: 'World of Warcraft'
// })
// WOW.save().then(() => {
//     console.log('Game saved in db')
// }).catch(err => {
//     console.log(err,'Not saved')
// })
