import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import * as GroupController from "../Controllers/GroupController";

const router = express.Router();

//get user / group posts
router.get("/", GroupController.getUserGroups);
router.post("/join/:groupId", GroupController.joinGroup);
router.post("/leave/:groupId", GroupController.leaveGroup);

//create | delete
router.delete("/delete/:groupId", GroupController.deleteGroup);
router.post("/create", GroupController.createGroup);

export default router;
