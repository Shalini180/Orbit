import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

const ImpactPredictor = ({ isOpen, consequences }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-64 bg-red-950/90 border border-red-500 rounded-lg p-4 shadow-xl z-50 backdrop-blur-md"
                >
                    <div className="flex items-center gap-2 text-red-400 mb-2 border-b border-red-500/30 pb-2">
                        <AlertTriangle size={16} />
                        <span className="font-bold text-xs uppercase tracking-wider">Impact Prediction</span>
                    </div>
                    <ul className="space-y-2">
                        {consequences.map((item, index) => (
                            <li key={index} className="text-xs text-red-200 flex items-start gap-2">
                                <span className="text-red-500 font-bold">[!]</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                    <div className="mt-3 text-[10px] text-red-400 font-mono text-center opacity-70">
                        CONFIRM ACTION?
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ImpactPredictor;
