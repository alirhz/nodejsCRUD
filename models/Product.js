const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) throw new Error("Negative price aren't real.");
      },
    },
    img:
    {
      data: Buffer,
      required: false,
      contentType: String
    }
  });

  const Product = mongoose.model("Product", ProductSchema);

  module.exports = Product;