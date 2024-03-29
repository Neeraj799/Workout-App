const express = require('express')
const mongoose = require("mongoose");
const workoutRoutes = require('./routes/workouts')
const cors = require("cors");

// express app
const app = express()


//middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

require('dotenv').config()

//routes
app.use('/api/workouts', workoutRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Connected to db & listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })


