const express = require("express");
const {
  createMessage,
  getMessage,
} = require("../controllers/messageController");

const router = express.Router();

//create message
router.post("/", createMessage);

//get message
router.get("/:chatId", getMessage);

module.exports = router;
