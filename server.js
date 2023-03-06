const express = require("express");
const cors = require("cors");
const app = express();

//middlewares
app.use(cors());

app.use(express.json()); //req for post req

//port

const PORT = process.env.PORT || 4000;

//listening for request
app.listen(PORT, () => {
  console.log(`server listening from ${PORT}`);
});
