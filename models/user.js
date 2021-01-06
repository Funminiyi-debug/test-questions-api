const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subjects: [
      {
        subject: { type: String, required: true },
        score: { type: Number, required: true, default: 0 },
        answers: [
          {
            description: { type: String, required: true },
            alternatives: [
              {
                text: { type: String, required: true },
                userChoice: { type: Boolean, required: true, default: false },
              },
            ],
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
