const express = require("express");
const ProductModel = require("../models/Product");
const app = express();
var request = require("request");
var multer = require("multer"); 
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './uploads')
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname + '-' + Date.now() + '-' + getExtension(file));
  }
});

const uploader = multer({storage: storage}).single('img');

function getExtension(file) {
  // this function gets the filename extension by determining mimetype. To be exanded to support others, for example .jpeg or .tiff
  var res = "";
  if (file.mimetype === "image/jpeg") res = ".jpg";
  if (file.mimetype === "image/png") res = ".png";
  return res;
}

app.get("/Products", async (request, response) => {
  const Products = await ProductModel.find({});
  try {
    response.send(Products);
  } catch (error) {
    response.status(500).send(error);
  }
});


app.post("/product",uploader, async (request, response) => {

  var obj = {
    ...request.body,
    image: request.file
  }
  const Product = new ProductModel(obj);

  try {
    await Product.save();
    response.send(Product);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.put("/Product/:id", async (request, response) => {
  try {
    await ProductModel.findByIdAndUpdate(request.params.id, request.body);
    await ProductModel.save();
    response.send(Product);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.delete("/Product/:id", async (request, response) => {
  try {
    const Product = await ProductModel.findByIdAndDelete(request.params.id);

    if (!Product) response.status(404).send("No item found");
    response.status(200).send();
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;
