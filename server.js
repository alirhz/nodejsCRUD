const express = require("express");
const mongoose = require("mongoose");
const ProductRouter = require("./routes/ProductRoutes.js");
const User = require('./models/users');
const bodyParser = require('body-parser');
const environment = require('./procces.env');
const jsonwebtoken = require("jsonwebtoken");

const app = express();


app.use(express.json());
app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", environment.FRONTEND_APP_HOST);

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.use('/uploads', express.static('./uploads'));

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

  app.use(ProductRouter);

  var routes = require('./routes/userRoute');
  routes(app);

  app.use(function(req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
  });
  
// Set EJS as templating engine 
  app.set("view engine", "ejs");

  mongoose.connect(
    'mongodb+srv://AliRghi:ali123@cluster0.gktce.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json({limit: '50mb'}))
app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}))


app.listen(3000, () => {
  console.log("Server is running:" + 3000);
});

module.exports = app;