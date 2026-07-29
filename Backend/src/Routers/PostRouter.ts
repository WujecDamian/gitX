import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import * as PostController from "../Controllers/PostController";

const router = express.Router();

// middleware that is specific to this router

// define the home page route
router.get("/", (req: Request, res: Response) => {
  console.log(req.user);
  res.json({ user: req.user });
});
//get user / group posts
router.get("/", PostController.getAllPosts);
router.get("/:userId", PostController.getFollowingPosts);
router.get("user/:userId", PostController.getUserPosts);
router.get("group/:groupId", PostController.getGroupPosts);

//create | delete
router.delete("/delete/:postId", PostController.deletePost);
router.post("/create", PostController.createPost);

export default router;
