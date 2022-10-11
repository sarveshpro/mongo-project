const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  // add a reference to the category model
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

module.exports = mongoose.model("Project", projectSchema);
