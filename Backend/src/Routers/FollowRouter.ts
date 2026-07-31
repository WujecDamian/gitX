import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import * as FollowController from "../Controllers/FollowController";

const router = express.Router();

//get following/followed by
router.get("user/:userId/followed/", FollowController.getFollowedByList);
router.get("user/:userId/following/", FollowController.getFollowingList);

//like | unlike
router.post("/user/:userId", FollowController.followUser);
router.delete("/user/:userId", FollowController.unfollowUser);

export default router;
