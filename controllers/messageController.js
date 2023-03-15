const messageModel = require("../models/messageModel");

//create message

const createMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;

  try {
    const message = await messageModel.create({
      chatId,
      senderId,
      text,
    });

    res.status(200).json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createMessage };
