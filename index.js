// import packages
const express = require("express");
const mongoose = require("mongoose");

// import environment variables
require("dotenv").config();

// import routes
const projectRoutes = require("./routes/project");
const categoryRoutes = require("./routes/category");

// mongodb connection string
const mongoString = process.env.MONGODB_URL;

// connect to mongodb
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

// initialize express
const app = express();
app.use(express.json());

// use routes
app.use("/project", projectRoutes);
app.use("/category", categoryRoutes);

// home route
app.get("/", function (req, res) {
  res.send("Hello World");
});

// start server
app.listen(3000, () => {
  console.log(`Server Started at ${3000}`);
});
