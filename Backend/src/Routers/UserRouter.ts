import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import * as UserController from "../Controllers/UserController";

const router = express.Router();
router.get("/search", UserController.searchUsers);
//get user profile
router.get("/profile/:userId", UserController.getUserProfile);
//get following & followers
router.get("/:userId/following", UserController.getUserFollowing);
router.get("/:userId/followers", UserController.getUserFollowers);

//user delete
router.delete("/delete", UserController.deleteUser);

//user edit routes
router.put("/edit", UserController.updateProfile);


export default router;
