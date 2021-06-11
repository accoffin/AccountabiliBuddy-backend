const router = require("express").Router();
// const { response } = require("express");
const Goals = require("../models/Goal.model");

router.get("/", async (req, res, next) => {
  const allGoals = await Goals.find({});
  res.status(200).json({ allGoals });
});

module.exports = router;
