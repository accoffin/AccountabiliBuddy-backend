const { Schema, model } = require("mongoose");

const activitySchema = new Schema({
  title: String,
  start: Date,
  end: Date,
  category: String,
  goals: [
    {
      type: Schema.Types.ObjectId,
      ref: "Goal",
    },
  ],
  availability: [
    {
      type: Schema.Types.ObjectId,
      ref: "Availability",
    },
  ],
  achievements: [
    {
      type: Schema.Types.ObjectId,
      ref: "Achievements",
    },
  ],
});

const Activity = model("Activity", activitySchema);

module.exports = Activity;
