import React from 'react';
import { motion } from 'framer-motion';

const OriginComic = ({ attribute, level, onClose }) => {
    const getComicData = () => {
        switch (attribute) {
            case 'MIGHT':
                return {
                    title: 'THE AWAKENING OF STRENGTH',
                    panel1: 'Every rep, every lift... pushing beyond the limit.',
                    panel2: 'Something inside snapped... but in a good way!',
                    panel3: 'I AM UNSTOPPABLE!',
                    color: 'bg-red-500',
                    emoji: '💪'
                };
            case 'MIND':
                return {
                    title: 'NEURAL LINK ESTABLISHED',
                    panel1: 'The data stream was overwhelming...',
                    panel2: 'Then, the patterns emerged.',
                    panel3: 'I SEE THE CODE MATRIX!',
                    color: 'bg-blue-500',
                    emoji: '🧠'
                };
            case 'SPEED':
                return {
                    title: 'VELOCITY BREACH',
                    panel1: 'Too many tasks, too little time...',
                    panel2: 'The world seemed to slow down.',
                    panel3: 'I AM SPEED!',
                    color: 'bg-yellow-500',
                    emoji: '⚡'
                };
            case 'SPIRIT':
                return {
                    title: 'RADIANT SOUL',
                    panel1: 'Connecting hearts and minds...',
                    panel2: 'A warm light began to glow.',
                    panel3: 'HOPE SHINES BRIGHT!',
                    color: 'bg-pink-500',
                    emoji: '✨'
                };
            default:
                return {
                    title: 'LEVEL UP',
                    panel1: 'Work hard.',
                    panel2: 'Get better.',
                    panel3: 'LEVEL UP!',
                    color: 'bg-gray-500',
                    emoji: '🆙'
                };
        }
    };

    const data = getComicData();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div className="max-w-4xl w-full bg-white comic-border p-4 rotate-1">
                <h1 className={`text-4xl font-black italic text-center mb-8 ${data.color.replace('bg-', 'text-')} uppercase`}>
                    {data.title}
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Panel 1 */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="aspect-square border-4 border-black relative overflow-hidden bg-slate-100"
                    >
                        <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20 grayscale">
                            {data.emoji}
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 bg-white border-2 border-black p-2 text-sm font-bold">
                            {data.panel1}
                        </div>
                    </motion.div>

                    {/* Panel 2 */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.5 }}
                        className={`aspect-square border-4 border-black relative overflow-hidden ${data.color}`}
                    >
                        <div className="absolute inset-0 flex items-center justify-center text-9xl animate-pulse">
                            💥
                        </div>
                        <div className="absolute top-4 left-4 right-4 bg-yellow-300 border-2 border-black p-2 text-sm font-bold uppercase transform -rotate-2">
                            {data.panel2}
                        </div>
                    </motion.div>

                    {/* Panel 3 */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 2.5 }}
                        className="aspect-square border-4 border-black relative overflow-hidden bg-white"
                    >
                        <div className="absolute inset-0 flex items-center justify-center text-8xl">
                            🦸
                        </div>
                        <div className="absolute bottom-8 left-2 right-2 text-center">
                            <h2 className="text-3xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 drop-shadow-sm">
                                {data.panel3}
                            </h2>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 4 }}
                    className="text-center mt-8"
                >
                    <button className="bg-black text-white px-8 py-3 font-bold text-xl hover:scale-110 transition-transform">
                        CONTINUE THE JOURNEY
                    </button>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default OriginComic;
