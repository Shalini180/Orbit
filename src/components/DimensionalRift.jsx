import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Zap, Home, Briefcase } from 'lucide-react';

const DimensionalRift = ({ dimensions, activeDimensionId, onSwitch }) => {
    const [isOpen, setIsOpen] = useState(false);

    const getIcon = (type) => {
        switch (type) {
            case 'WORK': return <Briefcase size={20} />;
            case 'HOME': return <Home size={20} />;
            default: return <Globe size={20} />;
        }
    };

    const handleSwitch = (id) => {
        setIsOpen(false);
        onSwitch(id);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="bg-black/90 backdrop-blur-md border-2 border-cyan-500 rounded-xl p-4 shadow-[0_0_30px_rgba(6,182,212,0.5)] min-w-[200px]"
                    >
                        <h3 className="text-cyan-400 font-bold mb-2 text-xs uppercase tracking-widest border-b border-cyan-500/30 pb-1">
                            Select Reality
                        </h3>
                        <div className="flex flex-col gap-2">
                            {dimensions.map(dim => (
                                <button
                                    key={dim.id}
                                    onClick={() => handleSwitch(dim.id)}
                                    className={`flex items-center gap-3 p-2 rounded-lg transition-all text-left ${activeDimensionId === dim.id
                                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                                            : 'hover:bg-white/10 text-slate-400 hover:text-white'
                                        }`}
                                >
                                    <div className={`${activeDimensionId === dim.id ? 'text-cyan-400' : 'text-slate-500'}`}>
                                        {getIcon(dim.type)}
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm">{dim.name}</div>
                                        <div className="text-[10px] font-mono opacity-70">{dim.id}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl border-4 transition-colors ${isOpen
                        ? 'bg-cyan-500 border-white text-white shadow-[0_0_50px_rgba(6,182,212,0.8)]'
                        : 'bg-slate-900 border-cyan-500 text-cyan-400'
                    }`}
            >
                <Zap size={32} />
            </motion.button>
        </div>
    );
};

export default DimensionalRift;
