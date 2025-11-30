import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, LogOut, Copy, Shield, Target } from 'lucide-react';

const AllianceHall = ({ isOpen, onClose, fleet, user }) => {
    const { wing, createWing, joinWing, leaveWing, loading, error } = fleet;
    const [inviteCodeInput, setInviteCodeInput] = useState('');
    const [wingNameInput, setWingNameInput] = useState('');

    const handleCopyCode = () => {
        if (wing?.inviteCode) {
            navigator.clipboard.writeText(wing.inviteCode);
            alert('Hailing Frequency Copied!');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-slate-950 border border-fuchsia-500/30 p-8 rounded-lg w-full max-w-2xl shadow-[0_0_50px_rgba(217,70,239,0.1)] relative overflow-hidden font-mono"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-8 border-b border-fuchsia-500/30 pb-4">
                            <h2 className="text-xl font-bold tracking-widest uppercase text-fuchsia-400">
                                ALLIANCE_HALL
                            </h2>
                            <div className="flex items-center gap-2 text-fuchsia-500/50">
                                <Users size={20} />
                                <span className="text-xs">FLEET COMMAND</span>
                            </div>
                        </div>

                        {error && (
                            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded">
                                ERROR: {error}
                            </div>
                        )}

                        {!wing ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Join Wing */}
                                <div className="space-y-4">
                                    <h3 className="text-white font-bold">JOIN SQUADRON</h3>
                                    <p className="text-slate-400 text-xs">Enter a 6-digit Hailing Frequency to join an existing wing.</p>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={inviteCodeInput}
                                            onChange={(e) => setInviteCodeInput(e.target.value)}
                                            placeholder="000000"
                                            maxLength={6}
                                            className="bg-slate-900 border border-slate-700 text-white p-2 rounded w-full font-mono tracking-widest text-center focus:border-fuchsia-500 outline-none"
                                        />
                                        <button
                                            onClick={() => joinWing(inviteCodeInput)}
                                            disabled={loading || inviteCodeInput.length !== 6}
                                            className="bg-fuchsia-500/20 hover:bg-fuchsia-500/30 text-fuchsia-400 border border-fuchsia-500/50 px-4 rounded disabled:opacity-50"
                                        >
                                            JOIN
                                        </button>
                                    </div>
                                </div>

                                {/* Create Wing */}
                                <div className="space-y-4 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-8">
                                    <h3 className="text-white font-bold">FORM SQUADRON</h3>
                                    <p className="text-slate-400 text-xs">Initialize a new wing and become the Commander.</p>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={wingNameInput}
                                            onChange={(e) => setWingNameInput(e.target.value)}
                                            placeholder="Squadron Name"
                                            className="bg-slate-900 border border-slate-700 text-white p-2 rounded w-full focus:border-fuchsia-500 outline-none"
                                        />
                                        <button
                                            onClick={() => createWing(wingNameInput)}
                                            disabled={loading}
                                            className="bg-fuchsia-500/20 hover:bg-fuchsia-500/30 text-fuchsia-400 border border-fuchsia-500/50 px-4 rounded disabled:opacity-50"
                                        >
                                            CREATE
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* Wing Header */}
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-2xl text-white font-bold">{wing.name}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-slate-500 text-xs">HAILING FREQ:</span>
                                            <code className="bg-slate-900 px-2 py-1 rounded text-fuchsia-400 font-bold">{wing.inviteCode}</code>
                                            <button onClick={handleCopyCode} className="text-slate-500 hover:text-white">
                                                <Copy size={14} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs text-slate-500">MEMBERS</div>
                                        <div className="text-xl text-white font-bold">{wing.members.length} / 4</div>
                                    </div>
                                </div>

                                {/* Bounty Board */}
                                <div className="bg-slate-900/50 p-4 rounded border border-slate-800">
                                    <div className="flex items-center gap-2 mb-3 text-fuchsia-400">
                                        <Target size={16} />
                                        <span className="font-bold text-sm">ACTIVE BOUNTY</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-300 text-sm">Complete 10 Heavy Lifts (Wing Total)</span>
                                        <span className="text-fuchsia-400 font-mono font-bold">
                                            {wing.bounties?.heavyLifts || 0} / {wing.bounties?.target || 10}
                                        </span>
                                    </div>
                                    <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
                                        <div
                                            className="bg-fuchsia-500 h-full transition-all duration-500"
                                            style={{ width: `${Math.min(100, ((wing.bounties?.heavyLifts || 0) / (wing.bounties?.target || 10)) * 100)}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Roster (Placeholder for now, would need to fetch user details) */}
                                <div className="space-y-2">
                                    <div className="text-xs text-slate-500 uppercase">Roster</div>
                                    {wing.members.map((memberId, index) => (
                                        <div key={memberId} className="flex items-center justify-between bg-slate-900 p-3 rounded border border-slate-800">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-500">
                                                    <Users size={16} />
                                                </div>
                                                <div>
                                                    <div className="text-sm text-white">Pilot {memberId.slice(0, 4)}</div>
                                                    <div className="text-xs text-slate-500">{memberId === wing.commander ? 'COMMANDER' : 'WINGMAN'}</div>
                                                </div>
                                            </div>
                                            {memberId === user.uid && (
                                                <div className="text-xs text-green-500 flex items-center gap-1">
                                                    <Shield size={12} /> YOU
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={leaveWing}
                                    disabled={loading}
                                    className="w-full py-3 mt-4 border border-red-500/30 text-red-500 hover:bg-red-500/10 rounded flex items-center justify-center gap-2 transition-colors"
                                >
                                    <LogOut size={16} />
                                    DISENGAGE FROM SQUADRON
                                </button>
                            </div>
                        )}

                        <button
                            onClick={onClose}
                            className="mt-8 w-full py-2 text-center text-slate-500 hover:text-slate-300 text-sm"
                        >
                            [CLOSE_TERMINAL]
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

AllianceHall.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    fleet: PropTypes.object.isRequired,
    user: PropTypes.object
};

export default AllianceHall;
