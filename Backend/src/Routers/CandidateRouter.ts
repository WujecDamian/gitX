import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import * as CandidateController from "../Controllers/CandidateController";

const router = express.Router();

//all chats for chat page
router.get("/browse", CandidateController.browseCandidates);
router.get("/prospects", CandidateController.getProspects);
router.post("/prospects", CandidateController.saveProspect);
router.delete("/prospects/:candidateProfileId", CandidateController.deleteProspect);
router.get("/getCandidate/:userId", CandidateController.getCandidate);
router.put("/updateCandidate/:userId", CandidateController.updateCandidate);

export default router;
