import React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Medal = ({ medal, isUnlocked }) => (
    <motion.div
        whileHover={{ scale: 1.05, rotateX: 10, rotateY: 10 }}
        className={`
      relative aspect-square rounded-xl border-2 flex flex-col items-center justify-center p-4 text-center transition-all
      ${isUnlocked
                ? 'border-yellow-500/50 bg-yellow-900/10 shadow-[0_0_15px_rgba(234,179,8,0.2)]'
                : 'border-slate-800 bg-slate-900/50 opacity-50 grayscale'}
    `}
    >
        <div className="text-4xl mb-2">{medal.icon}</div>
        <h4 className={`font-bold text-sm ${isUnlocked ? 'text-yellow-100' : 'text-slate-500'}`}>
            {medal.name}
        </h4>
        <p className="text-[10px] text-slate-400 mt-1">{medal.description}</p>

        {!isUnlocked && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-xl backdrop-blur-[1px]">
                <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Locked</span>
            </div>
        )}
    </motion.div>
);

const MedalCase = ({ isOpen, onClose, medals, unlockedIds }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-xl p-8 shadow-2xl relative max-h-[80vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                            <span className="text-yellow-500">MEDAL CASE</span>
                            <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded font-mono">
                                {unlockedIds.length} / {medals.length} UNLOCKED
                            </span>
                        </h2>
                        <p className="text-slate-400 mb-8">Achievements and commendations earned during your service.</p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {medals.map(medal => (
                                <Medal
                                    key={medal.id}
                                    medal={medal}
                                    isUnlocked={unlockedIds.includes(medal.id)}
                                />
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

MedalCase.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    medals: PropTypes.array.isRequired,
    unlockedIds: PropTypes.array.isRequired
};

export default MedalCase;
