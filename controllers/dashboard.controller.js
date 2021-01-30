const Passage = require("../models/passage");
const { Subject } = require("../models/subject");
const User = require("../models/user");
const {
  getPercentageCorrectOverall,
  getpercentageCorrectPerSubject,
} = require("../helpers/dashboardMetrics");

const dashboardMetrics = async (req, res) => {
  const allUsers = await User.find({});
  const allSubjects = await Subject.find({});

  // percentage correct overall
  const percentageCorrectOverall = getPercentageCorrectOverall(allUsers);
  // percentage correct per subject
  const percentageCorrectPerSubject = getpercentageCorrectPerSubject(
    allUsers,
    allSubjects
  );
  // percent correct for different passages

  // average time taken to finish exams

  res.json({
    message: "metrics working!!!",
    percentageCorrectOverall,
    success: true,
  });
};

module.exports = { dashboardMetrics };
