import { type NextFunction, type Request, type Response } from "express";
import passport from "passport";
import "../Authentication/passport-config";
import { prisma } from "../lib/prisma";

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5172";

const getUser = (req: Request, res: Response) => {
  /* if (!req.isAuthenticated() || !req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
    */
  if (!req.user) {
    return res.status(401).json({ message: "No user" });
  }

  res.json({ user: req.user });
};

const loginError = (req: Request, res: Response) => {
  res.json({ error: "Unknown Error" });
};

const guestLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const guest = await prisma.user.findUnique({
      where: { id: "g1th0b07-t8em-gu3s-tu53r-int3rv13ver7" },
    });
    if (!guest) {
      return res.status(500).json({
        error: "Guest account not found. Please run your database seeds.",
      });
    }
    req.login(guest, (error) => {
      if (error) {
        return next(error);
      }
      // Redirect to the frontend workspace just like a successful GitHub login
      console.log(FRONTEND_URL);
      return res.redirect(`${FRONTEND_URL}/`);
    });
  } catch (error) {
    return next(error);
  }
};

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("github", { scope: ["user:email"] })(req, res, next); // <- this needed to actually call the function, nothing happens when there's no (req, res, next). mogloby byc bez jesli byloby wywolane bezposrednio w definicji w routerze
  // moglbym po prostu dac w routerze passport.authenticate("github", { scope: ["user:email"] }) i by dzialalo.

  // for more info go to github strategy in passport-config.ts (this uses this strategy)
};

const redirectOnSuccess = (req: Request, res: Response) => {
  //res.json({ message: "Success", user: req.user });
  res.redirect(`${FRONTEND_URL}/`);
};

const callbackAuthenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate("github", { failureRedirect: "/auth/error" })(
    req,
    res,
    next,
  );
};

const logOutUser = (req: Request, res: Response, next: NextFunction) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }

    req.session.destroy((destroyError) => {
      if (destroyError) {
        return res
          .status(500)
          .json({ error: "Failed to destroy session cache" });
      }

      res.clearCookie("connect.sid", {
        path: "/",
      });

      return res.status(200).json({ message: "Successfully logged out!" });
    });
  });
};

export {
  getUser,
  guestLogin,
  loginError,
  authenticateUser,
  redirectOnSuccess,
  callbackAuthenticate,
  logOutUser,
};
