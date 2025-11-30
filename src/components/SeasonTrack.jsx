import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Trophy, Star, Gift } from 'lucide-react';

const SeasonTrack = ({ season, progress, daysRemaining }) => {
    return (
        <div className="w-full max-w-4xl mb-8 p-4 bg-slate-900/50 border border-slate-800 rounded-xl backdrop-blur-sm">
            <div className="flex justify-between items-end mb-4">
                <div>
                    <h3 className={`text-xl font-bold ${season.color} flex items-center gap-2`}>
                        <Star size={20} />
                        SEASON: {season.name.toUpperCase()}
                    </h3>
                    <p className="text-slate-400 text-sm font-mono">{season.affix}</p>
                </div>
                <div className="text-right">
                    <span className="text-2xl font-bold text-white font-mono">{daysRemaining}</span>
                    <span className="text-xs text-slate-500 block">DAYS REMAINING</span>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="relative h-4 bg-slate-800 rounded-full overflow-hidden mb-2">
                <motion.div
                    className={`absolute top-0 left-0 bottom-0 ${season.color.replace('text', 'bg')} opacity-80`}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                />
            </div>

            {/* Milestones */}
            <div className="flex justify-between text-xs text-slate-600 font-mono px-1">
                <span>LVL 1</span>
                <span className="flex items-center gap-1"><Gift size={10} /> REWARD</span>
                <span>LVL 30</span>
            </div>
        </div>
    );
};

SeasonTrack.propTypes = {
    season: PropTypes.object.isRequired,
    progress: PropTypes.number.isRequired,
    daysRemaining: PropTypes.number.isRequired
};

export default SeasonTrack;
