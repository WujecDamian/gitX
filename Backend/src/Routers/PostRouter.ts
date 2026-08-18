import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import * as PostController from "../Controllers/PostController";

const router = express.Router();

//get user / group posts
router.get("/", PostController.getAllPosts);
router.get("/getPost/:postId", PostController.getPostById);
router.get("/postWithComments/:postId", PostController.getPostWithCommentsById);

router.get("/following/:userId", PostController.getFollowingPosts);
router.get("/user/:userId", PostController.getUserPosts);
router.get("/group/:groupId", PostController.getGroupPosts);

//create | delete
router.delete("/delete/:postId", PostController.deletePost);
router.post("/create", PostController.createPost);

export default router;
