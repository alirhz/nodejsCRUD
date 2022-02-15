const express = require("express");
const mongoose = require("mongoose");
const foodRouter = require("./routes/foodRoutes.js");
const User = require('./models/users');
const bodyParser = require('body-parser');
const jsonwebtoken = require("jsonwebtoken");

const app = express();

const option = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    reconnectTries: 30000
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());

app.use(function(req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
      jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      });
    } else {
      req.user = undefined;
      next();
    }
  });

  var routes = require('./routes/userRoute');
  routes(app);

  app.use(function(req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
  });

  mongoose.connect(
    'mongodb+srv://madmin:<password>@cluster0.gktce.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(foodRouter);

app.listen(3000, () => {
  console.log("Server is running:" + 3000);
});

module.exports = app;