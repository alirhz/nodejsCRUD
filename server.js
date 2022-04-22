const express = require("express");
const mongoose = require("mongoose");
const ProductRouter = require("./routes/ProductRoutes.js");
const User = require('./models/users');
const bodyParser = require('body-parser');
var cors = require('cors')
const environment = require('./procces.env');
const jsonwebtoken = require("jsonwebtoken");

const app = express();


app.use(express.json());
app.use('/uploads', express.static('./uploads'));
app.use(cors());

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