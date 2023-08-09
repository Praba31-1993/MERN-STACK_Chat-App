const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./Router/UserRouter");
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();

// Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/doc",express.static('./Docs'))
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

// Routes
app.get("/", (req, res) => {
  return res.status(200).send(`<html><body><div style="text-align: center;margin-top: 200;"><p style="font-family: serif;font-size: 20px;font-weight: bold;">Welcome to Praba chat Application</p><button><a href="http://localhost:4500/doc">Api Docs</a></button></div></body></html>`);
 });

app.use("/user", router)

// Connect to DB and start server

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Successfully Running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
