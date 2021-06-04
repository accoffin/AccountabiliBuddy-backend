require("dotenv").config();
const Celebrity = require("../models/Celebrity.model");
// const Movie = require("../models/movie.model");
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

const movies = [
  {
    title: "Titanic",
    genre: "action",
  },
  {
    title: "Inception",
    genre: "action",
  },
  {
    title: "Terminator",
    genre: "action",
  },
];

// establish a connection to the db
async function seedTheDb() {
  await require("./index.js");
  Celebrity.create(celebrities)
    .then((responseFromDB) => {
      console.log(`${responseFromDB.length} entries have been added`);
      mongoose.connection.close();
    })
    .catch((err) => console.log("err", err));
}
seedTheDb();
