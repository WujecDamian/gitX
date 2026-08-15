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

router.post("/:recipientId", ChatController.getOrCreateChat);
router.get("/group/:groupId", ChatController.getGroupChat);

export default router;
