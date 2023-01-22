const express = require("express");
const cors = require("cors");
require('dotenv').config();
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const Products = require("./Products"); 
const Users= require("./Users");
const { isAuth,isAdmin} =require('./utils.js');
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

  //console.log("Product Detail >>", productDetail);

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


app.post("/auth/signup",expressAsyncHandler(async (req, res) => {
  const schema = Joi.object({
    fullName: Joi.string().min(4).max(30).required(),
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().min(6).max(200).required(),
    
  });
  const { email, password, fullName } = req.body;
 
  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

 
  const encrypt_password = await bcrypt.hash(password, 10);

  const userDetail = {
    email: email,
    password: encrypt_password,
    fullName: fullName,
  };

  const user_exist = await Users.findOne({ email: email });

  if (user_exist) {
    res.send({ message: "The Email is already in use !" });
  } else {
    Users.create(userDetail, (err, result) => {
      if (err) {
        res.status(500).send({ message: err.message });
      } else {
        res.send({ message: "User Created Succesfully" });
      }
    });
  }
}))
 

// API for LOGIN

app.post("/auth/login",expressAsyncHandler( async (req, res) => {
  const { email, password } = req.body;

  const userDetail = await Users.findOne({ email: email });

  if (userDetail) {
    if (await bcrypt.compare(password, userDetail.password)) {
      res.send(userDetail);
    } else {
      res.send({ error: "invaild Password" });
    }
  } else {
    res.send({ error: "user is not exist" });
  }
}));


app.listen(port, () => console.log("listening on the port", port));