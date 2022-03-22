const express = require("express");
const ProductModel = require("../models/Product");
const app = express();

app.get("/Products", async (request, response) => {
  const Products = await ProductModel.find({});
  try {
    response.send(Products);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/Product", async (request, response) => {
    const Product = new ProductModel(request.body);
  
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
