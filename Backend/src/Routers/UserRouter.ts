import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import * as UserController from "../Controllers/UserController";

const router = express.Router();
//get user profile
router.get("/profile/:userId", UserController.getUserProfile);
//get following & followers
router.get("/:userId/following", UserController.getUserFollowing);
router.get("/:userId/followers", UserController.getUserFollowers);

//user delete
router.delete("/delete", UserController.deleteUser);

//user edit routes
router.put("/edit", UserController.updateProfile);

//i can remove these later if we want to keep it simple
router.put("/edit/bio", UserController.editUserBio);
router.put("/edit/tags", UserController.editUserTags);
router.put("/edit/socials", UserController.editUserSocials);
router.put("/edit/displayName", UserController.editUserDisplayName);
router.put("/edit/profilePicture", UserController.editUserPfp);
router.put("/edit/bannerPicture", UserController.editUserBanner);

export default router;
