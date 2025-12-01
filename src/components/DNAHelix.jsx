import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Brain, Zap, Heart } from 'lucide-react';

const DNAHelix = ({ attributes }) => {
    const [selectedAttr, setSelectedAttr] = useState(null);

    const renderStrand = (color, delay) => (
        <motion.div
            className={`w-4 h-4 rounded-full ${color} absolute`}
            animate={{
                y: [0, 100, 0],
                x: [0, 20, 0],
                scale: [1, 0.5, 1],
                opacity: [1, 0.5, 1]
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                delay: delay,
                ease: "easeInOut"
            }}
        />
    );

    const StatNode = ({ icon: Icon, color, label, value, onClick }) => (
        <motion.div
            className={`flex flex-col items-center gap-1 cursor-pointer p-2 rounded-lg hover:bg-white/10 transition-colors ${selectedAttr === label ? 'bg-white/20 ring-2 ring-white' : ''}`}
            onClick={() => onClick(label)}
            whileHover={{ scale: 1.1 }}
        >
            <div className={`p-2 rounded-full ${color} text-white shadow-lg`}>
                <Icon size={16} />
            </div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</div>
            <div className="text-xs font-mono font-bold text-white">Lvl {value.level}</div>
        </motion.div>
    );

    return (
        <div className="bg-slate-900 rounded-xl p-4 border border-slate-700 w-full max-w-xs relative overflow-hidden">
            {/* Background Animation (Abstract Helix) */}
            <div className="absolute right-4 top-0 bottom-0 w-12 opacity-20 pointer-events-none">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="relative h-8">
                        {renderStrand('bg-cyan-500', i * 0.2)}
                        {renderStrand('bg-purple-500', i * 0.2 + 1)}
                    </div>
                ))}
            </div>

            <h3 className="text-cyan-400 font-bold text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                <Activity size={14} /> Genetic Profile
            </h3>

            <div className="grid grid-cols-2 gap-4 relative z-10">
                <StatNode icon={Activity} color="bg-red-500" label="MIGHT" value={attributes.MIGHT} onClick={setSelectedAttr} />
                <StatNode icon={Brain} color="bg-blue-500" label="MIND" value={attributes.MIND} onClick={setSelectedAttr} />
                <StatNode icon={Zap} color="bg-yellow-500" label="SPEED" value={attributes.SPEED} onClick={setSelectedAttr} />
                <StatNode icon={Heart} color="bg-pink-500" label="SPIRIT" value={attributes.SPIRIT} onClick={setSelectedAttr} />
            </div>

            {/* Detail View */}
            <AnimatePresence>
                {selectedAttr && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-4 pt-4 border-t border-slate-700 overflow-hidden"
                    >
                        <div className="text-xs text-slate-300">
                            <span className="font-bold text-white">{selectedAttr}</span> XP: {attributes[selectedAttr].xp} / {attributes[selectedAttr].level * 100}
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full mt-1 overflow-hidden">
                            <motion.div
                                className="h-full bg-cyan-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${(attributes[selectedAttr].xp % 100) / 100 * 100}%` }}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DNAHelix;
