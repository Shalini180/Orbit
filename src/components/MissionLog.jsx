import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const MissionLog = ({ history, isLocked }) => {
    if (!isLocked) return null;

    // Generate last 30 days
    const days = Array.from({ length: 30 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (29 - i));
        return d.toISOString().split('T')[0];
    });

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="fixed bottom-8 left-8 z-20 hidden md:flex flex-col gap-2"
        >
            <div className="text-[10px] text-slate-500 font-mono tracking-widest uppercase mb-1">
                Mission Log (30 Days)
            </div>
            <div className="flex gap-1">
                {days.map(date => {
                    const entry = history[date];
                    let colorClass = 'bg-slate-800'; // No data

                    if (entry) {
                        if (entry.perfectDay) {
                            colorClass = 'bg-fuchsia-500 shadow-[0_0_8px_rgba(217,70,239,0.6)]'; // Perfect
                        } else if (entry.completedTasks > 0) {
                            colorClass = 'bg-cyan-500/50'; // Partial
                        }
                    }

                    return (
                        <div
                            key={date}
                            className={`w-2 h-8 rounded-sm transition-all duration-500 ${colorClass}`}
                            title={date}
                        />
                    );
                })}
            </div>
        </motion.div>
    );
};

MissionLog.propTypes = {
    history: PropTypes.object.isRequired,
    isLocked: PropTypes.bool.isRequired
};

export default MissionLog;
