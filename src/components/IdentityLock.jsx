import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Lock, Unlock } from 'lucide-react';

const IdentityLock = ({ identity, setIdentity, lockIdentity, isLocked }) => {
    return (
        <div className="flex flex-col items-center space-y-4 mb-12 z-10 relative">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <label className="block text-cyan-400 text-sm tracking-[0.2em] uppercase mb-2 text-center font-mono">
                    Identity Protocol
                </label>

                <div className="relative group">
                    {isLocked ? (
                        <div className="text-3xl md:text-4xl font-bold text-white text-center tracking-wide py-2 border-b-2 border-cyan-400/50">
                            I AM A <span className="text-cyan-400">{identity}</span>
                        </div>
                    ) : (
                        <div className="flex items-center bg-slate-900/50 border border-cyan-900/50 rounded-lg p-2 backdrop-blur-sm focus-within:border-cyan-400 transition-colors">
                            <span className="text-slate-500 font-mono px-3">I AM A</span>
                            <input
                                type="text"
                                value={identity}
                                onChange={(e) => setIdentity(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && lockIdentity()}
                                placeholder="WRITER..."
                                className="bg-transparent border-none outline-none text-xl text-white w-full placeholder-slate-600 uppercase tracking-wider"
                                autoFocus
                            />
                            <button
                                onClick={lockIdentity}
                                disabled={!identity.trim()}
                                className="p-2 text-cyan-400 hover:text-white disabled:opacity-50 transition-colors"
                            >
                                <Lock size={20} />
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

IdentityLock.propTypes = {
    identity: PropTypes.string.isRequired,
    setIdentity: PropTypes.func.isRequired,
    lockIdentity: PropTypes.func.isRequired,
    isLocked: PropTypes.bool.isRequired
};

export default IdentityLock;
