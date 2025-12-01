import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Users, Award, CheckCircle } from 'lucide-react';

const AcademyHall = ({ status, role, partner, onFindMatch, onSignOath, onClose }) => {
    const [isSigning, setIsSigning] = useState(false);

    return (
        <div className="fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-md flex items-center justify-center p-4 font-mono">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-slate-900 w-full max-w-4xl h-[80vh] border-2 border-blue-500/50 rounded-xl relative overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.3)]"
            >
                {/* Holographic Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

                {/* Header */}
                <div className="relative z-10 p-8 border-b border-blue-500/30 flex justify-between items-center">
                    <div>
                        <h2 className="text-4xl font-black text-blue-400 tracking-widest uppercase flex items-center gap-4">
                            <Shield size={40} /> The Academy
                        </h2>
                        <p className="text-blue-300/70 mt-2">MENTORSHIP & TRAINING HUB</p>
                    </div>
                    <button onClick={onClose} className="text-blue-400 hover:text-white font-bold text-xl">
                        [CLOSE_CONNECTION]
                    </button>
                </div>

                {/* Main Content */}
                <div className="relative z-10 p-8 h-full flex flex-col items-center justify-center">

                    {status === 'IDLE' && (
                        <div className="text-center max-w-lg">
                            <div className="w-32 h-32 bg-blue-500/20 rounded-full mx-auto mb-8 flex items-center justify-center border-4 border-blue-400 animate-pulse">
                                <Users size={64} className="text-blue-400" />
                            </div>
                            <h3 className="text-2xl text-white font-bold mb-4">
                                {role === 'MENTOR' ? "RECRUIT A CADET" : "FIND A MENTOR"}
                            </h3>
                            <p className="text-blue-200 mb-8">
                                {role === 'MENTOR'
                                    ? "Pass on your knowledge. Train the next generation of heroes. Earn Legacy rewards."
                                    : "Learn from the best. Gain experience faster. Unlock your true potential."}
                            </p>
                            <button
                                onClick={onFindMatch}
                                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-lg font-bold text-xl tracking-widest shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:shadow-[0_0_40px_rgba(37,99,235,0.8)] transition-all"
                            >
                                [INITIATE_SCAN]
                            </button>
                        </div>
                    )}

                    {status === 'SEARCHING' && (
                        <div className="text-center">
                            <div className="w-64 h-64 border-4 border-blue-500/30 rounded-full flex items-center justify-center relative animate-spin-slow">
                                <div className="absolute inset-0 border-t-4 border-blue-400 rounded-full animate-spin" />
                                <span className="text-blue-400 font-bold animate-pulse">SCANNING...</span>
                            </div>
                            <p className="text-blue-300 mt-8">SEARCHING FOR COMPATIBLE DNA MATCH...</p>
                        </div>
                    )}

                    {status === 'MATCHED' && partner && (
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            {/* Partner Profile */}
                            <div className="bg-blue-900/30 p-8 rounded-xl border border-blue-500/30">
                                <h3 className="text-blue-400 font-bold mb-4">MATCH FOUND</h3>
                                <div className="flex items-center gap-4 mb-6">
                                    <div
                                        className="w-20 h-20 rounded-full border-2 border-white"
                                        style={{ backgroundColor: partner.avatar.color }}
                                    />
                                    <div>
                                        <div className="text-2xl text-white font-black">{partner.name}</div>
                                        <div className="text-blue-300">LVL {partner.level} • {partner.archetype}</div>
                                    </div>
                                </div>
                                <p className="text-white/80 italic">"{partner.bio}"</p>
                            </div>

                            {/* Oath */}
                            <div className="text-center">
                                <h3 className="text-2xl text-white font-bold mb-4">THE ACADEMY OATH</h3>
                                <div className="bg-black/50 p-6 rounded-lg border border-blue-500/30 mb-6 text-left font-serif text-blue-100">
                                    "I, {role === 'MENTOR' ? 'Mentor' : 'Cadet'}, hereby pledge to commit to 14 days of rigorous training. I will support my partner, complete my daily objectives, and strive for excellence. Failure is not an option."
                                </div>
                                {!isSigning ? (
                                    <button
                                        onClick={() => { setIsSigning(true); setTimeout(onSignOath, 1500); }}
                                        className="bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 mx-auto"
                                    >
                                        <CheckCircle /> SIGN OATH
                                    </button>
                                ) : (
                                    <div className="text-green-400 font-bold animate-pulse">
                                        SIGNING BIOMETRIC DATA...
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                </div>
            </motion.div>
        </div>
    );
};

export default AcademyHall;
