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

      const newQuestion3 = new Question({
        ...questionsData[2],
        passage: passage._id,
      });

      //   add the question
      await newQuestion3.save();

      //  add question to passage

      passage.questions = [
        newQuestion1,
        newQuestion2,
        newQuestion3,
        ...passage.questions,
      ];

      const status = await passage.save();
    });
    // process.exit(1);
  } catch (error) {
    console.log(error);
  }
};

DO();
