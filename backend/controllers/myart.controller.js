const router = require('express').Router()
const responseList = require('../configs/response.config')
const User = require("../models/user.model")
const Art = require("../models/art.model");
const authenticateUser = require("../middlewares/auth.middleware")

//Display artworks posted in myArt
router.get("/", authenticateUser, async (req, res) => {
  try{
    const artwork = await Art.find({ user: req.user.id});
      res.status(200).json({ artwork });
    } catch (e) {
      res.status(400).json({ message: responseList.BAD_REQUEST });
    }
});
  
  router.post("/", authenticateUser, async (req, res) => {
    try {
      const artwork = new Art(req.body);
      artwork.createdBy = req.user.id;
      await artwork.save();
      await User.findByIdAndUpdate(req.user.id, { $push: { artworks: artwork._id } });
      res.status(200).json({ message: responseList.CREATED_SUCCESS });
    } catch (e) {
      res.status(400).json({ message: responseList.BAD_REQUEST });
    }
  });

  module.exports = router