// import modules
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')
require('dotenv').config()

// import controllers
const userController = require('./controllers/user.controller')
const myartController = require('./controllers/myart.controller')
const artController = require('./controllers/art.controller')
const cartController = require('./controllers/cart.controller')
const profileController = require('./controllers/profile.controller')

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
server.use(express.static(path.join(__dirname, 'build')))

// use controllers
server.use('/api', artController)
server.use('/api/user', userController)
server.use('/api/cart', cartController)
server.use('/api/myart', myartController)
server.use('/api/profile', profileController)


server.get('/*', (req, res) => {
    return res.sendFile(path.join(__dirname, 'build', "index.html"))
})

server.listen(PORT, () => console.log(`Running on port ${PORT}`))