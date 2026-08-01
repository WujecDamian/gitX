import { type Request, type Response, type NextFunction } from "express";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.status(401).json({ error: "Please log in first." });
};

export default isAuthenticated;
