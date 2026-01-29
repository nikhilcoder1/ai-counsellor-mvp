import { useState } from 'react';
import { ACADEMIC_LEVELS, FIELDS_OF_STUDY, PERFORMANCE_LEVELS, FUNDING_TYPES, PRIMARY_GOALS, INTENDED_DEGREES, REGIONS, TIMELINES, BUDGET_CONFIG } from '../data/formOptions';

export default function AssessmentFormPage({ onSubmit }) {
    const [formData, setFormData] = useState({
        currentLevel: '',
        fieldOfStudy: '',
        performance: '',
        testScores: '',
        budget: BUDGET_CONFIG.default,
        fundingType: '',
        primaryGoal: '',
        intendedDegree: '',
        preferredRegions: [],
        timeline: '',
        additionalInfo: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleRegionToggle = (region) => {
        setFormData(prev => ({
            ...prev,
            preferredRegions: prev.preferredRegions.includes(region)
                ? prev.preferredRegions.filter(r => r !== region)
                : [...prev.preferredRegions, region]
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.currentLevel) newErrors.currentLevel = 'Required';
        if (!formData.fieldOfStudy) newErrors.fieldOfStudy = 'Required';
        if (!formData.performance) newErrors.performance = 'Required';
        if (!formData.fundingType) newErrors.fundingType = 'Required';
        if (!formData.primaryGoal) newErrors.primaryGoal = 'Required';
        if (!formData.intendedDegree) newErrors.intendedDegree = 'Required';
        if (!formData.timeline) newErrors.timeline = 'Required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="bg-white rounded-xl shadow-lg p-8 animate-slide-up">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Student Profile Assessment</h1>
                    <p className="text-gray-600 mb-8">Help us understand your background and goals</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Academic Background Section */}
                        <div className="border-b pb-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <span>📚</span> Academic Background
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Current Academic Level *
                                    </label>
                                    <select
                                        value={formData.currentLevel}
                                        onChange={(e) => handleChange('currentLevel', e.target.value)}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.currentLevel ? 'border-red-500' : 'border-gray-300'}`}
                                    >
                                        <option value="">Select your level</option>
                                        {ACADEMIC_LEVELS.map(level => (
                                            <option key={level} value={level}>{level}</option>
                                        ))}
                                    </select>
                                    {errors.currentLevel && <p className="text-red-500 text-sm mt-1">{errors.currentLevel}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Field of Study *
                                    </label>
                                    <select
                                        value={formData.fieldOfStudy}
                                        onChange={(e) => handleChange('fieldOfStudy', e.target.value)}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.fieldOfStudy ? 'border-red-500' : 'border-gray-300'}`}
                                    >
                                        <option value="">Select your field</option>
                                        {FIELDS_OF_STUDY.map(field => (
                                            <option key={field} value={field}>{field}</option>
                                        ))}
                                    </select>
                                    {errors.fieldOfStudy && <p className="text-red-500 text-sm mt-1">{errors.fieldOfStudy}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Academic Performance *
                                    </label>
                                    <select
                                        value={formData.performance}
                                        onChange={(e) => handleChange('performance', e.target.value)}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.performance ? 'border-red-500' : 'border-gray-300'}`}
                                    >
                                        <option value="">Select performance level</option>
                                        {PERFORMANCE_LEVELS.map(level => (
                                            <option key={level} value={level}>{level}</option>
                                        ))}
                                    </select>
                                    {errors.performance && <p className="text-red-500 text-sm mt-1">{errors.performance}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Test Scores (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.testScores}
                                        onChange={(e) => handleChange('testScores', e.target.value)}
                                        placeholder="e.g., GRE: 320, TOEFL: 105"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                    />
                                    <p className="text-sm text-gray-500 mt-1">Enter any standardized test scores you have</p>
                                </div>
                            </div>
                        </div>

                        {/* Financial Section */}
                        <div className="border-b pb-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <span>💰</span> Financial Information
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Total Budget (USD) *
                                    </label>
                                    <div className="space-y-2">
                                        <input
                                            type="range"
                                            min={BUDGET_CONFIG.min}
                                            max={BUDGET_CONFIG.max}
                                            step={BUDGET_CONFIG.step}
                                            value={formData.budget}
                                            onChange={(e) => handleChange('budget', parseInt(e.target.value))}
                                            className="w-full"
                                        />
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>${BUDGET_CONFIG.min.toLocaleString()}</span>
                                            <span className="font-bold text-purple-600 text-lg">${formData.budget.toLocaleString()}</span>
                                            <span>${BUDGET_CONFIG.max.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Funding Source *
                                    </label>
                                    <select
                                        value={formData.fundingType}
                                        onChange={(e) => handleChange('fundingType', e.target.value)}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.fundingType ? 'border-red-500' : 'border-gray-300'}`}
                                    >
                                        <option value="">Select funding source</option>
                                        {FUNDING_TYPES.map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                    {errors.fundingType && <p className="text-red-500 text-sm mt-1">{errors.fundingType}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Goals & Preferences Section */}
                        <div className="border-b pb-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <span>🎯</span> Goals & Preferences
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Primary Goal *
                                    </label>
                                    <select
                                        value={formData.primaryGoal}
                                        onChange={(e) => handleChange('primaryGoal', e.target.value)}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.primaryGoal ? 'border-red-500' : 'border-gray-300'}`}
                                    >
                                        <option value="">Select your primary goal</option>
                                        {PRIMARY_GOALS.map(goal => (
                                            <option key={goal} value={goal}>{goal}</option>
                                        ))}
                                    </select>
                                    {errors.primaryGoal && <p className="text-red-500 text-sm mt-1">{errors.primaryGoal}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Intended Degree *
                                    </label>
                                    <select
                                        value={formData.intendedDegree}
                                        onChange={(e) => handleChange('intendedDegree', e.target.value)}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.intendedDegree ? 'border-red-500' : 'border-gray-300'}`}
                                    >
                                        <option value="">Select degree type</option>
                                        {INTENDED_DEGREES.map(degree => (
                                            <option key={degree} value={degree}>{degree}</option>
                                        ))}
                                    </select>
                                    {errors.intendedDegree && <p className="text-red-500 text-sm mt-1">{errors.intendedDegree}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Preferred Regions (Optional)
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {REGIONS.map(region => (
                                            <label key={region} className="flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-gray-50">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.preferredRegions.includes(region)}
                                                    onChange={() => handleRegionToggle(region)}
                                                    className="rounded text-purple-600"
                                                />
                                                <span className="text-sm">{region}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Timeline *
                                    </label>
                                    <select
                                        value={formData.timeline}
                                        onChange={(e) => handleChange('timeline', e.target.value)}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.timeline ? 'border-red-500' : 'border-gray-300'}`}
                                    >
                                        <option value="">When do you plan to start?</option>
                                        {TIMELINES.map(time => (
                                            <option key={time} value={time}>{time}</option>
                                        ))}
                                    </select>
                                    {errors.timeline && <p className="text-red-500 text-sm mt-1">{errors.timeline}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Additional Information Section */}
                        <div className="pb-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <span>📝</span> Additional Information
                            </h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Anything else we should know? (Optional)
                                </label>
                                <textarea
                                    value={formData.additionalInfo}
                                    onChange={(e) => handleChange('additionalInfo', e.target.value)}
                                    rows="4"
                                    placeholder="Share any specific interests, constraints, or preferences..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                ></textarea>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
                            >
                                Get My Recommendations →
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}