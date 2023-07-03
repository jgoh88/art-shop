const router = require("express").Router();
const {artModel} = require("../models/art.model");

//Display artworks posted in Home
router.get("/", async (req, res) => {
  try{
    const artwork = await artModel.find();
      res.status(200).json({ artwork });
    } catch (e) {
      res.status(400).json({ message: responseList.BAD_REQUEST });
    }
});
