const { Schema, model } = require("mongoose");

const goalSchema = new Schema({
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
  users: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Goal = model("Goal", goalSchema);

module.exports = Goal;
