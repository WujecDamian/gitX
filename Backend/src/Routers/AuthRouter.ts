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
router.get("/logout", isAuthenticated, authController.logOutUser);

export default router;
