const { Schema, model } = require("mongoose");

const goalSchema = new Schema({
  title: String,
  start: Date,
  end: Date,
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
  completed: {
    type: Boolean,
    default: false,
  },
});

const Goal = model("Goal", goalSchema);

module.exports = Goal;