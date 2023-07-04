const router = require('express').Router()
const mongoose = require('mongoose')
const responseList = require('../configs/response.config')
const User = require('../models/user.model')
const Art = require('../models/art.model')
const authenticateUser = require('../middlewares/auth.middleware')

router.get('/', authenticateUser, async (req, res) => {
    try {
        const cart = await Art.find({_id: req.user.cart}).populate('createdBy.user')
        return res.status(200).json(cart)
    } catch (err) {
        console.log(err)
        return res.status(500).json({message: responseList.SOMETHING_WRONG})
    }
    
})

router.post('/', authenticateUser, async (req, res) => {
    if (!req.body || !req.body.artworkId || !mongoose.isObjectIdOrHexString(req.body?.artworkId)) {
        return res.status(400).json({message: responseList.BAD_REQUEST})
    }
    try {
        const artwork = await Art.findById(req.body.artworkId)
        if (!artwork) {
            return res.status(404).json({message: responseList.NOT_FOUND})
        }
        if (artwork.quantity === 0 || artwork.deleted) {
            return res.status(400).json({message: responseList.NO_STOCK})
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({message: responseList.SOMETHING_WRONG})
    }
    const isInCart = Boolean(req.user.cart.findIndex(itemId => itemId.toString() === req.body.artworkId) > -1)
    if (isInCart) {
        return res.status(400).json({message: responseList.ALREADY_IN_CART})
    }
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $push: {cart: req.body.artworkId}
        })
        return res.status(200).json({message: responseList.SUCCESS})
    } catch (err) {
        console.log(err)
        return res.status(500).json({message: responseList.SOMETHING_WRONG})
    }
})

router.delete('/', authenticateUser, async (req, res) => {
    console.log(req.body)
    if (!req.body || !req.body.artworkId || !mongoose.isObjectIdOrHexString(req.body?.artworkId)) {
        return res.status(400).json({message: responseList.BAD_REQUEST})
    }
    const isInCart = Boolean(req.user.cart.findIndex(itemId => itemId.toString() === req.body.artworkId) > -1)
    if (!isInCart) {
        return res.status(400).json({message: responseList.NOT_FOUND})
    }
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $pull: {cart: req.body.artworkId}
        });
        return res.status(200).json({message: responseList.SUCCESS})
    } catch (err) {
        console.log(err)
        return res.status(500).json({message: responseList.SOMETHING_WRONG})
    }
})

router.get('/checkout', authenticateUser, async (req, res) => {
    if (req.user.cart.length === 0) {
        return res.status(400).json({message: responseList.BAD_REQUEST})
    }
    try {
        const artworks = await Art.find({_id: {$in: req.user.cart}})
        const isAllAvailable = artworks.every(artwork => artwork.quantity > 0) 
        if (isAllAvailable) {
            return res.status(200).json({message: responseList.SUCCESS})
        }
        const unavailableArtwork = artworks.filter(artwork => artwork.quantity === 0)
        return res.status(400).json({message: responseList.NO_STOCK, unavailableArtwork})
    } catch (err) {
        console.log(err)
        return res.status(500).json({message: responseList.SOMETHING_WRONG})
    }
})

router.post('/checkout', authenticateUser, async (req, res) => {
    if (req.user.cart.length === 0) {
        return res.status(400).json({message: responseList.BAD_REQUEST})
    }
    try {
        await Art.updateMany({_id: req.user.cart}, {
            $set: {quantity: 0}
        })
        await User.findByIdAndUpdate(req.user.id, {
            $set: {cart: []}
        })
        return res.status(200).json({message: responseList.SUCCESS})
    } catch (err) {
        console.log(err)
        return res.status(500).json({message: responseList.SOMETHING_WRONG})
    }
})

module.exports = router