import aiService from '../services/ai.service.js';
import logger from '../utils/logger.js';
import { successResponse } from '../utils/response.js';

export const analyzeProfile = async (req, res, next) => {
  try {
    const profileData = req.body;
    
    const analysis = await aiService.analyzeProfile(profileData);
    
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    logger.info('Analysis completed', { sessionId });
    
    res.json(successResponse({
      sessionId,
      timestamp: new Date().toISOString(),
      analysis
    }));
    
  } catch (error) {
    next(error);
  }
};

export const healthCheck = (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    mode: process.env.AI_MODE || 'mock'
  });
};