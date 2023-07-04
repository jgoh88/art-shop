const router = require("express").Router();
const Art = require("../models/art.model");
const responseList = require('../configs/response.config');

//Display artworks posted in Home
router.get("/", async (req, res) => {
  try{
    const artwork = await Art.find();
      res.status(200).json({ artwork });
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: responseList.BAD_REQUEST });
    }
});

module.exports = router