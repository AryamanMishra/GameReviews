  
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}


const express = require('express')
const app = express()
const path = require('path')
const methodOverride = require('method-override')
const mongoSanitize = require('express-mongo-sanitize');
const session = require('express-session');

const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/GameReviews';

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
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

//const secret = process.env.SECRET || 'thisisasecret!';

// const store = new MongoStore({
//     url: dbUrl,
//     secret,
//     touchAfter: 24*60*60
// });



// store.on('error', (err) => {
//     console.log('SESSION STORE ERROR', err)
// })

// const sessionConfig = {
//     store,
//     name: 'session',
//     secret,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         httpOnly: true,
//         // secure: true,
//         expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
//         maxAge: 1000 * 60 * 60 * 24 * 7
//     }
// }



app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(session({
    name: 'session',
    secret: process.env.SECRET || 'thisisasecret!',
    store: MongoStore.create({mongoUrl:dbUrl}),
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}))
app.use(mongoSanitize({
    replaceWith: '_'
}))


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



app.get('*', (req,res) => {
    res.send('THIS PAGE DOES NOT EXISTS')
})



const port = process.env.PORT || 3030
app.listen(port, () => {
    console.log(`LISTENING ON PORT ${port}`)
})