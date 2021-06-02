const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  name: {
    type: String,
    // unique: true -> Ideally, should be unique, but its up to you
  },
  occupation: String,
  catchphrase: String,
  imgUrl: String,
});

const Celebrity = model("Celebrity", userSchema);

module.exports = Celebrity;
