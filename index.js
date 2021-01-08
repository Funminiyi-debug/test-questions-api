const express = require("express");
const dotenv = require("dotenv");
const app = express();
// dotenv use
dotenv.config({ path: "./secrets/.env" });
const PORT = process.env.PORT;

require("./config/db")();

// {
// origin: "http://localhost:8080/",
// optionsSuccessStatus: true,
// }
app.use(require("cors")());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.protocol}://${req.hostname}${req.url}`);
  next();
});

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
