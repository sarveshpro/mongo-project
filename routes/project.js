const express = require("express");
const Project = require("../models/project");
const Category = require("../models/category");
const router = express.Router();

// Add a new project
router.post("/add", async (req, res) => {
  try {
    let category = await Category.findOne({ name: req.body.category });
    if (!category) {
      category = new Category({ name: req.body.category });
      category = await category.save();
    }
    const project = new Project({
      name: req.body.name,
      // add the category id to the project
      category: category._id,
    });
    project.save();
    res.status(200).json(project);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//Get all projects
router.get("/", async (req, res) => {
  try {
    const data = await Project.find().populate("category");
    console.log(data);
    // return data in a html table
    res.status(200).send(
      `
      <html>
        <head>
            <title>Projects</title>
            <style>
                table, th, td {
                    border: 1px solid black;
                    border-collapse: collapse;
                }
            </style>
        </head>
        <body>
      <table>
            <tr>
                <th>ID</th>
                <th>Project Name</th>
                <th>Category Name</th>
            </tr>
            ${data
              .map((project) => {
                return `<tr>
                    <td>${project.id}</td>
                    <td>${project.name}</td>
                    <td>${project.category?.name || "No Category"}</td>
                </tr>`;
              })
              .join("")}
        </table>
        </body>
        </html>`
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update project by ID
router.patch("/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Delete project by ID
router.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    res.status(200).json(project);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
