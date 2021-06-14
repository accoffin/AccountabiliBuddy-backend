const { Schema, model } = require("mongoose");

const goalSchema = new Schema({
  name: String,
  startDate: Date,
  endDate: Date,
  activities: [
    {
      type: Array,
    },
  ],
  availability: [
    {
      type: Array,
    },
  ],
  achievements: [
    {
      type: Array,
    },
  ],
  user: [
    {
      type: Array,
    },
  ],
});

const Goal = model("Goal", goalSchema);

module.exports = Goal;
