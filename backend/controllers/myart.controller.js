import mongoose from "mongoose";
import { Router } from "express";
import { responseList } from "../config/response-list.js";
import { User } from "../models/user.models.js";
import {artModel} from "../models/art.model";
import {authenticateUser} from "../middlewares/auth.middleware.js";

//Display artworks posted in myArt
router.get("/myart", authenticateUser, async (req, res) => {
  try{
    const artwork = await artModel.find({ user: req.user.id});
      res.status(200).json({ artwork });
    } catch (e) {
      res.status(400).json({ message: responseList.BAD_REQUEST });
    }
});
  
  router.post("/myart", authenticateUser, async (req, res) => {
    try {
      const artwork = new artModel(req.body);
      await artwork.save();
      await User.findByIdAndUpdate(req.user.id, { $push: { artworks: artwork._id } });
      res.status(201).json({ message: responseList.CREATED_SUCCESS });
    } catch (e) {
      res.status(400).json({ message: responseList.BAD_REQUEST });
    }
  });