import { useState, useEffect } from 'react';
import AuthPage from './pages/AuthPage';
import LandingPage from './pages/LandingPage';
import AssessmentFormPage from './pages/AssessmentFormPage';
import LoadingPage from './pages/LoadingPage';
import ResultsPage from './pages/ResultsPage';
import ActionPlanPage from './pages/ActionPlanPage';
import { callClaudeAPI } from './services/analysisService';
import { generateMockResults } from './services/mockService';

function App() {
    // Auth state
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    
    // App state (same as before)
    const [currentScreen, setCurrentScreen] = useState('landing');
    const [profileData, setProfileData] = useState({});
    const [aiResults, setAiResults] = useState(null);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [loadingMessage, setLoadingMessage] = useState('');

    // Check authentication on mount
    useEffect(() => {
        const authStatus = localStorage.getItem('isAuthenticated');
        const userData = localStorage.getItem('user');
        
        if (authStatus === 'true' && userData) {
            setIsAuthenticated(true);
            setCurrentUser(JSON.parse(userData));
        }
    }, []);

    // Auth handlers
    const handleAuthSuccess = (userData) => {
        setIsAuthenticated(true);
        setCurrentUser(userData);
        setCurrentScreen('landing'); // Go to onboarding after auth
    };

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setCurrentUser(null);
        setCurrentScreen('landing');
    };

    // Existing handlers (unchanged)
    const startAssessment = () => {
        setCurrentScreen('form');
    };

    const submitProfile = async (data) => {
        setProfileData(data);
        setCurrentScreen('loading');
        
        await analyzeProfile(data);
    };

    const analyzeProfile = async (data) => {
        const loadingSteps = [
            { message: "Understanding your academic profile...", progress: 15, delay: 2000 },
            { message: "Analyzing budget vs country costs...", progress: 35, delay: 3000 },
            { message: "Matching universities to your goals...", progress: 55, delay: 3000 },
            { message: "Calculating acceptance probabilities...", progress: 75, delay: 2500 },
            { message: "Creating your personalized action plan...", progress: 90, delay: 2000 },
            { message: "Finalizing recommendations...", progress: 100, delay: 1500 }
        ];

        for (const step of loadingSteps) {
            setLoadingMessage(step.message);
            setLoadingProgress(step.progress);
            await new Promise(resolve => setTimeout(resolve, step.delay));
        }

        try {
            const results = await callClaudeAPI(data);
            setAiResults(results);
            setCurrentScreen('results');
        } catch (error) {
            console.error('API Error:', error);
            setAiResults(generateMockResults(data));
            setCurrentScreen('results');
        }
    };

    const exportToPDF = () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        doc.setFontSize(20);
        doc.text('Study Abroad Recommendations', 20, 20);
        
        doc.setFontSize(12);
        let yPos = 40;
        
        doc.text('Profile Summary', 20, yPos);
        yPos += 10;
        
        aiResults.profileSummary.strengths.forEach(strength => {
            doc.text(`• ${strength}`, 25, yPos);
            yPos += 7;
        });
        
        yPos += 10;
        doc.text('Top Country Recommendations', 20, yPos);
        yPos += 10;
        
        aiResults.countryRecommendations.slice(0, 3).forEach(country => {
            doc.text(`${country.flag} ${country.country} - Score: ${country.score}`, 25, yPos);
            yPos += 7;
            doc.text(`Cost: ${country.annualCost}`, 30, yPos);
            yPos += 10;
        });
        
        doc.save('study-abroad-recommendations.pdf');
    };

    // If not authenticated, show auth page
    if (!isAuthenticated) {
        return <AuthPage onAuthSuccess={handleAuthSuccess} />;
    }

    // After authentication, show normal app flow
    return (
        <>
            {/* Optional: Add logout button to header */}
            {currentScreen === 'landing' && (
                <div className="absolute top-4 right-4 z-10">
                    <button
                        onClick={handleLogout}
                        className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-medium hover:bg-white/30 transition"
                    >
                        Logout ({currentUser?.fullName})
                    </button>
                </div>
            )}

            {currentScreen === 'landing' && (
                <LandingPage onStartAssessment={startAssessment} />
            )}

            {currentScreen === 'form' && (
                <AssessmentFormPage onSubmit={submitProfile} />
            )}

            {currentScreen === 'loading' && (
                <LoadingPage progress={loadingProgress} message={loadingMessage} />
            )}

            {currentScreen === 'results' && (
                <ResultsPage 
                    aiResults={aiResults}
                    profileData={profileData}
                    onViewActionPlan={() => setCurrentScreen('actionPlan')}
                    onExport={exportToPDF}
                />
            )}

            {currentScreen === 'actionPlan' && (
                <ActionPlanPage 
                    actionPlan={aiResults.actionPlan}
                    budgetAnalysis={aiResults.budgetAnalysis}
                    onBack={() => setCurrentScreen('results')}
                />
            )}
        </>
    );
}

export default App;