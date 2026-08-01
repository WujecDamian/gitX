import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import * as MessageController from "../Controllers/MessageController";

const router = express.Router();

//like | unlike
router.post("/chat/:chatId", MessageController.sendMessage);
router.get("/groupChat/:chatId", MessageController.sendGroupMessage);

export default router;
