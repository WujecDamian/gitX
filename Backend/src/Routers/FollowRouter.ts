import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import * as InviteController from "../Controllers/InviteController";

const router = express.Router();

//get following/followed by
router.get("user/:userId/followed/", InviteController.getFollowedByList);
router.get("user/:userId/following/", InviteController.getFollowingList);

//like | unlike
router.post("/user/:userId", InviteController.followUser);
router.delete("/user/:userId", InviteController.unfollowUser);

export default router;
