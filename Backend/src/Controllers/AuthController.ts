import { type NextFunction, type Request, type Response } from "express";
import passport from "passport";
import "../Authentication/passport-config";
import { prisma } from "../lib/prisma";

const getUser = (req: Request, res: Response) => {
  if (!req.isAuthenticated() || !req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  res.json({ user: req.user });
};

const loginError = (req: Request, res: Response) => {
  res.json({ erroe: "Unknown Error" });
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
      return res.redirect("http://localhost:5173/");
    });
  } catch (error) {
    return next(error);
  }
};

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("github", { scope: ["user:email"] })(req, res, next);
};

const handleSuccess = (req: Request, res: Response) => {
  //res.json({ message: "Success", user: req.user });
  res.redirect("http://localhost:5173/");
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
  handleSuccess,
  callbackAuthenticate,
  logOutUser,
};
