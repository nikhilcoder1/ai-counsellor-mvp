import { useState } from 'react';
import LockedUniversitiesSection from '../components/LockedUniversitiesSection';

const handleViewActionPlan = () => {
    if (!lockedUniversities || lockedUniversities.length === 0) {
        alert("🔒 Please lock at least one university to unlock your action plan.");
        return;
    }
    handleViewActionPlan();
};


export default function ResultsPage({ 
    aiResults, 
    profileData, 
    onViewActionPlan, 
    onExport,
    lockedUniversities,
    onLockUniversity,
    onUnlockUniversity
}) {
    const { profileSummary, countryRecommendations, universityRecommendations, comparisonTable, keyInsights } = aiResults;
    const [showUnlockWarning, setShowUnlockWarning] = useState(false);
    const [universityToUnlock, setUniversityToUnlock] = useState(null);

    const isUniversityLocked = (university) => {
        return lockedUniversities.some(locked => locked.name === university.name);
    };

    const handleLockClick = (university) => {
        onLockUniversity(university);
    };

    const handleUnlockClick = (university) => {
        setUniversityToUnlock(university);
        setShowUnlockWarning(true);
    };

    const confirmUnlock = () => {
        if (universityToUnlock) {
            onUnlockUniversity(universityToUnlock);
            setShowUnlockWarning(false);
            setUniversityToUnlock(null);
        }
    };

    const cancelUnlock = () => {
        setShowUnlockWarning(false);
        setUniversityToUnlock(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="mb-6 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-800">Your Personalized Recommendations</h1>
                    <button 
                        onClick={onExport}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
                    >
                        📄 Export to PDF
                    </button>
                </div>

                {/* Locked Universities Section */}
                <LockedUniversitiesSection 
                    lockedUniversities={lockedUniversities}
                    onUnlock={handleUnlockClick}
                />

                {/* Unlock Warning Modal */}
                {showUnlockWarning && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl p-6 max-w-md w-full animate-slide-up">
                            <div className="text-center mb-4">
                                <div className="text-5xl mb-3">⚠️</div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                    Unlock University?
                                </h3>
                                <p className="text-gray-600">
                                    Unlocking <strong>{universityToUnlock?.name}</strong> will reset your application strategy for this university.
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={cancelUnlock}
                                    className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmUnlock}
                                    className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
                                >
                                    Yes, Unlock
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Profile Summary */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6 animate-slide-up">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <span>📊</span> Profile Summary
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-bold text-green-700 mb-2">✓ Your Strengths</h3>
                            <ul className="space-y-2">
                                {profileSummary.strengths.map((strength, idx) => (
                                    <li key={idx} className="flex gap-2">
                                        <span className="text-green-500">•</span>
                                        <span>{strength}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="font-bold text-orange-700 mb-2">⚠ Areas to Address</h3>
                            <ul className="space-y-2">
                                {profileSummary.challenges.map((challenge, idx) => (
                                    <li key={idx} className="flex gap-2">
                                        <span className="text-orange-500">•</span>
                                        <span>{challenge}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                        <div className="flex gap-4">
                            <div>
                                <p className="text-sm text-gray-600">Competitiveness</p>
                                <p className="font-bold text-lg capitalize">{profileSummary.competitiveness}</p>
                            </div>
                            <div className="border-l pl-4">
                                <p className="text-sm text-gray-600">Confidence Level</p>
                                <p className="font-bold text-lg capitalize">{profileSummary.confidence}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Country Recommendations */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <span>🌍</span> Top Country Recommendations
                    </h2>
                    
                    <div className="space-y-4">
                        {countryRecommendations.map((country, idx) => (
                            <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <span className="text-4xl">{country.flag}</span>
                                        <div>
                                            <h3 className="text-xl font-bold">{country.country}</h3>
                                            <p className="text-sm text-gray-600">{country.annualCost} per year</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-purple-600">{country.score}</div>
                                        <div className="text-xs text-gray-500">Match Score</div>
                                    </div>
                                </div>

                                <p className="text-gray-700 mb-3">{country.reasoning}</p>

                                <div className="flex gap-2 mb-3">
                                    <div className="flex-1 bg-green-50 p-2 rounded text-center">
                                        <div className="text-xs text-gray-600">Budget Fit</div>
                                        <div className="font-bold text-green-700">{country.budgetFit}/10</div>
                                    </div>
                                    <div className="flex-1 bg-blue-50 p-2 rounded text-center">
                                        <div className="text-xs text-gray-600">Academic Fit</div>
                                        <div className="font-bold text-blue-700">{country.academicFit}/10</div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="font-semibold text-green-700 mb-2">Pros:</h4>
                                        <ul className="text-sm space-y-1">
                                            {country.pros.map((pro, i) => (
                                                <li key={i} className="flex gap-2">
                                                    <span className="text-green-500">✓</span>
                                                    <span>{pro}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-red-700 mb-2">Cons:</h4>
                                        <ul className="text-sm space-y-1">
                                            {country.cons.map((con, i) => (
                                                <li key={i} className="flex gap-2">
                                                    <span className="text-red-500">✗</span>
                                                    <span>{con}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* University Recommendations */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <span>🎓</span> University Recommendations
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                        {universityRecommendations.map((uni, idx) => {
                            const isLocked = isUniversityLocked(uni);
                            
                            return (
                                <div key={idx} className={`border rounded-lg p-4 hover:shadow-md transition ${
                                    isLocked ? 'border-green-400 bg-green-50' : 'border-gray-200'
                                }`}>
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex-1">
                                            <h3 className="font-bold text-lg">{uni.name}</h3>
                                            <p className="text-sm text-gray-600">{uni.country} {uni.flag}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xl font-bold text-purple-600">{uni.matchScore}</div>
                                            <div className="text-xs text-gray-500">Match</div>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{uni.ranking}</span>
                                        <span className={`text-xs ml-2 px-2 py-1 rounded ${
                                            uni.admissionChance === 'Good' ? 'bg-green-100 text-green-800' :
                                            uni.admissionChance === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {uni.admissionChance} chance
                                        </span>
                                        {isLocked && (
                                            <span className="text-xs ml-2 px-2 py-1 rounded bg-green-600 text-white font-semibold">
                                                🔒 LOCKED
                                            </span>
                                        )}
                                    </div>

                                    <div className="space-y-2 text-sm mb-4">
                                        <div>
                                            <span className="font-semibold">Programs:</span>
                                            <p className="text-gray-700">{uni.programs.join(', ')}</p>
                                        </div>
                                        <div>
                                            <span className="font-semibold">Tuition:</span>
                                            <p className="text-gray-700">{uni.tuitionRange}</p>
                                        </div>
                                        <div>
                                            <span className="font-semibold">Scholarships:</span>
                                            <p className="text-gray-700">{uni.scholarships}</p>
                                        </div>
                                        <div>
                                            <span className="font-semibold">Highlights:</span>
                                            <ul className="mt-1 space-y-1">
                                                {uni.highlights.map((highlight, i) => (
                                                    <li key={i} className="flex gap-2">
                                                        <span className="text-purple-500">•</span>
                                                        <span className="text-gray-700">{highlight}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="pt-2 border-t">
                                            <span className="font-semibold">Requirements:</span>
                                            <p className="text-gray-700">{uni.requirements}</p>
                                        </div>
                                        <div>
                                            <span className="font-semibold">Deadline:</span>
                                            <p className="text-red-600 font-semibold">{uni.applicationDeadline}</p>
                                        </div>
                                    </div>

                                    {/* Lock/Unlock Button */}
                                    {!isLocked ? (
                                        <button
                                            onClick={() => handleLockClick(uni)}
                                            className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
                                        >
                                            🔒 Lock University
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleUnlockClick(uni)}
                                            className="w-full bg-red-100 text-red-700 py-2 rounded-lg font-semibold hover:bg-red-200 transition"
                                        >
                                            🔓 Unlock University
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Comparison Table */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <span>📊</span> Country Comparison
                    </h2>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50">
                                    {comparisonTable.headers.map((header, idx) => (
                                        <th key={idx} className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonTable.rows.map((row, idx) => (
                                    <tr key={idx} className="border-t">
                                        <td className="px-4 py-3 font-semibold">{row.country}</td>
                                        <td className="px-4 py-3">{row.annualCost}</td>
                                        <td className="px-4 py-3">{row.workRights}</td>
                                        <td className="px-4 py-3">{row.prPathway}</td>
                                        <td className="px-4 py-3">{row.language}</td>
                                        <td className="px-4 py-3 text-sm">{row.bestFor}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Key Insights */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <span>💡</span> Key Insights
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-3">
                        {keyInsights.map((insight, idx) => (
                            <div key={idx} className="flex gap-3 p-3 bg-purple-50 rounded-lg">
                                <span className="text-purple-600 font-bold">{idx + 1}.</span>
                                <p className="text-gray-700">{insight}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Button */}
                <div className="text-center">
                    <button
                        onClick={handleViewActionPlan}
                        className={`px-8 py-3 rounded-lg font-semibold text-lg transition ${
                            lockedUniversities.length === 0
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-purple-600 text-white hover:bg-purple-700'
                        }`}
                    >
                        View Your Action Plan →
                    </button>
                </div>
            </div>
        </div>
    );
}