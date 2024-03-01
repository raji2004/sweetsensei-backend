// dependencies
const express = require("express");
// const cors = require("cors");
const mongoose = require("mongoose");
const { readdirSync } = require("fs");
const dotenv = require("dotenv");
const app = express();
console.log(readdirSync("./routes"))

dotenv.config();

// request
app.use(express.json());
app.get("/", (req, res) => {
  res.send("welcome from home");
});

// looping through folder to get routes
readdirSync("./routes").map((path) =>
  app.use("/", require(`./routes/${path}`))
);

// database
mongoose
  .connect("mongodb+srv://sweetsenseistore:7CF9twx9gUKw8xB6@cluster0.reghnje.mongodb.net/?retryWrites=true&w=majority", {})
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((e) => {
    console.log(`error connecting to database: ${e}`);
  });

// server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`sever is running on   http://localhost:${PORT}`);
});
