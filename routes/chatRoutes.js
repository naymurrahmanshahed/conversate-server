const express = require("express");
const {
  createChat,
  findAllChats,
  findASingleChat,
} = require("../controllers/chatControllers");

const router = express.Router();

//create chat
router.post("/", createChat);

//find all chats
router.get("/:userId", findAllChats);

//find a single chat

router.get("/find/:firstId/:secondId", findASingleChat);

module.exports = router;
