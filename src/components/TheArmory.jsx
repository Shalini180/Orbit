import React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Check } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const TheArmory = ({ isOpen, onClose, userLevel }) => {
    const { currentTheme, unlockTheme, availableThemes } = useTheme();

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-slate-900 border border-slate-700 p-8 rounded-2xl w-full max-w-2xl shadow-2xl relative overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-mono font-bold text-white tracking-widest uppercase">
                                The Armory
                            </h2>
                            <div className="text-xs font-mono text-slate-500">
                                LEVEL {userLevel} ACCESS GRANTED
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.values(availableThemes).map((theme) => {
                                const isLocked = userLevel < theme.requiredLevel;
                                const isActive = currentTheme === theme.id;

                                return (
                                    <button
                                        key={theme.id}
                                        onClick={() => !isLocked && unlockTheme(theme.id)}
                                        disabled={isLocked}
                                        className={`
                      relative p-6 rounded-xl border-2 transition-all duration-300 text-left group
                      ${isActive
                                                ? 'border-cyan-400 bg-cyan-900/20'
                                                : isLocked
                                                    ? 'border-slate-800 bg-slate-900/50 opacity-50 cursor-not-allowed'
                                                    : 'border-slate-700 hover:border-slate-500 hover:bg-slate-800'
                                            }
                    `}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <span className={`font-mono font-bold ${isActive ? 'text-cyan-400' : 'text-white'}`}>
                                                {theme.name}
                                            </span>
                                            {isLocked ? (
                                                <Lock size={16} className="text-slate-500" />
                                            ) : isActive ? (
                                                <Check size={16} className="text-cyan-400" />
                                            ) : null}
                                        </div>

                                        {isLocked ? (
                                            <div className="text-xs font-mono text-slate-500 mt-2">
                                                REQUIRES LEVEL {theme.requiredLevel}
                                            </div>
                                        ) : (
                                            <div className="flex gap-2 mt-2">
                                                <div className="w-4 h-4 rounded-full" style={{ background: theme.colors['--color-bg'] }} />
                                                <div className="w-4 h-4 rounded-full" style={{ background: theme.colors['--color-primary'] }} />
                                                <div className="w-4 h-4 rounded-full" style={{ background: theme.colors['--color-accent'] }} />
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            onClick={onClose}
                            className="mt-8 w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono rounded-lg transition-colors"
                        >
                            CLOSE TERMINAL
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

TheArmory.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    userLevel: PropTypes.number.isRequired
};

export default TheArmory;
