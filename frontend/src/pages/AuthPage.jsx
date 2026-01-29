import { useState } from 'react';

export default function AuthPage({ onAuthSuccess }) {
    const [mode, setMode] = useState('signup'); // 'signup' or 'login'
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (mode === 'signup' && !formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        if (mode === 'signup') {
            // Store user data in localStorage (MVP only - no real auth)
            const userData = {
                fullName: formData.fullName,
                email: formData.email,
                createdAt: new Date().toISOString()
            };
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('isAuthenticated', 'true');
            
            onAuthSuccess(userData);
        } else {
            // Login - check if user exists
            const storedUser = localStorage.getItem('user');
            
            if (storedUser) {
                const userData = JSON.parse(storedUser);
                localStorage.setItem('isAuthenticated', 'true');
                onAuthSuccess(userData);
            } else {
                setErrors({ email: 'No account found. Please sign up first.' });
            }
        }
    };

    return (
        <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full animate-slide-up">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="text-5xl mb-3">🎓</div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        AI Study Counsellor
                    </h1>
                    <p className="text-gray-600">
                        {mode === 'signup' ? 'Create your account' : 'Welcome back'}
                    </p>
                </div>

                {/* Mode Toggle */}
                <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
                    <button
                        type="button"
                        onClick={() => {
                            setMode('signup');
                            setErrors({});
                        }}
                        className={`flex-1 py-2 rounded-md font-medium transition ${
                            mode === 'signup'
                                ? 'bg-white text-purple-600 shadow'
                                : 'text-gray-600 hover:text-gray-800'
                        }`}
                    >
                        Sign Up
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setMode('login');
                            setErrors({});
                        }}
                        className={`flex-1 py-2 rounded-md font-medium transition ${
                            mode === 'login'
                                ? 'bg-white text-purple-600 shadow'
                                : 'text-gray-600 hover:text-gray-800'
                        }`}
                    >
                        Log In
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {mode === 'signup' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={formData.fullName}
                                onChange={(e) => handleChange('fullName', e.target.value)}
                                placeholder="John Doe"
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none ${
                                    errors.fullName ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.fullName && (
                                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                            )}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            placeholder="you@example.com"
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none ${
                                errors.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => handleChange('password', e.target.value)}
                            placeholder="••••••••"
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none ${
                                errors.password ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                        {mode === 'signup' && !errors.password && (
                            <p className="text-gray-500 text-xs mt-1">
                                Minimum 6 characters
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition mt-6"
                    >
                        {mode === 'signup' ? 'Create Account' : 'Log In'}
                    </button>
                </form>

                {/* Footer Note */}
                <p className="text-center text-xs text-gray-500 mt-6">
                    MVP Demo Mode - Data stored locally
                </p>
            </div>
        </div>
    );
}