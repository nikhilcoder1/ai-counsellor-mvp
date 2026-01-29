export default function LoadingPage({ progress, message }) {
    return (
        <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
                <div className="text-center mb-6">
                    <div className="text-6xl mb-4 animate-pulse-slow">🤖</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Analyzing Your Profile</h2>
                    <p className="text-gray-600">{message}</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div 
                        className="bg-linear-to-r from-purple-600 to-blue-600 h-4 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <p className="text-center mt-2 text-gray-600 font-semibold">{progress}%</p>
            </div>
        </div>
    );
}