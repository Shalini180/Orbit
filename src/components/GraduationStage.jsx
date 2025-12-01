import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const GraduationStage = ({ partner, onClose }) => {

    useEffect(() => {
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#fbbf24', '#3b82f6'] // Gold and Blue
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#fbbf24', '#3b82f6']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };
        frame();
    }, []);

    return (
        <div className="fixed inset-0 z-50 bg-slate-900 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-3xl"
            >
                <div className="text-8xl mb-8">🎓</div>
                <h1 className="text-6xl font-black text-yellow-400 mb-4 font-serif">CONGRATULATIONS!</h1>
                <p className="text-2xl text-white mb-12">
                    You have successfully completed The Academy training program with <span className="text-blue-400 font-bold">{partner?.name}</span>.
                </p>

                <div className="flex justify-center gap-8 mb-12">
                    {/* Yearbook Photo Placeholder */}
                    <div className="w-64 h-80 bg-white p-4 rotate-[-2deg] shadow-xl transform hover:scale-105 transition-transform">
                        <div className="w-full h-full bg-slate-200 flex items-center justify-center border-2 border-black">
                            <span className="font-comic font-bold text-slate-400">YEARBOOK PHOTO</span>
                        </div>
                    </div>
                </div>

                <div className="bg-blue-900/50 p-6 rounded-xl border border-blue-500/30 mb-8">
                    <h3 className="text-blue-300 font-bold mb-2 uppercase tracking-widest">Rewards Unlocked</h3>
                    <ul className="text-white text-lg space-y-2">
                        <li>✨ <span className="font-bold">Academy Graduate Badge</span></li>
                        <li>👕 <span className="font-bold">New Costume: "Alumni"</span></li>
                        <li>💰 <span className="font-bold">500 Hero Tokens</span></li>
                    </ul>
                </div>

                <button
                    onClick={onClose}
                    className="bg-yellow-500 hover:bg-yellow-400 text-black px-12 py-4 rounded-full font-bold text-2xl shadow-lg hover:scale-105 transition-transform"
                >
                    ACCEPT DIPLOMA
                </button>
            </motion.div>
        </div>
    );
};

export default GraduationStage;
