import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Send } from 'lucide-react';

const NavCore = ({ status, message, onInput }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputText, setInputText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputText.trim()) {
            onInput(inputText);
            setInputText('');
        }
    };

    return (
        <>
            {/* The Avatar (Floating Orb) */}
            <motion.div
                drag
                dragMomentum={false}
                className="fixed bottom-8 left-8 z-50 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="relative w-16 h-16 flex items-center justify-center">
                    {/* Core */}
                    <motion.div
                        animate={{
                            scale: status === 'THINKING' ? [1, 1.2, 1] : [1, 1.05, 1],
                            backgroundColor: status === 'SPEAKING' ? '#22c55e' : '#06b6d4'
                        }}
                        transition={{ duration: status === 'THINKING' ? 0.5 : 2, repeat: Infinity }}
                        className="w-10 h-10 rounded-full bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.5)] z-10"
                    />

                    {/* Rings */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border border-cyan-500/30 rounded-full border-t-transparent"
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-1 border border-cyan-500/20 rounded-full border-b-transparent"
                    />
                </div>
            </motion.div>

            {/* Command Interface */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-28 left-8 z-50 w-80 bg-slate-900/90 backdrop-blur-md border border-cyan-500/30 rounded-lg p-4 shadow-2xl font-mono"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center mb-4 border-b border-cyan-500/20 pb-2">
                            <span className="text-cyan-400 text-xs font-bold tracking-widest">NAV_COMPUTER // CORTEX</span>
                            <span className={`text-[10px] ${status === 'IDLE' ? 'text-slate-500' : 'text-cyan-500 animate-pulse'}`}>
                                {status}
                            </span>
                        </div>

                        {/* Output Log */}
                        <div className="h-32 overflow-y-auto mb-4 text-xs space-y-2 text-slate-300 scrollbar-hide">
                            <div className="opacity-50 italic">System initialized.</div>
                            {message && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-cyan-100"
                                >
                                    {">"} {message}
                                </motion.div>
                            )}
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSubmit} className="relative">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Enter command..."
                                className="w-full bg-slate-800/50 border border-slate-700 rounded p-2 pr-10 text-xs text-white focus:border-cyan-500 outline-none"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-cyan-500 hover:text-cyan-400"
                            >
                                <Send size={14} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

NavCore.propTypes = {
    status: PropTypes.string.isRequired,
    message: PropTypes.string,
    onInput: PropTypes.func.isRequired
};

export default NavCore;
