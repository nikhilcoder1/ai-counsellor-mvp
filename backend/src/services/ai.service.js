import appConfig from '../config/app.config.js';
import claudeService from './claude.service.js';
import mockService from './mock.service.js';
import logger from '../utils/logger.js';

class AIService {
  async analyzeProfile(profileData) {
    const mode = appConfig.ai.mode;
    
    logger.info('Analysis requested', { 
      mode, 
      budget: profileData.budget,
      field: profileData.fieldOfStudy 
    });

    if (mode === 'mock') {
      return await mockService.generateMockAnalysis(profileData);
    }
    
    if (mode === 'claude') {
      try {
        return await claudeService.analyzeProfile(profileData);
      } catch (error) {
        logger.error('Claude failed, no fallback configured', error);
        throw error;
      }
    }

    throw new Error(`Invalid AI_MODE: ${mode}. Use "mock" or "claude"`);
  }
}

export default new AIService();