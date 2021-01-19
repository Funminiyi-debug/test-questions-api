const mongoose = require("mongoose");
const QuestionSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    passage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Passage",
      required: true,
    },
    alternatives: [
      {
        text: { type: String, required: true },
        isCorrect: { type: Boolean, required: true, default: false },
      },
    ],
    isViewed: { type: Boolean, default: false },
    answerExplanation: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", QuestionSchema);
