export default function LandingPage({ onStartAssessment }) {
    return (
        <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
            <div className="max-w-6xl w-full">
                {/* Hero Section */}
                <div className="text-center mb-12 animate-slide-up">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                        Your AI Study Abroad Counsellor
                    </h1>
                    <p className="text-xl text-purple-100 mb-8">
                        Get personalized recommendations for universities and countries based on your profile
                    </p>
                    <button 
                        onClick={onStartAssessment}
                        className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-50 transition shadow-lg"
                    >
                        Start Your Assessment →
                    </button>
                </div>

                {/* Features */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {[
                        { icon: "🎓", title: "Smart Matching", desc: "AI-powered recommendations based on your academic profile and budget" },
                        { icon: "💰", title: "Budget Analysis", desc: "Realistic cost breakdowns and scholarship opportunities" },
                        { icon: "🗺️", title: "Global Coverage", desc: "Compare opportunities across 50+ countries worldwide" }
                    ].map((feature, idx) => (
                        <div key={idx} className="bg-white/10 backdrop-blur-lg p-6 rounded-xl text-white">
                            <div className="text-4xl mb-3">{feature.icon}</div>
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-purple-100">{feature.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Testimonials */}
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-white">
                    <h3 className="text-2xl font-bold mb-4 text-center">Trusted by Students Worldwide</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { quote: "Got into my dream university in Canada! The AI recommendations were spot-on.", name: "Priya S.", school: "University of Toronto" },
                            { quote: "Saved thousands by finding scholarship opportunities I didn't know existed.", name: "Ahmed K.", school: "TU Munich" }
                        ].map((testimonial, idx) => (
                            <div key={idx} className="bg-white/10 p-4 rounded-lg">
                                <p className="italic mb-2">"{testimonial.quote}"</p>
                                <p className="font-semibold">- {testimonial.name}</p>
                                <p className="text-sm text-purple-200">{testimonial.school}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}