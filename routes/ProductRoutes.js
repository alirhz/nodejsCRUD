const express = require("express");
const ProductModel = require("../models/Product");
const imageModel = require("../models/images");
const upload = require("../middleware/upload");
const environment = require("../procces.env.js");
const formidable = require("formidable");
const app = express();
var cors = require("cors");

app.get("/Products", async (request, response) => {
  const Products = await ProductModel.find({});
  try {
    response.send(Products);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/product", cors(), async (request, response) => {
  const Product = new ProductModel(request.body);
  console.log(123, request.body);
  try {
    console.log(Product);
    await Product.save();
    response.send(Product);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/api/upload", (req, res, next) => {
  const form = formidable({ multiples: true });
  // console.log(1,req.files);
  // console.log(image._id);

  form.on('file', function (name, file){
    console.log('Uploaded ' + file.name);
});

  form.parse(req, async (err, fields, files) => {
    // let obj;
    let json;
    // console.log(__dirname + "/data/" + files.name);
    // console.log(290,JSON.stringify(files));
    json = JSON.stringify(files);
    // form.on("fileBegin", function (name, file) {
    //   file.path = __dirname + "/data/" + file.name;
    //   console.log(123,file.path);
    // });

    // form.on("file", function (name, file) {
    //   console.log("Uploaded " + file.name);
    // });
    // obj = JSON.parse(json);
    // console.log(obj);
    const image = new imageModel(JSON.parse(json));
    // let payload = {files};
    // files.split('\n').forEach((c) => [key, payload[key]] = c.split('='));
    // console.log({files});
    // console.log(12, image,json(fields, files));
    // image = {
    //   ...image,
    //   fields, files
    // }
    if (err) {
      next(err);
      return;
    }
    // console.log(image);
    await image.save();
    res.send(image);
    // console.log(image);
    // await payload.save(payload);
    // console.log(image);

    // console.log(JSON.stringify(image));
    // console.log(image);
    // res.json({fields, files});
  });
});

app.get("/image/:id", async (request, response) => {
  console.log(150, request.params.id);
  // await imageModel.findById(request.params.id, request.body);
  // await imageModel.find({});
  const images = await imageModel.findById(request.params.id);
  console.log(images);
  // console.log(request);
  try {
    // response.send(Product);
    response.send(images);
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
