import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, ShieldAlert } from 'lucide-react';

const TheDangerRoom = ({ partner, onClose }) => {
    const [progress, setProgress] = useState(0);
    const [partnerProgress, setPartnerProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    // Simulate partner progress
    useEffect(() => {
        const interval = setInterval(() => {
            setPartnerProgress(prev => {
                if (prev >= 4) return 4;
                return Math.random() > 0.7 ? prev + 1 : prev;
            });
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (progress >= 4 && partnerProgress >= 4) {
            setIsComplete(true);
        }
    }, [progress, partnerProgress]);

    return (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 font-mono">
            <div className="w-full max-w-5xl border-4 border-red-600 rounded-xl p-8 relative overflow-hidden">
                {/* Wireframe Background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.1)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

                <div className="relative z-10">
                    <div className="flex justify-between items-center mb-12">
                        <h2 className="text-5xl font-black text-red-600 uppercase tracking-tighter flex items-center gap-4">
                            <ShieldAlert size={48} /> DANGER ROOM
                        </h2>
                        <div className="text-red-500 animate-pulse font-bold text-xl">
                            SIMULATION ACTIVE
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-12">
                        {/* User Lane */}
                        <div className="border-2 border-red-500/50 p-6 rounded-lg bg-red-900/10">
                            <h3 className="text-red-400 font-bold mb-4 text-xl">YOU</h3>
                            <div className="space-y-4">
                                {[1, 2, 3, 4].map(step => (
                                    <div
                                        key={step}
                                        onClick={() => !isComplete && setProgress(prev => Math.min(prev + 1, 4))}
                                        className={`h-16 border-2 border-red-500 flex items-center justify-center cursor-pointer transition-all ${step <= progress ? 'bg-red-600 text-black' : 'bg-transparent text-red-500 hover:bg-red-900/30'
                                            }`}
                                    >
                                        {step <= progress ? <Zap size={32} /> : <Target size={24} />}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Partner Lane */}
                        <div className="border-2 border-red-500/50 p-6 rounded-lg bg-red-900/10 opacity-80">
                            <h3 className="text-red-400 font-bold mb-4 text-xl">{partner?.name || "PARTNER"}</h3>
                            <div className="space-y-4">
                                {[1, 2, 3, 4].map(step => (
                                    <div
                                        key={step}
                                        className={`h-16 border-2 border-red-500 flex items-center justify-center transition-all ${step <= partnerProgress ? 'bg-red-600 text-black' : 'bg-transparent text-red-500'
                                            }`}
                                    >
                                        {step <= partnerProgress ? <Zap size={32} /> : <Target size={24} />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {isComplete && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-20"
                        >
                            <h2 className="text-6xl font-black text-green-500 mb-4">SIMULATION COMPLETE</h2>
                            <p className="text-green-400 text-2xl mb-8">SYNC RATE: 100%</p>
                            <div className="bg-yellow-500/20 border-4 border-yellow-500 p-8 rounded-xl text-center">
                                <div className="text-yellow-500 text-6xl mb-2">🎁</div>
                                <div className="text-yellow-500 font-bold text-2xl">SIMULATION CRATE ACQUIRED</div>
                            </div>
                            <button onClick={onClose} className="mt-12 text-white font-bold hover:text-green-400 text-xl">
                                [EXIT_SIMULATION]
                            </button>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TheDangerRoom;
