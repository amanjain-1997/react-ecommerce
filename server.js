const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");
var cors = require('cors')
var app = express()

app.use(bodyParser.json());
app.use(cors());


mongoose.connect("mongodb://localhost/sap-db", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const Product = mongoose.model(
  "products",
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    title: String,
    description: String,
    image: String,
    price: Number,
    quantity: Number,
    category: String
  })
);

const Order = mongoose.model(
  "orders",
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    name: String,
    email: String,
    adrress: String,
    cartItems: Array
  })
);

app.post("/api/submitorder", async (req, res) => {
  console.log(req.body);
  const order = new Order(req.body);
  const orderb = await order.save();
  console.log(orderb);
  res.send("true");
});

app.get("/api/products/:id", async (req, res) => {
  console.log(req.params.id)
  var products={};
  if (req.params.id=="all"){
   products = await Product.find();
  }
  else{
   products = await Product.find({category: req.params.id});
  }
  console.log(products);
  res.send(products);
});

app.post("/api/products", async (req, res) => {
  console.log(req.body);
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();
  res.send(savedProduct);
});

app.delete("/api/products/:id", async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  res.send(deletedProduct);
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("project runnning at http://localhost:5000"));
