const express = require('express')
const {json} = require('body-parser')
require('dotenv').config()
const massive = require('massive')
const session = require('express-session')
const {PORT, CONNECTION_STRING, SESSION_SECRET} = process.env
const app = express()
// const router = express.Router()

const ac = require('./controllers/authController')
const tc = require('./controllers/treasureController')

const am = require('./middlewares/authMiddleware')

app.use(json());
app.use(session({
    secret:SESSION_SECRET,
    resave:true,
    saveUninitialized:false
}))

// router.use(am.userOnly)

massive(CONNECTION_STRING).then(db=>{
    app.set('db',db)
})

app.post(`/auth/login`,ac.login)
app.post(`/auth/register`,ac.register)
app.get(`/auth/logout`,ac.logout)
app.get(`/api/treasure/dragon`,tc.dragonTreasure)
app.get(`/api/treasure/user`,am.userOnly,tc.getMyTreasure)
app.get(`/api/treasure/all`, am.userOnly, am.adminsOnly, tc.getAllTreasure)


app.listen(PORT,()=>{console.log(`Magic at ${PORT}`)})