import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import * as BookmarkController from "../Controllers/BookmarkController";

const router = express.Router();

//get Bookmarkd posts
router.get("/:postId", BookmarkController.getBookmarkedPosts);

//Bookmark | unBookmark
router.post("/post/:postId", BookmarkController.bookmarkPost);
router.delete("/post/:postId", BookmarkController.unbookmarkPost);

export default router;
