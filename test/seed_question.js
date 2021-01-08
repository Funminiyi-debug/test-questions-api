const Question = require("../models/question");
const Passage = require("../models/passage");
const questionsData = require("./questions_data");
let added = 0;

const passages = require("./passages_data");
// dotnev
require("dotenv").config({ path: "./secrets/.env" });

// connect to db
require("../config/db")();
const DO = async () => {
  try {
    const passages = await Passage.find({});

    // loop through each passage
    passages.forEach(async (passage) => {
      const newQuestion1 = new Question({
        ...questionsData[0],
        passage: passage._id,
      });

      //   add the question

      await newQuestion1.save();

      const newQuestion2 = new Question({
        ...questionsData[1],
        passage: passage._id,
      });

      //   add the question
      await newQuestion2.save();

      //  add question to passage
      passage.questions.push(newQuestion1);
      passage.questions.push(newQuestion2);

      console.log(
        "question 1 " + newQuestion1 + " for passage " + passage.passagename
      );
      "question 1 " + newQuestion2 + " for passage " + passage.passagename;

      const status = await passage.save();

      console.log(status.name);
      process.exit(1);
    });
  } catch (error) {
    console.log(error);
  }
};

DO();
