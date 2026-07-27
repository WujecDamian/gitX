import express, { type Request, type Response, type NextFunction } from 'express';

const router = express.Router();

// middleware that is specific to this router

// define the home page route
router.get('/', (req: Request, res: Response) => {
  
});


export default router;