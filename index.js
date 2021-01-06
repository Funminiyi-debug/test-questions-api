const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const app = express();
dotenv.config({ path: "./secrets/.env" });
const PORT = 2000 || process.env.PORT;

// require("./config/db")();

// dotenv use

app.use("/api", require("./routes/questions.route"));

app.listen(PORT, () =>
  console.log("listening on port http://localhost:" + PORT)
);
