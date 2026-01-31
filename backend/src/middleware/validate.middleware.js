export const validateAnalysisRequest = (req, res, next) => {
  const { body } = req;
  const errors = [];

  if (!body.currentLevel) errors.push({ field: 'currentLevel', message: 'Required' });
  if (!body.fieldOfStudy) errors.push({ field: 'fieldOfStudy', message: 'Required' });
  if (!body.performance) errors.push({ field: 'performance', message: 'Required' });
  if (!body.fundingType) errors.push({ field: 'fundingType', message: 'Required' });
  if (!body.primaryGoal) errors.push({ field: 'primaryGoal', message: 'Required' });
  if (!body.intendedDegree) errors.push({ field: 'intendedDegree', message: 'Required' });
  if (!body.timeline) errors.push({ field: 'timeline', message: 'Required' });
  
  if (typeof body.budget !== 'number' || body.budget < 5000 || body.budget > 150000) {
    errors.push({ field: 'budget', message: 'Budget must be between 5000 and 150000' });
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: 'Invalid request data',
      details: errors
    });
  }

  next();
};