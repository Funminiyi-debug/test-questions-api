const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const app = express();
// dotenv use
dotenv.config({ path: "./secrets/.env" });
const PORT = 2000 || process.env.PORT;

require("./config/db")();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use("/api/questions", require("./routes/questions.route"));
app.use("/api/subjects", require("./routes/subjects.route"));
app.use("/api/passages", require("./routes/passages.route"));
app.use("/api/users", require("./routes/users.route"));

app.use("*", (req, res) => {
  res.status(404).json({ message: "doesn't exist" });
});

app.get("/questions", (req, res) => res.json({ message: "this is working" }));

app.listen(PORT, () =>
  console.log("listening on port http://localhost:" + PORT)
);
