import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import * as LikeController from "../Controllers/LikeController";

const router = express.Router();

//get liked posts
router.get("/:postId", LikeController.getLikedPosts);

//like | unlike
router.post("/post/:postId", LikeController.likePost);
router.delete("/post/:postId", LikeController.unlikePost);

router.post("/comment/:commentId", LikeController.likeComment);
router.delete("/comment/:commentId", LikeController.unlikeComment);

export default router;
