import { type NextFunction, type Request, type Response } from "express";
import passport from "passport";
import "../Authentication/passport-config";

const getUser = (req: Request, res: Response) => {
  if (!req.isAuthenticated() || !req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  res.json({ user: req.user });
};

const loginError = (req: Request, res: Response) => {
  res.json({ erroe: "Unknown Error" });
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
  });

  req.session.destroy((destroyError) => {
    if (destroyError) {
      return res.status(500).json({ error: "Failed to destroy session cache" });
    }
  });

  res.clearCookie("connect.sid", {
    path: "/",
  });

  return res.status(200).json({ message: "Successfully logged out!" });
};

export {
  getUser,
  loginError,
  authenticateUser,
  handleSuccess,
  callbackAuthenticate,
  logOutUser,
};
