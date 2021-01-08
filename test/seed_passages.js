const Passage = require("../models/subject");

let added = 0;

const passages = require("./passages_data");
// dotnev
require("dotenv").config({ path: "./secrets/.env" });

// connect to db
require("../config/db")();
try {
  // create the subjects
  passages.map(async (passage) => {
    const status = await passage.save();
    added += 1;
    console.log(status.passagename + " created");
  });
} catch (error) {
  console.log(error);
}
