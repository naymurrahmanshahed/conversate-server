const chatModel = require("../models/chatModel");

//create chat

const createChat = async (req, res) => {
  const { firstId, secondId } = req.body;

  try {
    // check exist chat
    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] },
    });

    if (chat) {
      return res.status(200).json(chat);
    }
    //create new chat

    const newChat = await chatModel.create({
      members: [firstId, secondId],
    });

    res.status(200).json(newChat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//find all chat

const findAllChats = async (req, res) => {
  const { userId } = req.params;

  try {
    const chats = await chatModel.find({
      //only one
      members: { $in: [userId] },
    });
    res.status(200).json(chats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//find a single chat

module.exports = { createChat, findAllChats };
