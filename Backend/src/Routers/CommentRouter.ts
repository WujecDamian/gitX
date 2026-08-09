import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import * as CommentController from "../Controllers/CommentController";

const router = express.Router();

//get user / group Comments
router.get("/:postId", CommentController.getPostComments);
router.get("/getComment/:commentId", CommentController.getComment);

//create | delete
router.delete("/delete/:commentId", CommentController.deleteComment);
router.post("/create/:postId", CommentController.createComment);

router.post(
  "/create/:postId/comment/:commentId",
  CommentController.createSubComment,
);

export default router;
