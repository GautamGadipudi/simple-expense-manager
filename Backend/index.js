var app = require('express')();
var http = require('http').Server(app);
// var MongoClient = require('mongodb').MongoClient;
// var mongodb = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/VVExpenseManager");

const {
  Expense
} = require('./Models/Expense')

var bodyParser = require('body-parser');

app.use(bodyParser.json({
  extended: true
}));

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

//GET all expenses
app.get("/all", (req, resp, next) => {
  Expense.find().then((expenses) => {
    resp.send({
      expenses
    })
  }, (e) => {
    res.status(400).send(e);
  });
});

//POST an expense
app.post("/addExpense", (req, resp, next) => {
  var expense = new Expense({
    type: req.body.type,
    name: req.body.name,
    amount: req.body.amount
  });

  expense.save().then((doc) => {
    resp.send(JSON.stringify(doc));
  }, (e) => {
    resp.status(400).send(e);
  })
});

//DELETE an expense by id
app.delete("/deleteExpense/:id", (req, res, next) => {
  var id = req.params.id;
  Expense.findByIdAndRemove(id).then((expense) => {
    if (expense) {
      res.send({
        expense
      });
    } else {
      return res.status(404).send();
    }
  }).catch((e) => {
    res.status(400).send();
  });
});

http.listen(3000, function() {
  console.log("Listening at localhost:3000");
});
