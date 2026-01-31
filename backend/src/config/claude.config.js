export default {
  apiKey: process.env.ANTHROPIC_API_KEY,
  apiUrl: 'https://api.anthropic.com/v1/messages',
  apiVersion: '2023-06-01',
  model: 'claude-sonnet-4-20250514',
  maxTokens: 4000,
  timeout: 60000
};