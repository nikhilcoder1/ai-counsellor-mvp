// Generate prompt for Claude API - exact same logic from frontend
export const generatePrompt = (data) => {
    return `You are an expert study abroad counsellor. Analyze this student profile and provide honest, transparent recommendations.

Student Profile:
- Academic Level: ${data.currentLevel}
- Field: ${data.fieldOfStudy}
- Performance: ${data.performance}
- Test Scores: ${data.testScores || 'Not provided'}
- Budget: $${data.budget.toLocaleString()}
- Funding: ${data.fundingType}
- Goal: ${data.primaryGoal}
- Intended Degree: ${data.intendedDegree}
- Preferred Regions: ${data.preferredRegions?.join(', ') || 'No preference'}
- Timeline: ${data.timeline || 'Not specified'}

Provide your analysis in the following JSON format (return ONLY valid JSON, no markdown):

{
  "profileSummary": {
    "strengths": ["list 2-3 key strengths"],
    "challenges": ["list 2-3 realistic challenges"],
    "competitiveness": "strong|moderate|developing",
    "confidence": "high|medium|low"
  },
  "countryRecommendations": [
    {
      "country": "Country Name",
      "flag": "🇨🇦",
      "score": 8.7,
      "budgetFit": 8,
      "academicFit": 8,
      "reasoning": "Brief explanation",
      "annualCost": "$30-40k",
      "pros": ["pro 1", "pro 2", "pro 3"],
      "cons": ["con 1", "con 2"]
    }
  ],
  "universityRecommendations": [
    {
      "name": "University Name",
      "country": "Country",
      "flag": "🇨🇦",
      "ranking": "Top X globally",
      "programs": ["Program 1", "Program 2"],
      "tuitionRange": "$30-45k",
      "scholarships": "Description",
      "admissionChance": "Good|Moderate|Reach",
      "matchScore": 8.5,
      "highlights": ["highlight 1", "highlight 2", "highlight 3"],
      "requirements": "Requirements",
      "applicationDeadline": "Date"
    }
  ],
  "comparisonTable": {
    "headers": ["Country", "Annual Cost", "Work Rights", "PR Pathway", "Language", "Best For"],
    "rows": [
      {
        "country": "Country 🇨🇦",
        "annualCost": "$25-35k",
        "workRights": "Details",
        "prPathway": "Details",
        "language": "English",
        "bestFor": "Description"
      }
    ]
  },
  "keyInsights": [
    "insight 1",
    "insight 2"
  ],
  "actionPlan": [
    {
      "task": "Task name",
      "description": "Details",
      "timeline": "This week|This month|Next 3 months",
      "priority": "CRITICAL|HIGH|MEDIUM",
      "category": "TESTS|DOCUMENTS|FINANCES|APPLICATIONS",
      "cost": "$amount or Free"
    }
  ],
  "budgetAnalysis": {
    "totalNeed": "$amount",
    "currentBudget": "$amount",
    "gap": "$amount",
    "recommendation": "Detailed recommendation"
  }
}`;
};