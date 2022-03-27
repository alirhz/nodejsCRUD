const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
    image: {}
  });

  const Image = mongoose.model("Image", ImageSchema);

  module.exports = Image;