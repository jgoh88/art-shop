const router = require('express').Router()
const responseList = require('../configs/response.config')
const User = require("../models/user.model")
const Art = require("../models/art.model");
const authenticateUser = require("../middlewares/auth.middleware")

//Display artworks posted in myArt
router.get("/", authenticateUser, async (req, res) => {
  try{
    const artwork = await Art.find({ "createdBy.user": req.user.id, quantity: {$ne:0}});
      res.status(200).json({ artwork });
    } catch (err) {
      res.status(500).json({message: responseList.SOMETHING_WRONG});
    }
});
  
router.post("/", authenticateUser, async (req, res) => {
  try {
    const artwork = new Art(req.body);
    artwork.createdBy.user = req.user.id;
    artwork.createdBy.fullName = req.user.fullName;
    await artwork.save();
    await User.findByIdAndUpdate(req.user.id, { $push: { artworks: artwork._id } });
    res.status(200).json({ message: responseList.CREATED_SUCCESS });
  } catch (err) {
    console.log (err)
    res.status(500).json({ message: responseList.SOMETHING_WRONG });
  }
});

router.put("/", authenticateUser, async (req, res) => {
  try {
    const artwork = req.body.data;
    await Art.findByIdAndUpdate(req.body.id, { $set: {...artwork} });
    res.status(200).json({ message: responseList.CREATED_SUCCESS });
  } catch (e) {
    console.log(err)
    res.status(500).json({ message: responseList.SOMETHING_WRONG });
  }
});

router.delete("/", authenticateUser, async (req, res) => {
  try {
    console.log(req.body);
    await Art.findByIdAndUpdate(req.body.id, { $set:{quantity:0, deleted: true} });
    res.status(200).json({ message: responseList.DELETED_SUCCESS });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: responseList.SOMETHING_WRONG });
  }
});

module.exports = router