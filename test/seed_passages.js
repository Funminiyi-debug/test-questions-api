const Subject = require("../models/subject");

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
    console.log(status.passagename + " created", added);
    const subject = await Subject.Subject.findById(passage.subject);
    subject.passages.push(passage);
    await subject.save();
    console.log("done");
  });
  // process.exit(1);
} catch (error) {
  console.log(error);
}
