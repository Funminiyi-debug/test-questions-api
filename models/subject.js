const mongoose = require("mongoose");
const SubjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    passages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Passage" }],
  },
  { timestamps: true }
);
exports.subjectSchema = SubjectSchema;
exports.Subject = mongoose.model("Subject", SubjectSchema);
// module.exports = mongoose.model("Subject", SubjectSchema);
