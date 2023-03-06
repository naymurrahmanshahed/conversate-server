require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const app = express();

//middlewares
app.use(cors());

app.use(express.json()); //req for post req

//port

const PORT = process.env.PORT || 4000;

//mongodb connect

mongoose
  .connect(process.env.MONGO_KEY)
  .then(() => {
    //listening for request
    app.listen(PORT, () => {
      console.log(`connected to mongodb listening port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
