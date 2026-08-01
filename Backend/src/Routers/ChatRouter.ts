import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import * as ChatController from "../Controllers/ChatController";

const router = express.Router();

//like | unlike
router.post("/user/:recipientId", ChatController.getOrCreateChat);
router.get("/group/:groupId", ChatController.getGroupChat);

export default router;
