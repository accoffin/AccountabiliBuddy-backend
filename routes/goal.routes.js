const router = require("express").Router();
// const { response } = require("express");
const Goals = require("../models/Goal.model");
const User = require("../models/User.model");

router.get("/", async (req, res, next) => {
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

router.get("/:goalId", async (req, res, next) => {
  const { goalId } = req.params;
  const goalDetails = await Goals.findById({ goalId });
  res.status(200).json({ goalDetails });
});

router.post("/new", async (req, res, next) => {
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

module.exports = router;
