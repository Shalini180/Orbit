import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Landmark, ArrowRight, ArrowLeft, AlertTriangle } from 'lucide-react';

const TheBank = ({ walletBalance, bankBalance, onDeposit, onWithdraw, decayWarning, onClose }) => {
    const [amount, setAmount] = useState('');
    const [mode, setMode] = useState('DEPOSIT'); // DEPOSIT or WITHDRAW

    const handleTransaction = () => {
        const val = parseInt(amount);
        if (isNaN(val) || val <= 0) return;

        if (mode === 'DEPOSIT') {
            if (onDeposit(val)) setAmount('');
        } else {
            if (onWithdraw(val)) setAmount('');
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 font-mono">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-slate-800 w-full max-w-2xl border-8 border-slate-600 rounded-3xl p-8 relative shadow-2xl"
            >
                {/* Vault Door Visuals */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-slate-600 px-6 py-2 rounded-b-xl border-b-4 border-slate-900">
                    <h2 className="text-3xl font-black text-slate-300 flex items-center gap-2">
                        <Landmark /> ORBIT VAULT
                    </h2>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-8 mb-8">
                    <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 text-center">
                        <div className="text-slate-400 text-sm mb-1">WALLET (CASH)</div>
                        <div className="text-3xl font-bold text-green-400">{walletBalance}</div>
                        {decayWarning.warning && (
                            <div className="mt-2 text-xs text-red-400 flex items-center justify-center gap-1 animate-pulse">
                                <AlertTriangle size={12} /> RISK: -{decayWarning.amountAtRisk}/wk
                            </div>
                        )}
                    </div>
                    <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-yellow-500/5 pointer-events-none" />
                        <div className="text-slate-400 text-sm mb-1">VAULT (SAVINGS)</div>
                        <div className="text-3xl font-bold text-yellow-400">{bankBalance}</div>
                        <div className="mt-2 text-xs text-yellow-600 font-bold">
                            +1% INTEREST / WEEK
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="bg-slate-700 p-6 rounded-xl">
                    <div className="flex justify-center gap-4 mb-6">
                        <button
                            onClick={() => setMode('DEPOSIT')}
                            className={`px-6 py-2 rounded-lg font-bold transition-all ${mode === 'DEPOSIT' ? 'bg-green-600 text-white' : 'bg-slate-900 text-slate-400'}`}
                        >
                            DEPOSIT
                        </button>
                        <button
                            onClick={() => setMode('WITHDRAW')}
                            className={`px-6 py-2 rounded-lg font-bold transition-all ${mode === 'WITHDRAW' ? 'bg-red-600 text-white' : 'bg-slate-900 text-slate-400'}`}
                        >
                            WITHDRAW
                        </button>
                    </div>

                    <div className="flex gap-4">
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="AMOUNT"
                            className="flex-1 bg-slate-900 text-white p-4 rounded-lg font-bold text-xl border-2 border-slate-600 focus:border-white outline-none"
                        />
                        <button
                            onClick={handleTransaction}
                            className="bg-slate-200 hover:bg-white text-black px-8 rounded-lg font-black text-xl"
                        >
                            {mode === 'DEPOSIT' ? <ArrowRight /> : <ArrowLeft />}
                        </button>
                    </div>
                </div>

                <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white font-bold">
                    CLOSE
                </button>
            </motion.div>
        </div>
    );
};

export default TheBank;
