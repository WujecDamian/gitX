import express, { type Express, type Request, type Response } from "express";
import userRouter from "./Routers/UserRouter";
import authRouter from "./Routers/AuthRouter";
const app: Express = express();

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.listen(3000);
console.log("Server is listening on port http://localhost:3000");
