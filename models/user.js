const mongoose = require("mongoose");

const alternativeSchema = new mongoose.Schema({
  alternatives: {
    text: { type: String, required: true },
    userChoice: { type: Boolean, required: true, default: false },
  },
});

// const questionSchema = new mongoose.Schema({
//   description: {
//     type: String,
//     required: true,
//   },
//   alternatives: [alternativeSchema],
// });

// const passageSchema = new mongoose.Schema({
//   passage: { type: String, required: true },
//   passagename: { type: String, required: true },
//   questions: [questionSchema],
// });

const subjectSchema = new mongoose.Schema({
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Subject",
  },
  score: { type: Number, required: true, default: 0 },
  answers: { type: mongoose.Schema.Types.Array },
  counter: { type: String },
});

subjectSchema.virtual("noOfQuestionsAnswered").get(() => this.answers.length);

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    subjects: [subjectSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
