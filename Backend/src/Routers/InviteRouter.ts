import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import * as InviteController from "../Controllers/InviteController";

const router = express.Router();

//get liked posts
router.get("/received", InviteController.getReceivedInvites);
router.get("/sent", InviteController.getSentInvites);

//like | unlike
router.post("/send", InviteController.sendInvite);
router.delete("/cancel", InviteController.cancelInvite);

export default router;
