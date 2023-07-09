const router = require("express").Router();
const Art = require("../models/art.model");
const responseList = require('../configs/response.config');

//Display artworks posted in Home
router.get("/", async (req, res) => {
  try{
      const artwork = await Art.find({quantity: {$ne: 0}, deleted: false});
      res.status(200).json({ artwork });
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: responseList.SOMETHING_WRONG });
    }
});

router.get('/search/:searchTerm', async (req, res) => {
  const searchTerm = req.params.searchTerm
  try {
    const artwork = await Art.find({
      quantity: {$ne: 0},
      deleted: false,
      $or: [
        {name: {
          $regex: searchTerm, $options: 'i'
        }},
        {description: {
          $regex: searchTerm, $options: 'i'
        }},
        {'createdBy.fullName': {
          $regex: searchTerm, $options: 'i'
        }},
      ]
    })
    res.status(200).json({ artwork })
  } catch (err) {
    console.log(err)
    return res.status(500).json({message: responseList.SOMETHING_WRONG})
  }
})

module.exports = router