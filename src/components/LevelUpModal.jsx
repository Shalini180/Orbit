import React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

const LevelUpModal = ({ level, onClose }) => {
    return (
        <AnimatePresence>
            {level && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.5, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="bg-slate-900 border-2 border-fuchsia-500 p-12 rounded-2xl text-center shadow-[0_0_100px_rgba(217,70,239,0.4)] relative overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Background effects */}
                        <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-500/10 to-transparent pointer-events-none" />

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-fuchsia-400 font-mono tracking-[0.3em] uppercase mb-4"
                        >
                            Promotion Granted
                        </motion.div>

                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.4, type: 'spring' }}
                            className="text-8xl font-bold text-white mb-6 font-mono"
                        >
                            LEVEL {level}
                        </motion.div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onClose}
                            className="px-8 py-3 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold rounded-full transition-colors uppercase tracking-widest text-sm"
                        >
                            Acknowledge
                        </motion.button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

LevelUpModal.propTypes = {
    level: PropTypes.number,
    onClose: PropTypes.func.isRequired
};

export default LevelUpModal;
