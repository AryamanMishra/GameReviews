/* Heroku deployed again */

/* 
    game-reviews21
*/

if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}



/* Requiring modules */
const express = require('express')
const app = express()
const path = require('path')
const methodOverride = require('method-override')
const mongoSanitize = require('express-mongo-sanitize');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');



const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/GameReviews';



/* Mongoose and mongodb connection */ 
mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('CONNECTION CONFIRMED')
})
.catch(err => {
    console.log('Connection refused')
    console.log(err)
})



/* Variables used for assigning anonymous names */
const { uniqueNamesGenerator, adjectives, animals } = require('unique-names-generator');



/* Requiring models */
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


/* Setting up views folder including ejs scripts */
app.set('views',path.join(__dirname,'views'))


/* View egine set to ejs */
app.set('view engine','ejs')


/* parsing incoming data */
app.use(express.urlencoded({extended:true}))


/* Using method override for PATCH or PUT requests */
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


/* Sanitising html */
app.use(mongoSanitize({
    replaceWith: '_'
}))


/* Setting to obtain static files like images and css*/ 
app.use(express.static(__dirname + '/public'));



/*
    Functional code starts here

*/


/* Get route for home page */
app.get('/' ,async(req,res) => {
    const games = await Game.find({})
    res.render('home', {games})
})


/* Get route for game page */ 
app.get('/:game', async(req,res) => {
    const name = req.params.game
    const searchGame = await Game.find({name:name}) // checking if game page exists
    if (JSON.stringify(searchGame) !== '[]') {
        res.render('gamePage', {name}) // rendering required game page
    }
    else {
        res.render('game_not_found', {name}) //rendering not found page
    }
})



/* Get route for placing new review */
app.get('/:game/newReview', (req,res) => {
    const name = req.params.game
    const randomName = uniqueNamesGenerator({dictionaries: [adjectives,animals]}) // Assigning review author a random name
    res.render('newReview', {name, randomName})
})



/* Post route for placing and saving new review */
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



/* Get route for seeing all reviews of a game */
app.get('/:game/allReviews', async(req,res) => {
    const name = req.params.game
    const reviews = await Review.find({game_name:name})
    console.log(reviews)
    res.render('allReviews', {name, reviews})
})



/* Get route for any other request by user */
app.get('*', (req,res) => {
    res.render('game_not_found')
})



/* Setting up local or heroku generated port and adding to listen event*/
const port = process.env.PORT || 3030
app.listen(port, () => {
    console.log(`LISTENING ON PORT ${port}`)
})