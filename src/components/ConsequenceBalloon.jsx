import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ConsequenceBalloon = ({ isVisible, type = 'WARNING' }) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 bg-white comic-border p-3 z-50 pointer-events-none"
                >
                    <div className="flex gap-2 items-center mb-1">
                        <div className="w-8 h-8 bg-red-500 rounded-full border-2 border-black flex items-center justify-center text-white font-bold">
                            !
                        </div>
                        <span className="font-comic font-bold text-red-600">WAIT!</span>
                    </div>
                    <p className="text-xs font-bold leading-tight">
                        If you skip this, we lose our combo bonus! Are you sure?
                    </p>

                    {/* Thought Bubble Circles */}
                    <div className="absolute -bottom-2 left-1/2 w-3 h-3 bg-white border-2 border-black rounded-full" />
                    <div className="absolute -bottom-5 left-[45%] w-2 h-2 bg-white border-2 border-black rounded-full" />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ConsequenceBalloon;
