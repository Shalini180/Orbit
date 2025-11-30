import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

const XPHUD = ({ level, totalXP, progress, isLocked }) => {
    const [displayedXP, setDisplayedXP] = useState(totalXP);

    useEffect(() => {
        // Animate XP counting up
        if (totalXP > displayedXP) {
            const diff = totalXP - displayedXP;
            const step = Math.ceil(diff / 20); // 20 frames to catch up
            const timer = setInterval(() => {
                setDisplayedXP(prev => {
                    if (prev + step >= totalXP) {
                        clearInterval(timer);
                        return totalXP;
                    }
                    return prev + step;
                });
            }, 30);
            return () => clearInterval(timer);
        } else {
            setDisplayedXP(totalXP);
        }
    }, [totalXP]);

    if (!isLocked) return null;

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="fixed top-4 right-4 z-30 flex flex-col items-end pointer-events-none"
        >
            <div className="flex items-baseline gap-2 mb-1">
                <span className="text-xs text-slate-500 font-mono tracking-widest uppercase">Level</span>
                <span className="text-2xl font-bold text-white font-mono">{level}</span>
            </div>

            <div className="flex items-baseline gap-2 mb-2">
                <span className="text-xs text-slate-500 font-mono tracking-widest uppercase">XP</span>
                <span className="text-lg font-mono text-cyan-400">{displayedXP.toLocaleString()}</span>
            </div>

            <div className="w-32 h-1 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-gradient-to-r from-cyan-500 to-fuchsia-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ type: 'spring', stiffness: 50 }}
                />
            </div>
        </motion.div>
    );
};

XPHUD.propTypes = {
    level: PropTypes.number.isRequired,
    totalXP: PropTypes.number.isRequired,
    progress: PropTypes.number.isRequired,
    isLocked: PropTypes.bool.isRequired
};

export default XPHUD;
