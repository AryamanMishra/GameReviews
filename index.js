const express = require('express')
const app = express()
const path = require('path')
const methodOverride = require('method-override')

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/GameReviews', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('CONNECTION CONFIRMED')
})
.catch(err => {
    console.log('Connection refused')
    console.log(err)
})



const { uniqueNamesGenerator, adjectives, animals } = require('unique-names-generator');

const Game = require('./models/game');

const Review = require('./models/review');


app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))


app.use(express.static(__dirname + '/public'));


app.get('/' ,async(req,res) => {
    const games = await Game.find({})
    res.render('home', {games})
})


app.get('/:game', (req,res) => {
    const name = req.params.game
    res.render('gamePage', {name})
})


app.get('/:game/newReview', (req,res) => {
    const name = req.params.game
    const randomName = uniqueNamesGenerator({dictionaries: [adjectives,animals]})
    res.render('newReview', {name, randomName})
})


app.post('/:game/newReview', (req,res) => {
    const name = req.body.game_name
    console.log(name)
    const review = new Review(req.body)
    review.save().then(() => {
            console.log('review saved')
        })
        .catch(err => {
            console.log(err, 'error occured')
        })
    res.redirect(`/${name}/allReviews`)
})


app.get('/:game/allReviews', async(req,res) => {
    const name = req.params.game
    const reviews = await Review.find({game_name:name})
    console.log(reviews)
    res.render('allReviews', {name, reviews})
})

app.listen(3030, () => {
    console.log('LISTENING ON PORT 3030')
})