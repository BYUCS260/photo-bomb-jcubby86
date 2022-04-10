const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const photos = require("./photos.js")
const Photo = photos.model;

const commentSchema = new mongoose.Schema({
  content: String,
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  photo: {
    type: mongoose.Schema.ObjectId,
    ref: 'Photo'
  },
});

const Comment = mongoose.model('Comment', commentSchema);

router.post("/:id", validUser, async (req, res) => {
  try {
    let photo = await Photo.findOne({
      _id: req.params.id
    });
    if (!photo){
      return res.status(400).send({
        message: "Invalid photo id."
      });
    }
    const comment = new Comment({
      user: req.user,
      photo: photo,
      content: req.body.content
    });

    await comment.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let photo = await Photo.findOne({
      _id: req.params.id
    });
    if (!photo){
      return res.status(400).send({
        message: "Invalid photo id."
      });
    }
    let comments = await Comment.find({
      photo: photo
    }).sort({
      created: 1
    }).populate('user');
    return res.send(comments);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  model: Comment,
  routes: router,
}