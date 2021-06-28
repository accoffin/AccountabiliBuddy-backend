const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require("../models/User.model");

router.get("/api", async (req, res, next) => {
  const { city, state, query } = req.query;
  const resultsFromAPI = await axios.get(
    `http://api.amp.active.com/v2/search/?radius=&city=${city}&state=${state}&zip=&country=&query=${query}&current_page=&per_page=100&sort=distance&exclude_children=true&api_key=${process.env.ACTIVE_APIKEY}`
  );
  const data = resultsFromAPI.data;
  res.status(200).json({ activities: data });
});

router.post("/save", async (req, res, next) => {
  const pushToUser = await User.findByIdAndUpdate(
    req.session.user._id,
    {
      $push: { activities: req.body },
    },
    { new: true }
  );
  res.status(200).json({ activities: pushToUser.activities });
});

router.post("/remove", async (req, res, next) => {
  const activitiesFromUser = await User.findByIdAndUpdate(
    req.session.user._id,
    // pull an object from an array by a condition
    { $pull: { activities: { assetGuid: req.body.assetGuid } } },
    {
      new: true,
    }
  );
  res.status(200).json({ activities: activitiesFromUser.activities });
});

router.get("/", async (req, res, next) => {
  const userId = req.session.user._id;
  const userData = await User.findById(userId);
  res.status(200).json({ activities: userData.activities });
});

module.exports = router;
