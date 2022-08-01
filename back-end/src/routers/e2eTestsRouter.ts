import { Router } from 'express';
import e2eTestController from '../controllers/e2eTestController.js';
const e2eTestRouter = Router();

e2eTestRouter.post("/reset", e2eTestController.deleteAll);

export default e2eTestRouter;