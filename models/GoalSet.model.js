const { Schema, model } = require("mongoose");

const goalSetSchema = new Schema({
  name: String,
  startDate: Date,
  endDate: Date,
  activities: {
    type: Schema.Types.ObjectId,
    ref: "Activities",
  },
  availability: {
    type: Schema.Types.ObjectId,
    ref: "Availability",
  },
  achievements: {
    type: Schema.Types.ObjectId,
    ref: "Achievements",
  },
});

const GoalSet = model("GoalSet", goalSetSchema);

module.exports = GoalSet;
