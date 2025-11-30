import React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, WifiOff, AlertTriangle, User, Shield } from 'lucide-react';

const CommsPanel = ({ isOpen, onClose, holonet }) => {
    const { user, status, isAnonymous, establishUplink, linkIdentity } = holonet;

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
                        className="bg-slate-950 border border-cyan-500/30 p-8 rounded-lg w-full max-w-md shadow-[0_0_50px_rgba(34,211,238,0.1)] relative overflow-hidden font-mono"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-8 border-b border-cyan-500/30 pb-4">
                            <h2 className="text-xl font-bold tracking-widest uppercase text-cyan-400">
                                COMMS_PANEL
                            </h2>
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${status === 'SYNCED' ? 'bg-green-500 animate-pulse' :
                                        status === 'ERROR' ? 'bg-red-500 animate-pulse' : 'bg-amber-500'
                                    }`} />
                                <span className="text-xs text-slate-500">{status}</span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {!user ? (
                                <div className="text-center space-y-4">
                                    <div className="text-slate-400 text-sm">
                                        ESTABLISH UPLINK TO SYNC DATA ACROSS DEVICES.
                                    </div>
                                    <button
                                        onClick={establishUplink}
                                        className="w-full py-3 bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20 transition-all rounded flex items-center justify-center gap-2"
                                    >
                                        <Wifi size={20} />
                                        INITIALIZE ANONYMOUS UPLINK
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="bg-slate-900 p-4 rounded border border-slate-800 flex items-center gap-4">
                                        <div className="p-2 bg-slate-800 rounded-full">
                                            <User size={20} className="text-cyan-400" />
                                        </div>
                                        <div className="overflow-hidden">
                                            <div className="text-xs text-slate-500 uppercase">Operator ID</div>
                                            <div className="text-sm text-white truncate font-mono">{user.uid}</div>
                                        </div>
                                    </div>

                                    {isAnonymous && (
                                        <div className="bg-amber-500/10 p-4 rounded border border-amber-500/30">
                                            <div className="flex items-start gap-3">
                                                <AlertTriangle size={20} className="text-amber-500 shrink-0" />
                                                <div className="space-y-2">
                                                    <div className="text-amber-500 font-bold text-sm">TEMPORARY CONNECTION</div>
                                                    <div className="text-amber-400/80 text-xs">
                                                        Data is synced but tied to this device. Link a Google account to secure permanent access.
                                                    </div>
                                                    <button
                                                        onClick={linkIdentity}
                                                        className="text-xs bg-amber-500/20 hover:bg-amber-500/30 text-amber-500 px-3 py-1 rounded transition-colors"
                                                    >
                                                        LINK GOOGLE ACCOUNT
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {!isAnonymous && (
                                        <div className="flex items-center gap-2 text-green-400 text-sm bg-green-500/10 p-3 rounded border border-green-500/20">
                                            <Shield size={16} />
                                            SECURE CONNECTION ESTABLISHED
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <button
                            onClick={onClose}
                            className="mt-8 w-full py-2 text-center text-slate-500 hover:text-slate-300 text-sm"
                        >
                            [TERMINATE_SESSION]
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

CommsPanel.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    holonet: PropTypes.object.isRequired
};

export default CommsPanel;
