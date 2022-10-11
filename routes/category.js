const express = require("express");
const Category = require("../models/category");
const router = express.Router();

// Add a new category
router.post("/add", (req, res) => {
  try {
    const category = new Category({
      name: req.body.name,
    });
    category.save();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Get all categories
router.get("/", async (req, res) => {
  try {
    const data = await Category.find();
    // return data in a html table
    res.status(200).send(
      `
      <html>
        <head>
            <title>Categories</title>
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
                <th>Category Name</th>
            </tr>
            ${data
              .map((category) => {
                return `<tr>
                    <td>${category.id}</td>
                    <td>${category.name}</td>
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

//Update category by id
router.patch("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Delete category by id
router.delete("/:id", async (req, res) => {
  try {
    const category = await Project.findByIdAndDelete(req.params.id);
    res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
