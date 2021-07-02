const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require("../models/User.model");
const CreatedActivities = require("../models/userCreatedActivity.model");
const Goal = require("../models/Goal.model");

router.get("/user", async (req, res, next) => {
  const userId = req.session.user._id;
  const userData = await User.findById(userId).populate([
    {
      path: "created_activities",
      populate: {
        path: "created_activities",
        model: "createdActivity",
      },
    },
  ]);
  res.status(200).json({ createdActivities: userData.created_activities });
});

router.get("/", async (req, res, next) => {
  const { goalId } = req.body;
  console.log("goalId", req.body);
  const goalData = await Goal.findById(goalId).populate([
    {
      path: "created_activities",
      populate: {
        path: "created_activities",
        model: "createdActivity",
      },
    },
  ]);
  res.status(200).json({ createdActivities: goalData.created_activities });
});

router.post("/create", async (req, res, next) => {
  // console.log("req.body", req.body);
  const newActivity = await CreatedActivities.create(req.body);
  const pushToUser = await User.findByIdAndUpdate(req.body.user, {
    $push: { created_activities: newActivity._id },
  });
  const pushToGoal = await Goal.findByIdAndUpdate(
    req.body.goalId,
    {
      $push: { created_activities: newActivity._id },
    },
    { new: true }
  ).populate([
    {
      path: "created_activities",
      populate: {
        path: "created_activities",
        model: "createdActivity",
      },
    },
  ]);
  console.log("createdActivities", pushToGoal);
  res.status(200).json({ createdActivities: pushToGoal.created_activities });
});

router.post("/remove", async (req, res, next) => {
  const { activityId } = req.body;
  await CreatedActivities.findByIdAndUpdate(activityId, {
    $pull: { user: req.session.user._id },
  });
  const activitiesFromUser = await User.findByIdAndUpdate(
    req.session.user._id,
    { $pull: { created_activities: activityId } },
    {
      new: true,
    }
  ).populate([
    {
      path: "created_activities",
      populate: {
        path: "created_activities",
        model: "createdActivity",
      },
    },
  ]);
  res
    .status(200)
    .json({ createdActivities: activitiesFromUser.created_activities });
});

module.exports = router;
