const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const projectRoutes = require("./routes/project");
const categoryRoutes = require("./routes/category");

const mongoString = process.env.MONGODB_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

const app = express();

app.use(express.json());

app.use("/project", projectRoutes);
app.use("/category", categoryRoutes);

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log(`Server Started at ${3000}`);
});
