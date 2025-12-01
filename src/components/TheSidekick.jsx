import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TheSidekick = ({ mood, message, onClick, variant }) => {
    // Simple SVG Avatar that changes based on mood
    const renderAvatar = () => {
        let eyes = "OO";
        let mouth = "-";
        let color = "bg-yellow-400";
        let animation = {};

        switch (mood) {
            case 'HAPPY':
                eyes = "^^";
                mouth = "D";
                color = "bg-yellow-400";
                animation = { y: [0, -10, 0] };
                break;
            case 'FOCUSED':
                eyes = "--";
                mouth = ".";
                color = "bg-blue-400";
                break;
            case 'PANICKED':
                eyes = "><";
                mouth = "O";
                color = "bg-red-400";
                animation = { x: [-2, 2, -2] };
                break;
            case 'SLEEPY':
                eyes = "uu";
                mouth = "o";
                color = "bg-indigo-300";
                break;
            case 'PARTY':
                eyes = "$$";
                mouth = "P";
                color = "bg-pink-400";
                animation = { scale: [1, 1.2, 1], rotate: [0, 360] };
                break;
            default:
                break;
        }

        // Variant Overrides
        if (variant) {
            if (variant.colors) {
                // Simplified color application - in a real app, might use style prop or dynamic classes
                // For now, mapping colors to tailwind classes if possible, or using style
            }
        }

        const getVariantAccessory = () => {
            if (!variant) return null;
            switch (variant.outfit) {
                case 'CYBER_VISOR':
                    return (
                        <div className="absolute top-6 w-16 h-4 bg-green-400 opacity-80 mix-blend-screen animate-pulse rounded-sm border border-white" />
                    );
                case 'HEADBAND':
                    return (
                        <div className="absolute top-2 w-full h-4 bg-red-600 z-10" />
                    );
                case 'HOODIE':
                    return (
                        <div className="absolute -top-2 w-28 h-28 border-8 border-slate-700 rounded-full z-0" />
                    );
                default:
                    return null;
            }
        };

        return (
            <motion.div
                className={`w-24 h-24 rounded-full comic-border flex flex-col items-center justify-center cursor-pointer relative overflow-visible`}
                style={{ backgroundColor: variant?.colors?.[0] || '#facc15' }}
                animate={animation}
                transition={{ repeat: Infinity, duration: mood === 'PANICKED' ? 0.5 : 2 }}
                onClick={onClick}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                {getVariantAccessory()}

                {/* Goggles */}
                <div className="flex gap-1 mb-1 z-10">
                    <div className="w-8 h-8 bg-white rounded-full border-4 border-black flex items-center justify-center font-bold text-black text-xs">
                        {eyes.split(' ')[0]}
                    </div>
                    <div className="w-8 h-8 bg-white rounded-full border-4 border-black flex items-center justify-center font-bold text-black text-xs">
                        {eyes.split(' ')[1] || eyes.split(' ')[0]}
                    </div>
                </div>
                {/* Mouth */}
                <div className="font-black text-black text-lg z-10">{mouth}</div>

                {/* Shine */}
                <div className="absolute top-2 right-4 w-4 h-2 bg-white rounded-full opacity-50 rotate-[-45deg] z-20" />
            </motion.div>
        );
    };

    return (
        <div className="fixed bottom-8 right-8 flex flex-col items-end z-50">
            <AnimatePresence>
                {message && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="bg-white comic-border p-4 mb-4 max-w-xs relative speech-bubble"
                    >
                        <p className="font-bold text-black text-sm">{message}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {renderAvatar()}
        </div>
    );
};

export default TheSidekick;
