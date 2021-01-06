const mongoose = require("mongoose");
const SubjectSchema = new mongoose.Schema(
  {
    name: { type: String },
    questions: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Question" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subject", SubjectSchema);
