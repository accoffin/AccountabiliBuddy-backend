const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require("../models/User.model");

router.get("/", async (req, res, next) => {
  const userId = req.session.user._id;
  const userData = await User.findById(userId);
  res.status(200).json({ created_activities: userData.created_activities });
});

router.post("/create", async (req, res, next) => {
  const pushToUser = await User.findByIdAndUpdate(
    req.session.user._id,
    {
      $push: { created_activities: req.body },
    },
    { new: true }
  );
  res.status(200).json({ created_activities: pushToUser.created_activities });
});

router.post("/delete", async (req, res, next) => {
  const activitiesFromUser = await User.findByIdAndUpdate(
    req.session.user._id,
    // pull an object from an array by a condition
    { $pull: { created_activities: { name: req.body.name } } },
    {
      new: true,
    }
  );
  res.status(200).json({ activities: activitiesFromUser.activities });
});

module.exports = router;
