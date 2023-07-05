const router = require('express').Router()
const responseList = require('../configs/response.config')
const User = require("../models/user.model")
const Art = require("../models/art.model");
const authenticateUser = require("../middlewares/auth.middleware")
require('dotenv').config()

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
    console.log (req.body);
     const artwork = new Art(req.body);
     artwork.createdBy.user = req.user.id;
     artwork.createdBy.fullName = req.user.fullName;
     await artwork.save();
     await User.findByIdAndUpdate(req.user.id, { $push: { artworks: artwork._id } });
     res.status(200).json({ message: responseList.CREATED_SUCCESS });
   } catch (e) {
    console.log (e)
     res.status(400).json({ message: responseList.BAD_REQUEST });
   }
 });

  router.put("/", authenticateUser, async (req, res) => {
    try {
      console.log(req.body);
      const artwork = req.body.data;
      await Art.findByIdAndUpdate(req.body.id, { $set:artwork });
      res.status(200).json({ message: responseList.CREATED_SUCCESS });
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: responseList.BAD_REQUEST });
    }
  });

  router.delete("/", authenticateUser, async (req, res) => {
    try {
      const artwork = req.body;
      await vacancyModel.findByIdAndRemove(artwork.id);
      res.status(200).json({ message: responseList.DELETED_SUCCESS });
    } catch (e) {
      res.status(400).json({ message: responseList.DELETED_FAILED });
    }
  });

  module.exports = router