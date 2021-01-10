const Passage = require("../models/passage");
const { Subject } = require("../models/subject");
// create passage
const createPassage = async (req, res) => {
  try {
    const { passage, passagename, subjectid } = req.body;
    if (!passage || !passagename || !subjectid) {
      return res
        .status(400)
        .json({ message: "all fields must be filled", success: false });
    }

    // check if subject exist
    const subject = await Subject.findById(subjectid);
    if (!subject) {
      return res.status(404).json({ message: "subject not found" });
    }

    //check for passage
    const exists = await Passage.find({ passage, passagename });

    if (exists.length > 0) {
      return res
        .status(409)
        .json({ message: "passage already exist", success: false });
    }

    let passageToSave = await Passage.create({
      passagename,
      passage,
      subject: subjectid,
    });

    await passageToSave.save();

    subject.push(passageToSave);

    await subject.save();

    // success
    return res
      .location("/passages/" + passageToSave._id)
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
const updatePassage = async (req, res) => {
  const { passage, passagename, subjectid } = req.body;

  if (!passage || !passagename || !subjectid) {
    return res
      .status(400)
      .json({ message: "all fields must be filled", success: false });
  }
  try {
    const subject = await Subject.findById(subjectid);
    if (!subject) {
      return res.status(404).json({ message: "subject not found" });
    }
    const passageToUpdate = await Passage.findById(req.params.id);

    passageToUpdate.passage = passage;
    passageToUpdate.passagename = passagename;
    passageToUpdate.subject = subjectid;
    await passageToUpdate.save();

    return res.status(201).json({ message: "passage updated", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something happened with the server", success: false });
  }
};

// delete subject
const deletePassage = async (req, res) => {
  const { id } = req.params;
  try {
    const passage = Passage.findById(id);
    if (!passage) {
      return res
        .status(404)
        .json({ message: "passage not found", success: false });
    }

    const status = await Passage.deleteOne(subject);

    return res
      .status(200)
      .json({ message: "question deleted", status, success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something happened with the server", success: false });
  }
};

// get one subject
const getOnePassage = async (req, res) => {
  try {
    const passage = await Passage.findById(req.params.id)
      .populate("questions")
      .populate("subject");
    return res.status(200).json({ passage, success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something happened with the server", success: false });
  }
};

// get all subjects
const getAllPassages = async (req, res) => {
  try {
    const passages = await Passage.find({})
      .populate("questions")
      .populate("subject");
    return res.status(200).json({ passages, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something happened with the server",
      success: false,
    });
  }
};

const getPassagesBySubject = async (req, res) => {
  const subjectid = req.params.subjectid;
  if (!subjectid) {
    return res
      .status(400)
      .json({ message: "subject cannot be empty", success: false });
  }
  try {
    const passages = await Passage.find({ subject: subjectid })
      .populate("questions")
      .populate("alternatives");

    console.log(passages);
    if (passages.length == 0) {
      return res.status(404).json({
        message: "passages not found for that subject",
        success: false,
      });
    }
    return res.status(200).json({ passages, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "something happened with the server", success: false });
  }
};

module.exports = {
  createPassage,
  updatePassage,
  deletePassage,
  getAllPassages,
  getOnePassage,
  getPassagesBySubject,
};
