const mongoose = require("mongoose");

const alternativeSchema = new mongoose.Schema({
  alternatives: {
    text: { type: String, required: true },
    userChoice: { type: Boolean, required: true, default: false },
  },
});

const subjectSchema = new mongoose.Schema({
  subject: {
    name: String,
    _id: mongoose.Schema.Types.ObjectId,
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
    subjectsSaved: { type: mongoose.Schema.Types.Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
