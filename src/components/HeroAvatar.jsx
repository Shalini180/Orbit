import React from 'react';
import { motion } from 'framer-motion';

const HeroAvatar = ({ attributes }) => {
    const { MIGHT, MIND, SPEED, SPIRIT } = attributes;

    // Scale factors based on levels (capped at lvl 10 for visuals)
    const mightScale = Math.min(MIGHT.level, 10) / 10;
    const mindScale = Math.min(MIND.level, 10) / 10;
    const speedScale = Math.min(SPEED.level, 10) / 10;
    const spiritScale = Math.min(SPIRIT.level, 10) / 10;

    return (
        <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Aura (Speed/Spirit) */}
            {(speedScale > 0.3 || spiritScale > 0.3) && (
                <motion.div
                    className="absolute inset-0 rounded-full blur-xl opacity-50"
                    style={{
                        background: `radial-gradient(circle, ${spiritScale > speedScale ? '#fbbf24' : '#3b82f6'} 0%, transparent 70%)`
                    }}
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            )}

            {/* Body Base (Might) */}
            <motion.svg
                viewBox="0 0 200 200"
                className="w-full h-full z-10 drop-shadow-2xl"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 + (mightScale * 0.2) }} // Bulk up
            >
                {/* Torso */}
                <path
                    d="M 70 140 L 130 140 L 120 80 L 80 80 Z"
                    fill="#334155"
                    stroke="black"
                    strokeWidth="3"
                />

                {/* Arms (Might affects thickness) */}
                <rect x="40" y="80" width="30" height="80" rx="10" fill="#cbd5e1" stroke="black" strokeWidth="3" transform={`scale(${1 + mightScale * 0.5} 1)`} />
                <rect x="130" y="80" width="30" height="80" rx="10" fill="#cbd5e1" stroke="black" strokeWidth="3" transform={`scale(${1 + mightScale * 0.5} 1)`} />

                {/* Head */}
                <circle cx="100" cy="60" r="30" fill="#f1f5f9" stroke="black" strokeWidth="3" />

                {/* Mind Accessories */}
                {mindScale > 0.4 && (
                    // Cyber Visor
                    <rect x="80" y="50" width="40" height="10" fill="#06b6d4" opacity="0.8" />
                )}
                {mindScale > 0.7 && (
                    // Brain Glow
                    <circle cx="100" cy="60" r="32" fill="none" stroke="#06b6d4" strokeWidth="2" strokeDasharray="4 4" className="animate-spin-slow" />
                )}

                {/* Face */}
                <circle cx="90" cy="55" r="3" fill="black" />
                <circle cx="110" cy="55" r="3" fill="black" />
                <path d="M 90 70 Q 100 75 110 70" stroke="black" strokeWidth="2" fill="none" />
            </motion.svg>

            {/* Level Badge */}
            <div className="absolute bottom-0 bg-black text-white px-3 py-1 rounded-full font-bold text-xs border-2 border-cyan-500">
                LVL {Math.floor((MIGHT.level + MIND.level + SPEED.level + SPIRIT.level) / 4)} HERO
            </div>
        </div>
    );
};

export default HeroAvatar;
