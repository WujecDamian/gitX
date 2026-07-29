import { Router } from "express";
import * as authController from "../Controllers/AuthController";

const router = Router();

// Routes
router.get("/", authController.greetUser);
router.get("/error", authController.loginError);
router.get("/github", authController.authenticateUser);
router.get(
  "/github/callback",
  authController.callbackAuthenticate,
  authController.handleSuccess,
);

export default router;
