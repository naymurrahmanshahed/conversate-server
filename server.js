require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");

//express app
const app = express();

//middlewares
app.use(cors());
app.use(express.json()); //req for post req

// endpoints
app.use("/api/user", userRoutes);

//port
const PORT = process.env.PORT || 4000;

//mongodb connect
mongoose
  .connect(process.env.MONGO_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    //listening for request
    app.listen(PORT, () => {
      console.log(`connected to mongodb listening port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
