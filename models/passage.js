const mongoose = require("mongoose");
const PassageSchema = new mongoose.Schema(
  {
    passage: { type: String, required: true },
    passagename: { type: String, required: true },
    passageImages: [
      {
        name: String,
        data: Buffer,
        contentType: String,
      },
    ],
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    questions: [
      {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "Question",
        // required: true,

        description: { type: String, required: true },

        alternatives: [
          {
            text: { type: String, required: true },
            isCorrect: { type: Boolean, required: true, default: false },
          },
        ],
        isViewed: { type: Boolean, default: false },
        answerExplanation: { type: String },
      },
    ],
    isViewed: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Passage", PassageSchema);
