// import modules
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()

// import controllers
const userController = require('./controllers/user.controller')
const myartController = require('./controllers/myart.controller')
const artController = require('./controllers/art.controller')

const PORT = process.env.PORT
const server = express()
mongoose.connect(process.env.MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to mongdb'))

server.use(cors())
server.use(express.json())
server.use(morgan('dev'))

// use controllers
server.use('/', artController)
server.use('/user', userController)
server.use('/myart', myartController)
server.listen(PORT, () => console.log(`Running on port ${PORT}`))