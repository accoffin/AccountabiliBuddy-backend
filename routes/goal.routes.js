const router = require("express").Router();
// const { response } = require("express");
const Goals = require("../models/Goal.model");

router.get("/", async (req, res, next) => {
  const allGoals = await Goals.find({});
  res.status(200).json({ allGoals });
});

router.get("/:goalId", async (req, res, next) => {
  console.log("params", req.params.goalId);
  const { goalId } = req.params;
  const goalDetails = await Goals.findById({ goalId });
  res.status(200).json({ goalDetails });
});

router.post("/new", async (req, res, next) => {
  console.log("this is form from backend", req.body);
  const newGoal = await Goals.create(req.body);
  console.log("this is new goal results", newGoal);
  res.status(200).json({ newGoal });
});

module.exports = router;
