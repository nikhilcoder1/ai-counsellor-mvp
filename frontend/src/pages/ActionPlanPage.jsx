import { useState } from 'react';

export default function ActionPlanPage({ actionPlan, budgetAnalysis, onBack }) {
    const [viewMode, setViewMode] = useState('timeline');

    const groupByTimeline = () => {
        const groups = {
            'This week': [],
            'This month': [],
            'Next 3 months': []
        };
        actionPlan.forEach(task => {
            if (groups[task.timeline]) {
                groups[task.timeline].push(task);
            }
        });
        return groups;
    };

    const timelineGroups = groupByTimeline();

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 max-w-4xl">
                <button onClick={onBack} className="mb-4 text-purple-600 font-semibold hover:text-purple-700">
                    ← Back to Results
                </button>

                <div className="bg-white rounded-xl shadow-lg p-8 animate-slide-up">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Action Plan</h1>
                    <p className="text-gray-600 mb-6">Your personalized roadmap to studying abroad</p>

                    <div className="mb-6">
                        <div className="flex gap-3">
                            {['timeline', 'priority', 'category'].map(mode => (
                                <button
                                    key={mode}
                                    onClick={() => setViewMode(mode)}
                                    className={`px-4 py-2 rounded-lg font-medium transition ${
                                        viewMode === mode
                                            ? 'bg-purple-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {viewMode === 'timeline' && (
                        <div className="space-y-6">
                            {Object.entries(timelineGroups).map(([period, tasks]) => (
                                tasks.length > 0 && (
                                    <div key={period}>
                                        <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                                            {period === 'This week' ? '🔴' : period === 'This month' ? '🟡' : '🟢'} {period.toUpperCase()}
                                        </h2>
                                        <div className="space-y-3">
                                            {tasks.map((task, idx) => (
                                                <div key={idx} className={`border-l-4 p-4 rounded ${
                                                    task.priority === 'CRITICAL' ? 'border-red-500 bg-red-50' :
                                                    task.priority === 'HIGH' ? 'border-yellow-500 bg-yellow-50' :
                                                    'border-green-500 bg-green-50'
                                                }`}>
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h3 className="font-bold">{task.task}</h3>
                                                        <span className="text-sm px-2 py-1 bg-white rounded">
                                                            {task.category}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-700 mb-2">{task.description}</p>
                                                    <div className="flex gap-4 text-sm text-gray-600">
                                                        <span>💰 {task.cost}</span>
                                                        <span>⚡ {task.priority}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    )}

                    {viewMode === 'priority' && (
                        <div className="space-y-6">
                            {['CRITICAL', 'HIGH', 'MEDIUM'].map(priority => {
                                const tasks = actionPlan.filter(t => t.priority === priority);
                                return tasks.length > 0 && (
                                    <div key={priority}>
                                        <h2 className="text-xl font-bold mb-3">{priority} Priority ({tasks.length})</h2>
                                        <div className="space-y-3">
                                            {tasks.map((task, idx) => (
                                                <div key={idx} className="border border-gray-200 p-4 rounded-lg">
                                                    <h3 className="font-bold mb-1">{task.task}</h3>
                                                    <p className="text-sm text-gray-600">{task.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {viewMode === 'category' && (
                        <div className="space-y-6">
                            {['TESTS', 'DOCUMENTS', 'FINANCES', 'APPLICATIONS'].map(category => {
                                const tasks = actionPlan.filter(t => t.category === category);
                                return tasks.length > 0 && (
                                    <div key={category}>
                                        <h2 className="text-xl font-bold mb-3">{category} ({tasks.length})</h2>
                                        <div className="space-y-3">
                                            {tasks.map((task, idx) => (
                                                <div key={idx} className="border border-gray-200 p-4 rounded-lg">
                                                    <h3 className="font-bold mb-1">{task.task}</h3>
                                                    <p className="text-sm text-gray-600">{task.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Budget Analysis */}
                    <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                        <h2 className="text-xl font-bold mb-4">💰 Budget Analysis</h2>
                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                            <div>
                                <p className="text-sm text-gray-600">Estimated Total Need</p>
                                <p className="text-2xl font-bold">{budgetAnalysis.totalNeed}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Your Current Budget</p>
                                <p className="text-2xl font-bold">{budgetAnalysis.currentBudget}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Gap to Address</p>
                                <p className="text-2xl font-bold text-red-600">{budgetAnalysis.gap}</p>
                            </div>
                        </div>
                        <div className="pt-4 border-t">
                            <p className="font-semibold mb-2">Recommendation:</p>
                            <p className="text-gray-700">{budgetAnalysis.recommendation}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}