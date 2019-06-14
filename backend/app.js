const path = require("path");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes  = require('./routes/posts');

//123P3sugrpYJK4Co
mongoose.connect('mongodb+srv://harry:sonam1234@cluster0-5sxkd.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser: true})
.then(() =>{
  console.log('connected');
})
.catch(() => {
  console.log("failed");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use("/images", express.static(path.join("backend/images")));

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OTHERS");
  next();
});

app.use('/post', routes);




module.exports = app;
