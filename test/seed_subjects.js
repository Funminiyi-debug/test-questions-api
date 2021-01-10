const { Subject } = require("../models/subject");
let added = 0;

const subjects = [
  new Subject({ name: "Chemistry/Physics" }),
  new Subject({ name: "Biology/Biochemistry" }),
  new Subject({ name: "CARS" }),
  new Subject({ name: "Psychology/Sociology" }),
];

// dotnev
require("dotenv").config({ path: "./secrets/.env" });

// connect to db
require("../config/db")();
try {
  // create the subjects
  subjects.map(async (subject) => {
    const status = await subject.save();
    added += 1;
    console.log(status.name + " created");
  });
  process.exit(1);
} catch (error) {
  console.log(error);
}
