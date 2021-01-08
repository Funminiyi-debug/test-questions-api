const mongoose = require("mongoose");

const alternativeSchema = new mongoose.Schema({
  alternatives: {
    text: { type: String, required: true },
    userChoice: { type: Boolean, required: true, default: false },
  },
});

const questionSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  alternatives: [alternativeSchema],
});

const passageSchema = new mongoose.Schema({
  passage: { type: String, required: true },
  passagename: { type: String, required: true },
  questions: [questionSchema],
});

const subjectSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  score: { type: Number, required: true, default: 0 },
  answers: [passageSchema],
});

subjectSchema.virtual("noOfQuestionsAnswered").get(() => this.answers.length);

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    // subjects: [subjectSchema],
    subjects: [
      {
        subject: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "subject",
        },
        passage: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "passage",
        },
        question: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "question",
        },
        userAnswer: { type: mongoose.Schema.Types.ObjectId, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
