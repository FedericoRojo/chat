const {Router} = require("express");
const express = require("express");
const chatController = require("../controllers/chatController");

const chatRouter = Router();

chatRouter.use(express.urlencoded({ extended: true }));

chatRouter.get("/", chatController.getAllMessages);
chatRouter.get("/new", chatController.getNewMessage);
chatRouter.post("/new", chatController.postNewMessage);
chatRouter.get('/message/:id', chatController.getMessageDetail);

module.exports = chatRouter;