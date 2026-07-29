import { Router } from "express";
import * as authController from "../Controllers/AuthController";
import isAuthenticated from "../Authentication/isAuthenticated";

const router = Router();

// Routes
router.get("/error", authController.loginError);
router.get("/github", authController.authenticateUser);
router.get(
  "/github/callback",
  authController.callbackAuthenticate,
  authController.handleSuccess,
);
//important! post here because site crawlers might hit logout route and logout user randomly
router.post("/logout", isAuthenticated, authController.logOutUser);

export default router;
