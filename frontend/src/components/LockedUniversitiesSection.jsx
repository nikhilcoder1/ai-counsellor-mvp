export default function LockedUniversitiesSection({ lockedUniversities, onUnlock }) {
    if (lockedUniversities.length === 0) {
        return (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-3">
                    <span className="text-2xl">🔓</span>
                    <div>
                        <h3 className="font-bold text-yellow-800 mb-2">No Universities Locked Yet</h3>
                        <p className="text-sm text-yellow-700">
                            Lock at least one university to unlock application guidance and personalized tasks.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span>🔒</span> Locked Universities ({lockedUniversities.length})
            </h2>
            <p className="text-gray-600 mb-4">
                Your finalized university list. Application guidance is now unlocked!
            </p>

            <div className="grid md:grid-cols-2 gap-4">
                {lockedUniversities.map((uni, idx) => (
                    <div key={idx} className="border border-green-200 bg-green-50 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                                <h3 className="font-bold text-lg">{uni.name}</h3>
                                <p className="text-sm text-gray-600">{uni.country} {uni.flag}</p>
                            </div>
                            <span className="bg-green-600 text-white text-xs px-2 py-1 rounded font-semibold">
                                LOCKED
                            </span>
                        </div>

                        <div className="space-y-1 text-sm mb-3">
                            <p><span className="font-semibold">Match Score:</span> {uni.matchScore}/10</p>
                            <p><span className="font-semibold">Tuition:</span> {uni.tuitionRange}</p>
                            <p className="text-red-600 font-semibold">
                                Deadline: {uni.applicationDeadline}
                            </p>
                        </div>

                        <button
                            onClick={() => onUnlock(uni)}
                            className="w-full bg-red-100 text-red-700 py-2 rounded-lg text-sm font-semibold hover:bg-red-200 transition"
                        >
                            🔓 Unlock University
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}