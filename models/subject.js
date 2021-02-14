const mongoose = require("mongoose");
const SubjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    passages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Passage" }],
  },
  { timestamps: true }
);

SubjectSchema.pre("remove", function (next) {
  Passage.remove({ subject: this._id }).exec();
  next();
});
exports.subjectSchema = SubjectSchema;
exports.Subject = mongoose.model("Subject", SubjectSchema);
// module.exports = mongoose.model("Subject", SubjectSchema);
