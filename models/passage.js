const mongoose = require("mongoose");
const PassageSchema = new mongoose.Schema(
  {
    passage: { type: String, required: true },
    passagename: { type: String, required: true },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    questions: [
      {
        text: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "Question",
          required: true,
        },
      },
    ],
    isViewed: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Passage", PassageSchema);
