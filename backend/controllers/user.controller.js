const router = require('express').Router()
const jwt = require('jsonwebtoken')
const responseList = require('../configs/response.config')
const User = require('../models/user.model')
require('dotenv').config()

router.post('/', async (req, res) => {
    try {
        if (!req.body || !req.body.username || !req.body.email || !req.body.fullName || !req.body.password || !req.body.contactNo || !req.body.address || !req.body.profilePic) {
            return res.status(400).json({message: responseList.BAD_REQUEST})
        }
        const user = new User(req.body)
        await user.save()
        const token = jwt.sign(user._id, process.env.JWT_SECRET, {expiresIn: '1h'})
        return res.status(200).json({message: responseList.CREATED_SUCCESS, })
    } catch (err) {
        console.log(err)
        return res.status(500).json({message: responseList.SOMETHING_WRONG})
    }
})

module.exports = Router