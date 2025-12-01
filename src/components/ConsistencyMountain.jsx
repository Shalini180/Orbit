import React from 'react';

const ConsistencyMountain = ({ history = {} }) => {
    // Generate last 7 days
    const days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return d.toISOString().split('T')[0];
    });

    return (
        <div className="w-full h-64 bg-sky-200 comic-border relative overflow-hidden p-4">
            {/* Sun */}
            <div className="absolute top-4 right-4 w-16 h-16 bg-yellow-400 rounded-full border-4 border-black animate-spin-slow" />

            {/* Clouds */}
            <div className="absolute top-8 left-10 w-24 h-12 bg-white rounded-full border-4 border-black opacity-80" />
            <div className="absolute top-16 left-32 w-16 h-8 bg-white rounded-full border-4 border-black opacity-60" />

            {/* Mountain Path */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-green-500 border-t-4 border-black transform skew-y-[-5deg] origin-bottom-left" />

            {/* Flags */}
            <div className="absolute bottom-8 left-4 right-4 flex justify-between items-end z-10">
                {days.map((date, index) => {
                    const entry = history[date];
                    const completed = entry && entry.completedTasks > 0;

                    return (
                        <div key={date} className="flex flex-col items-center gap-2 group">
                            {/* Flag/Marker */}
                            <div className={`w-8 h-8 rounded-full border-4 border-black flex items-center justify-center font-bold text-xs transition-transform group-hover:-translate-y-2
                                ${completed ? 'bg-yellow-400' : 'bg-gray-300'}
                            `}>
                                {completed ? '★' : 'X'}
                            </div>
                            {/* Date Label */}
                            <span className="text-[10px] font-bold bg-white px-1 border-2 border-black rounded">
                                {date.slice(5)}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Title */}
            <div className="absolute top-2 left-4 bg-white px-3 py-1 comic-border -rotate-2">
                <h3 className="font-comic text-xl text-black">CLIMB TO GLORY!</h3>
            </div>
        </div>
    );
};

export default ConsistencyMountain;
