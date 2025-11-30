import React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Square, Zap } from 'lucide-react';

const HyperdriveHUD = ({
    isActive,
    mode,
    timeLeft,
    progress,
    onStart,
    onPause,
    onStop,
    activeTask
}) => {
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <AnimatePresence>
            {isActive && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-slate-900/90 backdrop-blur-xl"
                >
                    {/* Focus Target */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mb-12 text-center"
                    >
                        <div className="text-cyan-400 font-mono tracking-widest uppercase text-sm mb-2">
                            Current Objective
                        </div>
                        <div className="text-3xl md:text-5xl font-bold text-white max-w-2xl px-4">
                            {activeTask || "ENGAGING HYPERDRIVE"}
                        </div>
                    </motion.div>

                    {/* Timer Ring */}
                    <div className="relative w-64 h-64 md:w-96 md:h-96 flex items-center justify-center">
                        {/* Background Ring */}
                        <svg className="absolute inset-0 w-full h-full -rotate-90">
                            <circle
                                cx="50%"
                                cy="50%"
                                r="45%"
                                className="stroke-slate-800 fill-none stroke-[4]"
                            />
                            <motion.circle
                                cx="50%"
                                cy="50%"
                                r="45%"
                                className={`fill-none stroke-[4] ${mode === 'FOCUS' ? 'stroke-fuchsia-500' : 'stroke-cyan-400'}`}
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: progress }}
                                transition={{ duration: 0.5, ease: "linear" }}
                                style={{ strokeLinecap: "round" }}
                            />
                        </svg>

                        {/* Time Display */}
                        <div className="text-center z-10">
                            <div className={`text-6xl md:text-8xl font-mono font-bold ${mode === 'FOCUS' ? 'text-fuchsia-500' : 'text-cyan-400'}`}>
                                {formatTime(timeLeft)}
                            </div>
                            <div className="text-slate-500 font-mono tracking-[0.5em] uppercase mt-2">
                                {mode} CYCLE
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="mt-12 flex gap-8">
                        <button
                            onClick={onPause}
                            className="p-4 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-colors"
                        >
                            <Pause size={32} />
                        </button>
                        <button
                            onClick={onStop}
                            className="p-4 rounded-full bg-red-500/20 text-red-500 hover:bg-red-500/30 transition-colors border border-red-500/50"
                        >
                            <Square size={32} />
                        </button>
                    </div>

                    <div className="absolute bottom-8 text-slate-500 font-mono text-xs">
                        PRESS ESC TO DISENGAGE
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

HyperdriveHUD.propTypes = {
    isActive: PropTypes.bool.isRequired,
    mode: PropTypes.string.isRequired,
    timeLeft: PropTypes.number.isRequired,
    progress: PropTypes.number.isRequired,
    onStart: PropTypes.func.isRequired,
    onPause: PropTypes.func.isRequired,
    onStop: PropTypes.func.isRequired,
    activeTask: PropTypes.string
};

export default HyperdriveHUD;
