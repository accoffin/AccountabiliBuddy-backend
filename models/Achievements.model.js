const { Schema, model } = require("mongoose");

const achievementSchema = new Schema({
  name: String,
  startDate: Date,
  endDate: Date,
  category: String,
  goals: {
    type: Schema.Types.ObjectId,
    ref: "GoalSet",
  },
  users: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Achievement = model("Achievement", achievementSchema);

module.exports = Achievement;
