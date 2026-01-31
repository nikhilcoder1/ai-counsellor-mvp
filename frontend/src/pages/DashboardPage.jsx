export default function DashboardPage({ 
    profileData, 
    aiResults, 
    onStartCounsellor,
    onViewResults,
    onViewActionPlan,
    lockedUniversities
}) {
    const stageBorderColors = {
        blue: 'border-blue-500',
        purple: 'border-purple-500',
        green: 'border-green-500',
        orange: 'border-orange-500'
    };

    // Determine current stage based on profile data
    const getCurrentStage = () => {
        if (!profileData.testScores || profileData.testScores.trim() === '') {
            return {
                stage: 'Building Profile',
                description: 'Focus on completing tests and building a strong academic profile',
                icon: '📚',
                color: 'blue'
            };
        }
        
        if (!aiResults) {
            return {
                stage: 'Discovering Universities',
                description: 'Ready to explore university options with AI Counsellor',
                icon: '🔍',
                color: 'purple'
            };
        }
        
        const hasViewedResults = aiResults && aiResults.universityRecommendations;
        if (hasViewedResults) {
            return {
                stage: 'Preparing Applications',
                description: 'Start working on your application materials and deadlines',
                icon: '✍️',
                color: 'green'
            };
        }
        
        return {
            stage: 'Finalizing Universities',
            description: 'Review recommendations and finalize your university list',
            icon: '🎯',
            color: 'orange'
        };
    };

    // Calculate profile strength scores
    const getProfileStrength = () => {
        const scores = {
            academics: 0,
            exams: 0,
            sop: 0
        };

        // Academics score based on performance
        if (profileData.performance) {
            if (profileData.performance.includes('Excellent')) scores.academics = 90;
            else if (profileData.performance.includes('Above Average')) scores.academics = 75;
            else if (profileData.performance.includes('Average')) scores.academics = 60;
            else scores.academics = 45;
        }

        // Exams score based on test scores
        if (profileData.testScores && profileData.testScores.trim() !== '') {
            scores.exams = 85; // Has test scores
        } else {
            scores.exams = 0; // No test scores yet
        }

        // SOP score - assume in progress (this would be updated later)
        scores.sop = 30; // Default: not started

        return scores;
    };

    // Get top 3 critical tasks
    const getTopTasks = () => {
        if (!aiResults || !aiResults.actionPlan) {
            return [
                {
                    task: "Complete AI Counsellor Assessment",
                    description: "Get personalized university and country recommendations",
                    priority: "CRITICAL",
                    category: "ASSESSMENT"
                },
                {
                    task: "Research Scholarship Opportunities",
                    description: "Explore funding options before finalizing universities",
                    priority: "HIGH",
                    category: "FINANCES"
                },
                {
                    task: "Prepare Academic Documents",
                    description: "Request transcripts and gather recommendation letters",
                    priority: "HIGH",
                    category: "DOCUMENTS"
                }
            ];
        }

        // Return top 3 CRITICAL or HIGH priority tasks
        return aiResults.actionPlan
            .filter(task => task.priority === 'CRITICAL' || task.priority === 'HIGH')
            .slice(0, 3);
    };

    const currentStage = getCurrentStage();
    const profileStrength = getProfileStrength();
    const topTasks = getTopTasks();

    const getStrengthColor = (score) => {
        if (score >= 80) return 'text-green-600 bg-green-100';
        if (score >= 60) return 'text-yellow-600 bg-yellow-100';
        if (score >= 40) return 'text-orange-600 bg-orange-100';
        return 'text-red-600 bg-red-100';
    };

    const getStrengthLabel = (score) => {
        if (score >= 80) return 'Strong';
        if (score >= 60) return 'Good';
        if (score >= 40) return 'Fair';
        return 'Needs Work';
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            Welcome back, {profileData.currentLevel || 'Student'}!
                        </h1>
                        <p className="text-gray-600">
                            Here's your study abroad journey overview
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Left Column - Profile & Stage */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Profile Summary Card */}
                            <div className="bg-gray-50 border border-gray-200 rounded-xl shadow-sm p-6">
                                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <span>👤</span> Your Profile
                                </h2>
                                
                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <p className="text-sm text-gray-600">Academic Level</p>
                                        <p className="font-semibold text-gray-800">{profileData.currentLevel || 'Not set'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Field of Study</p>
                                        <p className="font-semibold text-gray-800">{profileData.fieldOfStudy || 'Not set'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Target Degree</p>
                                        <p className="font-semibold text-gray-800">{profileData.intendedDegree || 'Not set'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Budget</p>
                                        <p className="font-semibold text-gray-800">
                                            ${profileData.budget?.toLocaleString() || '0'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Timeline</p>
                                        <p className="font-semibold text-gray-800">{profileData.timeline || 'Not set'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Primary Goal</p>
                                        <p className="font-semibold text-gray-800">{profileData.primaryGoal || 'Not set'}</p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Current Stage Card */}
                            <div className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${stageBorderColors[currentStage.color]}`}>
                                <div className="flex items-start gap-4">
                                    <div className="text-4xl">{currentStage.icon}</div>
                                    <div className="flex-1">
                                        <h2 className="text-xl font-bold text-gray-800 mb-2">
                                            Current Stage: {currentStage.stage}
                                        </h2>
                                        <p className="text-gray-600 mb-4">
                                            {currentStage.description}
                                        </p>
                                        
                                        {/* Stage Progress */}
                                        <div className="flex gap-2 mb-4">
                                            <div className={`h-2 flex-1 rounded ${
                                                currentStage.stage === 'Building Profile' ? 'bg-blue-500' : 'bg-gray-300'
                                            }`}></div>
                                            <div className={`h-2 flex-1 rounded ${
                                                currentStage.stage === 'Discovering Universities' || 
                                                currentStage.stage === 'Finalizing Universities' || 
                                                currentStage.stage === 'Preparing Applications' ? 'bg-purple-500' : 'bg-gray-300'
                                            }`}></div>
                                            <div className={`h-2 flex-1 rounded ${
                                                currentStage.stage === 'Finalizing Universities' || 
                                                currentStage.stage === 'Preparing Applications' ? 'bg-orange-500' : 'bg-gray-300'
                                            }`}></div>
                                            <div className={`h-2 flex-1 rounded ${
                                                currentStage.stage === 'Preparing Applications' ? 'bg-green-500' : 'bg-gray-300'
                                            }`}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Top Tasks Card */}
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <span>⚡</span> What to Do Next
                                </h2>
                                
                                <div className="space-y-3">
                                    {topTasks.map((task, idx) => (
                                        <div 
                                            key={idx}
                                            className={`p-4 rounded-lg border-l-4 ${
                                                task.priority === 'CRITICAL' 
                                                    ? 'border-red-500 bg-red-50' 
                                                    : 'border-yellow-500 bg-yellow-50'
                                            }`}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-bold text-gray-800">{task.task}</h3>
                                                <span className={`text-xs px-2 py-1 rounded font-semibold ${
                                                    task.priority === 'CRITICAL' 
                                                        ? 'bg-red-200 text-red-800' 
                                                        : 'bg-yellow-200 text-yellow-800'
                                                }`}>
                                                    {task.priority}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-700">
                                                {task.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {aiResults && (
                                    <button
                                        onClick={onViewActionPlan}
                                        className="mt-4 w-full text-purple-600 font-semibold hover:text-purple-700 text-sm"
                                    >
                                        View Full Action Plan →
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Right Column - Strength & Quick Actions */}
                        <div className="space-y-6">
                            {/* Profile Strength Card */}
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <span>💪</span> Profile Strength
                                </h2>

                                <div className="space-y-4">
                                    {/* Academics */}
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-medium text-gray-700">Academics</span>
                                            <span className={`text-xs px-2 py-1 rounded font-semibold ${getStrengthColor(profileStrength.academics)}`}>
                                                {getStrengthLabel(profileStrength.academics)}
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div 
                                                className="bg-purple-600 h-2 rounded-full transition-all"
                                                style={{ width: `${profileStrength.academics}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Exams */}
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-medium text-gray-700">Test Scores</span>
                                            <span className={`text-xs px-2 py-1 rounded font-semibold ${getStrengthColor(profileStrength.exams)}`}>
                                                {getStrengthLabel(profileStrength.exams)}
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div 
                                                className="bg-blue-600 h-2 rounded-full transition-all"
                                                style={{ width: `${profileStrength.exams}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* SOP */}
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-medium text-gray-700">Statement of Purpose</span>
                                            <span className={`text-xs px-2 py-1 rounded font-semibold ${getStrengthColor(profileStrength.sop)}`}>
                                                {getStrengthLabel(profileStrength.sop)}
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div 
                                                className="bg-green-600 h-2 rounded-full transition-all"
                                                style={{ width: `${profileStrength.sop}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                    <p className="text-xs text-gray-600">
                                        💡 <strong>Tip:</strong> Complete test scores and SOP to strengthen your profile
                                    </p>
                                </div>
                            </div>

                            {/* Quick Actions Card */}
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <span>🚀</span> Quick Actions
                                </h2>

                                <div className="space-y-3">
                                    {!aiResults ? (
                                        <button
                                            onClick={onStartCounsellor}
                                            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
                                        >
                                            🤖 Start AI Counsellor
                                        </button>
                                    ) : (
                                        <button
                                            onClick={onViewResults}
                                            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
                                        >
                                            📊 View Recommendations
                                        </button>
                                    )}

                                    <button
                                        className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
                                        disabled
                                    >
                                        🎓 University Shortlist
                                        <span className="text-xs block text-gray-500">Coming soon</span>
                                    </button>

                                    {aiResults && (
                                        <button
                                            onClick={onViewActionPlan}
                                            className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
                                        >
                                            ✅ Action Plan
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Application Guidance Lock/Unlock */}
                            <div className={`rounded-xl shadow-lg p-6 ${
                                lockedUniversities.length > 0 
                                    ? 'bg-green-50 border border-green-200' 
                                    : 'bg-gray-100 border border-gray-300'
                            }`}>
                                <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                                    {lockedUniversities.length > 0 ? (
                                        <>
                                            <span>🔓</span> Application Guidance
                                        </>
                                    ) : (
                                        <>
                                            <span>🔒</span> Application Guidance
                                        </>
                                    )}
                                </h2>
                                
                                {lockedUniversities.length > 0 ? (
                                    <div>
                                        <p className="text-sm text-green-700 mb-3">
                                            ✓ Unlocked! You've locked {lockedUniversities.length} {lockedUniversities.length === 1 ? 'university' : 'universities'}.
                                        </p>
                                        <button
                                            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                                        >
                                            📝 View Application Guide
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <p className="text-sm text-gray-600 mb-3">
                                            Lock at least one university to unlock personalized application guidance.
                                        </p>
                                        <button
                                            className="w-full bg-gray-300 text-gray-500 py-3 rounded-lg font-semibold cursor-not-allowed"
                                            disabled
                                        >
                                            🔒 Locked
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Stats Card */}
                            {aiResults && (
                                <div className="bg-linear-to-br from-purple-600 to-blue-600 rounded-xl shadow-lg p-6 text-white">
                                    <h3 className="font-bold mb-3">Your Recommendations</h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-purple-100">Countries</span>
                                            <span className="font-bold">{aiResults.countryRecommendations?.length || 0}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-purple-100">Universities</span>
                                            <span className="font-bold">{aiResults.universityRecommendations?.length || 0}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-purple-100">Action Items</span>
                                            <span className="font-bold">{aiResults.actionPlan?.length || 0}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}