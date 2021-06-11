require("dotenv").config();
const GoalSet = require("../models/Goal.model");
const mongoose = require("mongoose");

const Goals = [
  {
    name: "goalOne",
  },
  {
    name: "goalTwo",
  },
  {
    name: "goalThree",
  },
];


// establish a connection to the db
async function seedTheDb() {
  await require("./index.js");
  GoalSet.create(Goals)
    .then((responseFromDB) => {
      console.log(`${responseFromDB.length} entries have been added`);
      mongoose.connection.close();
    })
    .catch((err) => console.log("err", err));
}
seedTheDb();
