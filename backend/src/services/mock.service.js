import appConfig from '../config/app.config.js';
import logger from '../utils/logger.js';

class MockService {
  async generateMockAnalysis(profileData) {
    logger.info('Generating mock analysis', { budget: profileData.budget });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, appConfig.ai.mockDelayMs));
    
    const data = profileData;
    
    return {
        profileSummary: {
            strengths: [
                "Strong academic background in " + data.fieldOfStudy,
                "Good budget allocation for international study",
                "Clear career goals and motivation"
            ],
            challenges: [
                "Competitive admissions landscape",
                "Need to strengthen test scores for top universities"
            ],
            competitiveness: "strong",
            confidence: "high"
        },
        countryRecommendations: [
            {
                country: "Canada",
                flag: "🇨🇦",
                score: 8.7,
                budgetFit: 9,
                academicFit: 8,
                reasoning: "Excellent match for your budget and academic background. Strong programs in " + data.fieldOfStudy + ".",
                annualCost: "$25-35k",
                pros: ["Post-graduation work permit", "Lower tuition than US", "High quality of life", "Immigration pathways"],
                cons: ["Cold climate", "Competitive admissions"]
            },
            {
                country: "Germany",
                flag: "🇩🇪",
                score: 8.3,
                budgetFit: 10,
                academicFit: 7,
                reasoning: "Very budget-friendly with many tuition-free universities. Strong in technical fields.",
                annualCost: "$12-18k",
                pros: ["Tuition-free public universities", "Strong research", "Central Europe location", "Work opportunities"],
                cons: ["Language barrier", "Bureaucracy"]
            },
            {
                country: "United States",
                flag: "🇺🇸",
                score: 7.5,
                budgetFit: 6,
                academicFit: 9,
                reasoning: "Top universities but higher costs. Your budget will need scholarship support.",
                annualCost: "$40-70k",
                pros: ["World-class universities", "Research opportunities", "Industry connections", "OPT work visa"],
                cons: ["High costs", "Visa challenges"]
            }
        ],
        universityRecommendations: [
            {
                name: "University of Toronto",
                country: "Canada",
                flag: "🇨🇦",
                ranking: "Top 20 globally",
                programs: ["MS in " + data.fieldOfStudy, "Research opportunities"],
                tuitionRange: "$30-45k CAD",
                scholarships: "Merit scholarships available",
                admissionChance: "Moderate",
                matchScore: 8.5,
                highlights: ["Strong research", "Industry connections", "Diverse campus"],
                requirements: "GPA 3.3+, TOEFL 100+",
                applicationDeadline: "January 15, 2026"
            },
            {
                name: "Technical University of Munich",
                country: "Germany",
                flag: "🇩🇪",
                ranking: "Top 50 globally",
                programs: ["MSc in " + data.fieldOfStudy],
                tuitionRange: "€0 (tuition-free)",
                scholarships: "DAAD scholarships",
                admissionChance: "Good",
                matchScore: 8.2,
                highlights: ["No tuition", "Strong technical programs", "Munich tech scene"],
                requirements: "GPA 3.0+, German B2 or English C1",
                applicationDeadline: "May 31, 2026"
            },
            {
                name: "University of Waterloo",
                country: "Canada",
                flag: "🇨🇦",
                ranking: "Top Canadian university",
                programs: ["MEng in " + data.fieldOfStudy, "Co-op program"],
                tuitionRange: "$28-35k CAD",
                scholarships: "International student awards",
                admissionChance: "Good",
                matchScore: 8.0,
                highlights: ["Co-op opportunities", "Strong tech connections", "Innovative programs"],
                requirements: "GPA 3.5+, TOEFL 90+",
                applicationDeadline: "February 1, 2026"
            },
            {
                name: "University of Texas at Austin",
                country: "United States",
                flag: "🇺🇸",
                ranking: "Top 10 in US",
                programs: ["MS in " + data.fieldOfStudy],
                tuitionRange: "$38-42k",
                scholarships: "TA/RA positions available",
                admissionChance: "Reach",
                matchScore: 7.5,
                highlights: ["Top research", "Austin tech hub", "Strong alumni network"],
                requirements: "GPA 3.5+, GRE 320+, TOEFL 100+",
                applicationDeadline: "December 15, 2025"
            },
            {
                name: "National University of Singapore",
                country: "Singapore",
                flag: "🇸🇬",
                ranking: "Top Asian university",
                programs: ["MSc in " + data.fieldOfStudy],
                tuitionRange: "$25-30k SGD",
                scholarships: "Merit-based scholarships",
                admissionChance: "Good",
                matchScore: 7.8,
                highlights: ["Asian tech hub", "Research excellence", "International environment"],
                requirements: "GPA 3.0+, TOEFL 100+",
                applicationDeadline: "March 15, 2026"
            }
        ],
        comparisonTable: {
            headers: ["Country", "Annual Cost", "Work Rights", "PR Pathway", "Language", "Best For"],
            rows: [
                {
                    country: "Canada 🇨🇦",
                    annualCost: "$25-35k",
                    workRights: "3-year PGWP",
                    prPathway: "Strong",
                    language: "English",
                    bestFor: "Balance of quality, cost, immigration"
                },
                {
                    country: "Germany 🇩🇪",
                    annualCost: "$12-18k",
                    workRights: "18-month visa",
                    prPathway: "Good",
                    language: "German required",
                    bestFor: "Budget-conscious students"
                },
                {
                    country: "USA 🇺🇸",
                    annualCost: "$40-70k",
                    workRights: "3-year OPT",
                    prPathway: "Difficult",
                    language: "English",
                    bestFor: "Top research, industry connections"
                },
                {
                    country: "UK 🇬🇧",
                    annualCost: "$35-50k",
                    workRights: "2-year PSW",
                    prPathway: "Moderate",
                    language: "English",
                    bestFor: "1-year Master's programs"
                },
                {
                    country: "Singapore 🇸🇬",
                    annualCost: "$25-30k",
                    workRights: "1-year LTVP",
                    prPathway: "Moderate",
                    language: "English",
                    bestFor: "Asia-Pacific opportunities"
                }
            ]
        },
        keyInsights: [
            "Your profile is competitive for mid-tier programs globally",
            "Focus on universities with strong TA/RA positions",
            "Consider 2-3 countries to maximize scholarship opportunities",
            "Germany offers best value for budget-conscious students",
            "Canada provides good balance of quality and immigration pathways",
            "Start GRE preparation if targeting US universities",
            "Budget allocation is realistic for selected destinations",
            "Apply early to maximize scholarship consideration"
        ],
        actionPlan: [
            {
                task: "Take TOEFL/IELTS",
                description: "Schedule and take English proficiency test. Aim for TOEFL 100+ or IELTS 7.0+.",
                timeline: "This month",
                priority: "CRITICAL",
                category: "TESTS",
                cost: "$200-250"
            },
            {
                task: "Request Academic Transcripts",
                description: "Contact university registrar to obtain official transcripts. Order 8-10 sealed copies.",
                timeline: "This month",
                priority: "CRITICAL",
                category: "DOCUMENTS",
                cost: "$50-100"
            },
            {
                task: "Identify Recommenders",
                description: "Reach out to 3 professors/supervisors for strong recommendation letters.",
                timeline: "This month",
                priority: "CRITICAL",
                category: "DOCUMENTS",
                cost: "Free"
            },
            {
                task: "Research Scholarship Opportunities",
                description: "Create spreadsheet of external scholarships with deadlines and requirements.",
                timeline: "This month",
                priority: "HIGH",
                category: "FINANCES",
                cost: "Free"
            },
            {
                task: "Draft Statement of Purpose",
                description: "Write first draft focusing on goals, experience, and university fit.",
                timeline: "Next 3 months",
                priority: "HIGH",
                category: "DOCUMENTS",
                cost: "Free"
            },
            {
                task: "Take GRE (if targeting US)",
                description: "Register and prepare for GRE. Target 320+. Consider prep course.",
                timeline: "Next 3 months",
                priority: "HIGH",
                category: "TESTS",
                cost: "$220 + prep materials"
            },
            {
                task: "Create University Shortlist",
                description: "Finalize 8-12 universities across 2-3 countries. Mix of reach, target, safe.",
                timeline: "Next 3 months",
                priority: "HIGH",
                category: "APPLICATIONS",
                cost: "Free"
            },
            {
                task: "Update Resume/CV",
                description: "Tailor CV for grad school. Highlight research, projects, relevant work.",
                timeline: "Next 3 months",
                priority: "MEDIUM",
                category: "DOCUMENTS",
                cost: "Free"
            },
            {
                task: "Prepare Financial Documents",
                description: "Get bank statements, affidavits of support, loan eligibility letters.",
                timeline: "Next 3 months",
                priority: "MEDIUM",
                category: "FINANCES",
                cost: "Free"
            },
            {
                task: "Start German Language (if considering Germany)",
                description: "Enroll in A1/A2 German course for daily life and job prospects.",
                timeline: "Next 3 months",
                priority: "MEDIUM",
                category: "TESTS",
                cost: "$300-500"
            },
            {
                task: "Submit Applications",
                description: "Complete applications, pay fees, track deadlines carefully.",
                timeline: "Next 3 months",
                priority: "CRITICAL",
                category: "APPLICATIONS",
                cost: "$600-1200"
            },
            {
                task: "Apply for External Scholarships",
                description: "Submit applications to external scholarship programs.",
                timeline: "Next 3 months",
                priority: "HIGH",
                category: "FINANCES",
                cost: "Free"
            }
        ],
        budgetAnalysis: {
            totalNeed: "$30-40k per year",
            currentBudget: "$" + data.budget.toLocaleString(),
            gap: "$10-30k (for 2-year program)",
            recommendation: "Your budget covers one year comfortably in Canada/Germany. Priority: (1) Apply for scholarships and assistantships, (2) Consider part-time work (20hrs/week = $10-15k/year), (3) Explore education loans for gap funding if needed."
        }
    };
  }
}

export default new MockService();