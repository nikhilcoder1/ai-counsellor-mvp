import claudeConfig from '../config/claude.config.js';
import { generatePrompt } from './prompt.service.js';
import logger from '../utils/logger.js';

class ClaudeService {
  async analyzeProfile(profileData) {
    logger.info('Calling Claude API', { budget: profileData.budget });
    
    const prompt = generatePrompt(profileData);
    
    try {
      const response = await fetch(claudeConfig.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'anthropic-version': claudeConfig.apiVersion,
          'x-api-key': claudeConfig.apiKey
        },
        body: JSON.stringify({
          model: claudeConfig.model,
          max_tokens: claudeConfig.maxTokens,
          messages: [{
            role: 'user',
            content: prompt
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`Claude API error: ${response.status}`);
      }

      const result = await response.json();
      const jsonMatch = result.content[0].text.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        const analysis = JSON.parse(jsonMatch[0]);
        logger.info('Claude API success');
        return analysis;
      }
      
      throw new Error('Failed to parse AI response');
    } catch (error) {
      logger.error('Claude API failed', error);
      throw error;
    }
  }
}

export default new ClaudeService();