import { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import LandingPage from './pages/LandingPage';
import AssessmentFormPage from './pages/AssessmentFormPage';
import LoadingPage from './pages/LoadingPage';
import ResultsPage from './pages/ResultsPage';
import ActionPlanPage from './pages/ActionPlanPage';
import { callClaudeAPI } from './services/analysisService';
import { generateMockResults } from './services/mockService';

function App() {
    /* ================= AUTH STATE ================= */
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    /* ================= APP STATE ================= */
    const [currentScreen, setCurrentScreen] = useState('landing');
    const [profileData, setProfileData] = useState({});
    const [aiResults, setAiResults] = useState(null);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

    /* ============== UNIVERSITY LOCKING ============== */
    const [lockedUniversities, setLockedUniversities] = useState([]);

    /* ============== INITIAL LOAD =================== */
    useEffect(() => {
        const authStatus = localStorage.getItem('isAuthenticated');
        const userData = localStorage.getItem('user');
        const storedProfileData = localStorage.getItem('profileData');
        const storedAiResults = localStorage.getItem('aiResults');
        const storedLockedUniversities = localStorage.getItem('lockedUniversities');

        if (authStatus === 'true' && userData) {
            setIsAuthenticated(true);
            setCurrentUser(JSON.parse(userData));

            if (storedProfileData) {
                setProfileData(JSON.parse(storedProfileData));
                setHasCompletedOnboarding(true);
                setCurrentScreen('dashboard');
            }

            if (storedAiResults) {
                setAiResults(JSON.parse(storedAiResults));
            }

            if (storedLockedUniversities) {
                setLockedUniversities(JSON.parse(storedLockedUniversities));
            }
        }
    }, []);

    /* ============== PERSIST LOCKED UNIVERSITIES ============== */
    useEffect(() => {
        if (lockedUniversities.length > 0) {
            localStorage.setItem('lockedUniversities', JSON.stringify(lockedUniversities));
        } else {
            localStorage.removeItem('lockedUniversities');
        }
    }, [lockedUniversities]);

    /* ================= AUTH HANDLERS ================= */
    const handleAuthSuccess = (userData) => {
        setIsAuthenticated(true);
        setCurrentUser(userData);

        const storedProfileData = localStorage.getItem('profileData');
        if (storedProfileData) {
            setProfileData(JSON.parse(storedProfileData));
            setHasCompletedOnboarding(true);
            setCurrentScreen('dashboard');
        } else {
            setCurrentScreen('form');
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        setIsAuthenticated(false);
        setCurrentUser(null);
        setProfileData({});
        setAiResults(null);
        setLockedUniversities([]);
        setHasCompletedOnboarding(false);
        setCurrentScreen('landing');
    };

    /* ================= UNIVERSITY LOCKING ================= */
    const handleLockUniversity = (university) => {
        if (!lockedUniversities.some(u => u.name === university.name)) {
            setLockedUniversities(prev => [...prev, university]);
        }
    };

    const handleUnlockUniversity = (university) => {
        setLockedUniversities(prev =>
            prev.filter(u => u.name !== university.name)
        );
    };

    /* ================= FLOW HANDLERS ================= */
    const startCounsellor = () => {
        setCurrentScreen('form');
    };

    const startAuth = () => {
        setCurrentScreen('auth');
    };

    const submitProfile = async (data) => {
        setProfileData(data);
        localStorage.setItem('profileData', JSON.stringify(data));
        setHasCompletedOnboarding(true);
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
            await new Promise(res => setTimeout(res, step.delay));
        }

        try {
            const results = await callClaudeAPI(data);
            setAiResults(results);
            localStorage.setItem('aiResults', JSON.stringify(results));
            setCurrentScreen('results');
        } catch (error) {
            const mockResults = generateMockResults(data);
            setAiResults(mockResults);
            localStorage.setItem('aiResults', JSON.stringify(mockResults));
            setCurrentScreen('results');
        }
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text('Study Abroad Recommendations', 20, 20);
        doc.save('study-abroad-recommendations.pdf');
    };

    const goToDashboard = () => setCurrentScreen('dashboard');

    const showHeaderActions = ['dashboard', 'results', 'actionPlan'].includes(currentScreen);

    return (
        <>
            {/* ===== HEADER ACTIONS ===== */}
            {isAuthenticated && showHeaderActions && (
                <div className="absolute top-4 right-4 z-10 flex gap-2">
                    {hasCompletedOnboarding && currentScreen !== 'dashboard' && (
                        <button onClick={goToDashboard}>
                            🏠 Dashboard
                        </button>
                    )}
                    <button onClick={handleLogout}>
                        Logout ({currentUser?.fullName})
                    </button>
                </div>
            )}

            {/* ===== SCREENS ===== */}
            {currentScreen === 'landing' && (
                <LandingPage
                    onGetStarted={startAuth}
                    onLogin={startAuth}
                />
            )}

            {currentScreen === 'auth' && (
                <AuthPage onAuthSuccess={handleAuthSuccess} />
            )}

            {currentScreen === 'dashboard' && (
                <DashboardPage
                    profileData={profileData}
                    aiResults={aiResults}
                    lockedUniversities={lockedUniversities}
                    onStartCounsellor={startCounsellor}
                    onViewResults={() => setCurrentScreen('results')}
                    onViewActionPlan={() => setCurrentScreen('actionPlan')}
                />
            )}

            {currentScreen === 'form' && (
                <AssessmentFormPage onSubmit={submitProfile} />
            )}

            {currentScreen === 'loading' && (
                <LoadingPage progress={loadingProgress} message={loadingMessage} />
            )}

            {currentScreen === 'results' && aiResults && (
                <ResultsPage
                    aiResults={aiResults}
                    profileData={profileData}
                    lockedUniversities={lockedUniversities}
                    onLockUniversity={handleLockUniversity}
                    onUnlockUniversity={handleUnlockUniversity}
                    onViewActionPlan={() => setCurrentScreen('actionPlan')}
                    onExport={exportToPDF}
                />
            )}

            {currentScreen === 'actionPlan' && aiResults && (
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