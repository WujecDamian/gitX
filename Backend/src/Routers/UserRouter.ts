import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import * as UserController from "../Controllers/UserController";

const router = express.Router();
//user delete
router.delete("/delete", UserController.deleteUser);

//user edit routes
router.put("/edit/bio", UserController.editUserBio);
router.put("/edit/tags", UserController.editUserTags);
router.put("/edit/socials", UserController.editUserSocials);
router.put("/edit/displayName", UserController.editUserDisplayName);
router.put("/edit/profilePicture", UserController.editUserPfp);
router.put("/edit/bannerPicture", UserController.editUserBanner);

export default router;
