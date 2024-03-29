const Question = require("../models/question");
const { Subject } = require("../models/subject");
const Passage = require("../models/passage");

const createQuestion = async (req, res) => {
  const { description, subjectId, alternatives, passageid } = req.body;
  try {
    if (!description || !subjectId || alternatives.length == 0 || !passageid) {
      return res
        .status(400)
        .json({ message: "all fields must be filled", success: false });
    }

    //check for subject
    const passage = await Passage.findById(passageid);

    if (!passage) {
      return res
        .status(404)
        .json({ message: "passage does not exist", success: false });
    }

    let question = await Question.create({
      description,
      passage: passageid,
    });

    // add alternatives
    alternatives.forEach((alternative) => {
      question.alternatives.push(alternative);
    });

    await question.save();

    // const subject = await Subject.findById(subjectId);

    // push question to subject bank
    passage.questions.push(question);
    await passage.save();

    // success
    return res
      .location("/questions/" + question._id)
      .status(201)
      .json({ message: "Successfully created", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something happened with the server", success: false });
  }
};

const updateQuestion = async (req, res) => {
  const { description, passageid, alternatives } = req.body;
  try {
    if (!description || !subjectId || alternatives.length == 0 || !passageid) {
      return res
        .status(400)
        .json({ message: "all fields must be filled", success: false });
    }

    //check for subject
    const passage = await Passage.findById(subjectId);

    if (!passage) {
      return res
        .status(404)
        .json({ message: "passage does not exist", success: false });
    }

    // await Question.findByIdAndUpdate(req.params._id, {
    //   description,
    //   subjectId,
    //   alternatives: [...alternatives],
    // });

    // find the question to update
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res
        .status(404)
        .json({ message: "question does not exist", success: false });
    }

    question.description = description;
    question.passage = passageid;
    alternatives.forEach((alternative) => {
      question.alternatives = alternatives;
    });

    await question.save();

    return res.status(201).json({ message: "question updated", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something happened with the server", success: false });
  }
};

const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const question = Question.findById(id);
    if (!question) {
      return res
        .status(404)
        .json({ message: "question not found", success: false });
    }
    await Question.findByIdAndDelete(id);
    return res.status(200).json({ message: "question deleted", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something happened with the server", success: false });
  }
};

const getOneQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate("passage");
    if (!question) {
      return res
        .status(404)
        .json({ message: "question not found", success: false });
    }
    return res.status(200).json({ question, success: "true" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something happened with the server", success: false });
  }
};

const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find({}).populate("passage");
    return res.status(200).json({ questions, success: "true" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something happened with the server",
      success: false,
    });
  }
};

module.exports = {
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getAllQuestions,
  getOneQuestion,
};
