const mongoose = require("mongoose");
const QuestionSchema = new mongoose.Schema(
  {
    description: { type: String },
    subject: { type: mongoose.SchemaTypes.ObjectId, ref: "Subject" },
    alternative: [
      {
        text: { type: String, required: true },
        isCorrect: { type: Boolean, required: true, default: false },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", QuestionSchema);
