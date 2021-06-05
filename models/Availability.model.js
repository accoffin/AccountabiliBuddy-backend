const { Schema, model } = require("mongoose");

const availabilitySchema = new Schema({
  name: String,
  category: String,
  startDate: Date,
  endDate: Date,
  activities: {
    type: Schema.Types.ObjectId,
    ref: "Activities",
  },
  goals: {
    type: Schema.Types.ObjectId,
    ref: "GoalSet",
  },
});

const Availability = model("Availability", availabilitySchema);

module.exports = Availability;
