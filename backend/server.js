const express = require("express");
const cors = require("cors");
require('dotenv').config();
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const Products = require("./Products"); 
const User = require("./Users");
//const { isAuth,isAdmin} =require('./utils.js');
const expressAsyncHandler=require('express-async-handler');
const app = express();
const port = process.env.PORT || 7777 ;

// Middlewares
app.use(express.json());
app.use(cors());

// connection url

require("./connection")
// API

app.get("/", (req, res) => res.status(200).send("Home Page"));

// add product

app.post("/products/add", expressAsyncHandler((req, res) => {
  const productDetail = req.body;

  console.log("Product Detail >>", productDetail);

  Products.create(productDetail, (err, data) => {
    if (err) {
      res.status(500).send(err.message);
      console.log(err);
    } else {
      res.status(201).send(data);
      
    }
  });
}));

app.get("/products/get", expressAsyncHandler((req, res) => {
  Products.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
}));

// API for SIGNUP

app.post("/auth/signup",expressAsyncHandler(async (req, res) => {
  const schema = Joi.object({
    fullName: Joi.string().min(4).max(30).required(),
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().min(6).max(200).required(),
    isAdmin:Joi.required()
  });
 
  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const newUser = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
  });
  const user = await newUser.save();
  res.send({
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    isAdmin: user.isAdmin,
   
  });
}))
 

// API for LOGIN

app.post("/auth/login",expressAsyncHandler( async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        isAdmin: user.isAdmin,
       
      });
      return;
    }
  }
  res.status(401).send({ message: 'Invalid email or password' });
}));



app.listen(port, () => console.log("listening on the port", port));