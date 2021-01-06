const mongoose = require("mongoose");
const SubjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  },
  { timestamps: true }
);
exports.subjectSchema = SubjectSchema;
exports.Subject = mongoose.model("Subject", SubjectSchema);
// module.exports = mongoose.model("Subject", SubjectSchema);
