export default {
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  
  ai: {
    mode: process.env.AI_MODE || 'mock', // "mock" or "claude"
    mockDelayMs: parseInt(process.env.MOCK_DELAY_MS || '2000')
  },
  
  logging: {
    level: process.env.LOG_LEVEL || 'info'
  }
};