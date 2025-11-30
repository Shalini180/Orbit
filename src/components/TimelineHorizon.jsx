import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const TimelineHorizon = ({ events }) => {
    // Sort events by time
    const sortedEvents = [...events].sort((a, b) => a.start - b.start);

    return (
        <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black via-slate-900/90 to-transparent z-40 border-t border-slate-800/50 backdrop-blur-sm overflow-hidden hidden md:flex items-center px-8">

            {/* The River of Time (Line) */}
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-slate-700/50" />

            {/* "Now" Marker */}
            <div className="absolute top-0 bottom-0 left-32 w-[2px] bg-cyan-500 shadow-[0_0_10px_#06b6d4] z-10">
                <div className="absolute top-2 left-2 text-[10px] text-cyan-500 font-mono tracking-widest">NOW</div>
            </div>

            {/* Events Stream */}
            <div className="flex items-center gap-4 ml-32 pl-8 overflow-x-auto scrollbar-hide w-full h-full relative">
                {sortedEvents.length === 0 && (
                    <span className="text-slate-600 text-xs font-mono italic">No upcoming missions on the horizon...</span>
                )}

                {sortedEvents.map((event) => {
                    const isFocus = event.type === 'FOCUS';
                    const borderColor = event.source === 'google-calendar' ? 'border-yellow-500' : 'border-purple-500';
                    const glowColor = event.source === 'google-calendar' ? 'shadow-yellow-500/20' : 'shadow-purple-500/20';

                    return (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`
                flex-shrink-0 relative h-12 min-w-[120px] px-3 py-1 rounded border-l-2 
                bg-slate-800/50 backdrop-blur-md flex flex-col justify-center
                ${borderColor} shadow-lg ${glowColor}
              `}
                        >
                            <span className="text-[10px] text-slate-400 font-mono">
                                {event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            <span className={`text-xs font-bold truncate ${isFocus ? 'text-purple-300' : 'text-slate-200'}`}>
                                {event.title}
                            </span>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

TimelineHorizon.propTypes = {
    events: PropTypes.array.isRequired
};

export default TimelineHorizon;
