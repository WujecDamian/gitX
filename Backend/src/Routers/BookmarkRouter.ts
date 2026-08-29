import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import * as BookmarkController from "../Controllers/BookmarkController";

const router = express.Router();

router.post("/comment/:commentId", BookmarkController.bookmarkComment);
router.post("/post/:postId", BookmarkController.bookmarkPost);
router.delete("/post/:postId", BookmarkController.unbookmarkPost);

//get bookmarked posts
router.get("/:postId", BookmarkController.getBookmarkedPosts);

export default router;
