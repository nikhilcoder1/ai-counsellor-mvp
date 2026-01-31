import express from 'express';
import { analyzeProfile, healthCheck } from '../controllers/analysis.controller.js';
import { validateAnalysisRequest } from '../middleware/validate.middleware.js';

const router = express.Router();

router.post('/analysis', validateAnalysisRequest, analyzeProfile);
router.get('/health', healthCheck);

export default router;