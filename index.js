const express = require("express");
const dotenv = require("dotenv");
const app = express();
const passport = require("passport");
const User = require("./models/user");
const bcrypt = require("bcrypt");
// dotenv use
dotenv.config({ path: "./secrets/.env" });
const PORT = process.env.PORT;

require("./config/db")();

// {
// origin: "http://localhost:8080/",
// optionsSuccessStatus: true,
// }
app.use(require("cookie-parser")(process.env.SECRETS));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./config/passport_config")(passport);

app.use(
  require("express-session")({
    secret: process.env.SECRETS,
    saveUninitialized: false,
    resave: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(require("cors")());

// logger
app.use((req, res, next) => {
  console.log(`${req.protocol}://${req.hostname}${req.url}`);
  console.log("logger area", req.user);
  next();
});

// routes
app.post("/api/login", passport.authenticate("local"), async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  console.log("this is you!", user);
  const tosend = {
    name: user.name,
    email: user.email,
    subjects: user.subjects,
  };
  return res.status(200).json({ user: tosend, success: true });
});

app.post("/api/logout", (req, res) => {
  req.logout();
  res.status(200).json({ message: "you are logged out", success: true });
});

app.post("/api/register", require("./controllers/users.controller").addUser);
app.use("/api/questions", require("./routes/questions.route"));
app.use("/api/subjects", require("./routes/subjects.route"));
app.use("/api/passages", require("./routes/passages.route"));
app.use("/api/users", require("./routes/users.route"));
app.use("/api/dashboard", require("./routes/dashboard.route"));

app.use("*", (req, res) => {
  res.status(404).json({ message: "doesn't exist" });
});

app.listen(PORT, () =>
  console.log("listening on port http://localhost:" + PORT)
);
