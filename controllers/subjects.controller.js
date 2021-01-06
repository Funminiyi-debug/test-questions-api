const { Subject } = require("../models/subject");

// create subject
const createSubject = async (req, res) => {
  const { name } = req.body;
  try {
    if (!name) {
      return res
        .status(400)
        .json({ message: "all fields must be filled", success: false });
    }

    //check for subject
    const exists = await Subject.find({ name: name });

    console.log(exists);
    if (exists.length > 0) {
      return res
        .status(409)
        .json({ message: "subject already exist", success: false });
    }

    let subject = await Subject.create({
      name,
    });

    subject.save();
    // success
    return res
      .location("/subjects/" + subject._id)
      .status(201)
      .json({ message: "Successfully created", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something happened with the server", success: false });
  }
};

// update subject
const updateSubject = async (req, res) => {
  const { name } = req.body;
  try {
    if (!name) {
      return res
        .status(400)
        .json({ message: "all fields must be filled", success: false });
    }

    //check for subject
    // await Subject.findByIdAndUpdate(req.params._id, {
    //   name,
    // });
    const question = await Subject.findById(req.params.id);
    if (!question) {
      return res
        .status(404)
        .json({ message: "question does not exist", success: false });
    }

    question.name = name;
    await question.save;

    return res.status(201).json({ message: "question updated", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something happened with the server", success: false });
  }
};

// delete subject
const deleteSubject = async (req, res) => {
  const { id } = req.params;
  try {
    const subject = Subject.findById(id);
    if (!subject) {
      return res
        .status(404)
        .json({ message: "subject not found", success: false });
    }

    const status = await Subject.deleteOne(subject);

    return res.status(200).json({ message: "question deleted", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something happened with the server", success: false });
  }
};

// get one subject
const getOneSubject = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id).populate("questions");
    return res.status(200).json({ subject, success: "true" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something happened with the server", success: false });
  }
};

// get all subjects
const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({}).populate("questions");
    return res.status(200).json({ subjects, success: "true" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something happened with the server",
      success: false,
    });
  }
};

module.exports = {
  createSubject,
  updateSubject,
  deleteSubject,
  getAllSubjects,
  getOneSubject,
};
