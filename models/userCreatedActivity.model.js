const { Schema, model } = require("mongoose");

const userCreatedActivitySchema = new Schema({
  title: String,
  start: Date,
  end: Date,
  category: String,
  description: String,
  user: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const createdActivity = model("createdActivity", userCreatedActivitySchema);

module.exports = createdActivity;
