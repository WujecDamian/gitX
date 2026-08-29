import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import * as ChatController from "../Controllers/ChatController";

const router = express.Router();

//all chats for chat page
router.get("/getChats/", ChatController.getChats);
router.get("/getGroupChats/", ChatController.getGroupChats);

//specific chat (more detailed)
router.get("/getChat/:chatId", ChatController.getChat);
router.get("/getGroupChat/:chatId", ChatController.getGroupChat);

// send message to 1:1 Chat
router.post("/sendMessage/", ChatController.sendMessage);
// send message to group Chat
router.post("/sendGroupMessage/", ChatController.sendGroupMessage);

router.post("/createGroupChat", ChatController.createGroupChat);
router.post("/:recipientId", ChatController.getOrCreateChat);

export default router;
