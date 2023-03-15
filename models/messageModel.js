const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  chatId: String,
  senderId: String,
  text: String,
});

const messageModel = mongoose.model("Message", messageSchema);

module.exports = messageModel;
