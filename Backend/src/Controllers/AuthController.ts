import express, {
  type Express,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import passport from "passport";
import "../Authentication/passport-config";

const greetUser = (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  // req.user contains whatever you passed to done() in your strategy (the GitHub profile)
  res.json({
    message: `Hello, user!`,
    user: req.user,
  });
};

const loginError = (req: Request, res: Response) => {
  res.json({ message: "Unknown Error" });
};

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("github", { scope: ["user:email"] })(req, res, next);
};

const handleSuccess = (req: Request, res: Response) => {
  res.json({ message: "Success", user: req.user });
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
export {
  greetUser,
  loginError,
  authenticateUser,
  handleSuccess,
  callbackAuthenticate,
};
