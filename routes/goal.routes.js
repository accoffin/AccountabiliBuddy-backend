const router = require("express").Router();
// const { response } = require("express");
const Goals = require("../models/Goal.model");
const User = require("../models/User.model");

router.get("/get", async (req, res, next) => {
  const userId = req.session.user._id;
  const userData = await User.findById(userId).populate([
    {
      path: "goals",
      populate: {
        path: "goals",
        model: "Goal",
      },
    },
  ]);
  res.status(200).json({ goals: userData.goals });
});

router.get("/", async (req, res, next) => {
  const userId = req.session.user._id;
  const userData = await User.findById(userId).populate([
    {
      path: "goals",
      populate: [
        { path: "goals" },
        {
          path: "created_activities",
          populate: {
            path: "created_activities",
            model: "Goal",
          },
        },
      ],
    },
  ]);
  res.status(200).json({ goals: userData.goals });
});

router.get("/:goalId", async (req, res, next) => {
  const { goalId } = req.params;
  const goalDetails = await Goals.findById({ goalId });
  res.status(200).json({ goalDetails });
});

router.post("/new", async (req, res, next) => {
  console.log("req.body", req.body);
  const newGoal = await Goals.create(req.body);
  const pushToUser = await User.findByIdAndUpdate(
    req.body.user,
    {
      $push: { goals: newGoal._id },
    },
    { new: true }
  );
  res.status(200).json({ goals: pushToUser.goals });
});

router.post("/update", async (req, res, next) => {
  const { goalId } = req.body;
  const updatedGoal = await Goals.findByIdAndUpdate(goalId, req.body.form, {
    new: true,
  });
  res.status(200).json({ updatedGoal: updatedGoal });
});

router.post("/completed", async (req, res, next) => {
  const { goalId } = req.body;
  const updatedGoal = await Goals.findByIdAndUpdate(
    goalId,
    { $set: { completed: true } },
    {
      new: true,
    }
  );
  res.status(200).json({ updatedGoal: updatedGoal });
});

router.post("/remove", async (req, res, next) => {
  const { goalId } = req.body;
  const goalsFromUser = await User.findByIdAndUpdate(
    req.session.user._id,
    { $pull: { goals: goalId } },
    {
      new: true,
    }
  ).populate([
    {
      path: "goals",
      populate: {
        path: "goals",
        model: "Goal",
      },
    },
  ]);
  res.status(200).json({ goals: goalsFromUser.goals });
});

module.exports = router;
