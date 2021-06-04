const { Schema, model } = require("mongoose");

const goalSetSchema = new Schema({
  name: String,
});

const GoalSet = model("GoalSet", userSchema);

module.exports = GoalSet;
