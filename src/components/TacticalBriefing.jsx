import React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

const TacticalBriefing = ({ isOpen, onClose, content }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 font-mono"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        className="w-full max-w-2xl bg-slate-950 border-y-2 border-cyan-500 p-8 relative overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Scanlines */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 pointer-events-none bg-[length:100%_4px,3px_100%]" />

                        <div className="relative z-10">
                            <h2 className="text-2xl text-cyan-500 font-bold mb-6 tracking-widest animate-pulse">
                                TACTICAL_BRIEFING // WEEKLY_REPORT
                            </h2>

                            <pre className="text-cyan-300 text-sm whitespace-pre-wrap font-mono leading-relaxed">
                                {content}
                            </pre>

                            <button
                                onClick={onClose}
                                className="mt-8 px-6 py-2 border border-cyan-500/50 text-cyan-500 hover:bg-cyan-500/10 transition-colors text-xs uppercase tracking-widest"
                            >
                                Acknowledge & Dismiss
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

TacticalBriefing.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired
};

export default TacticalBriefing;
