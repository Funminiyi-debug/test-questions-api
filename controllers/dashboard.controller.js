const Passage = require("../models/passage");
const { Subject } = require("../models/subject");
const User = require("../models/user");
const {
  getPercentageCorrectOverall,
  getpercentageCorrectPerSubject,
  getAverageTimeTaken,
  getPercentCorrectForUser,
  getAverageTimeTakenForUser,
} = require("../helpers/dashboardMetrics");

const dashboardMetrics = async (req, res) => {
  const allUsers = await User.find({});

  // percentage correct overall
  const percentageCorrectOverall = getPercentageCorrectOverall(allUsers);

  // average time taken to finish exams
  const averageTimeTaken = getAverageTimeTaken(allUsers);

  res.status(200).json({
    response: {
      percentageCorrectOverall,
      averageTimeTaken,
    },
    success: true,
  });
};

const passageMetrics = async (req, res) => {
  // percent correct for different passages

  return res.json({ message: "passage metrics" });
};

const userMetrics = async (req, res) => {
  const { userid } = req.query;

  if (!userid) {
    return res
      .status(400)
      .json({ success: false, message: "userid is compulsory" });
  }
  // percent correct for  user
  const user = await User.findOne({ _id: userid });
  const percentCorrect = getPercentCorrectForUser(user);
  // average time taken to finish exam
  const averageTimeTaken = getAverageTimeTakenForUser(user);

  return res.status(200).json({
    response: {
      user: { name: user.name, email: user.email },
      percentCorrect,
      averageTimeTaken,
    },
    success: true,
  });
};

const subjectMetrics = async (req, res) => {
  const allUsers = await User.find({});
  const allSubjects = await Subject.find({});
  // percentage correct per subject
  const percentageCorrectPerSubject = getpercentageCorrectPerSubject(
    allUsers,
    allSubjects
  );

  return res
    .status(200)
    .json({ response: { percentageCorrectPerSubject }, success: true });
};
module.exports = {
  dashboardMetrics,
  subjectMetrics,
  passageMetrics,
  userMetrics,
};
