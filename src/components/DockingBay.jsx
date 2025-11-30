import React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Github, Slack, X } from 'lucide-react';

const ServiceModule = ({ id, name, icon: Icon, isConnected, onToggle }) => (
    <div className={`
    relative p-4 border rounded-lg transition-all duration-300 overflow-hidden group
    ${isConnected
            ? 'border-green-500/50 bg-green-900/10 shadow-[0_0_15px_rgba(34,197,94,0.1)]'
            : 'border-slate-700 bg-slate-800/50 hover:border-slate-500'}
  `}>
        {/* Status LED */}
        <div className={`
      absolute top-3 right-3 w-2 h-2 rounded-full transition-colors duration-500
      ${isConnected ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-red-900'}
    `} />

        {/* Fan Animation (Visual Polish) */}
        {isConnected && (
            <div className="absolute -bottom-10 -right-10 w-24 h-24 border-2 border-green-500/10 rounded-full animate-spin-slow opacity-20" />
        )}

        <div className="flex items-center gap-3 mb-3">
            <Icon size={24} className={isConnected ? 'text-green-400' : 'text-slate-500'} />
            <span className={`font-mono font-bold ${isConnected ? 'text-green-100' : 'text-slate-400'}`}>
                {name}
            </span>
        </div>

        <button
            onClick={() => onToggle(id)}
            className={`
        w-full py-2 px-4 rounded font-mono text-xs uppercase tracking-widest transition-all
        ${isConnected
                    ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                    : 'bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20'}
      `}
        >
            {isConnected ? 'Terminate Uplink' : 'Initialize Uplink'}
        </button>
    </div>
);

const DockingBay = ({ isOpen, onClose, connections, onToggle }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-xl p-8 shadow-2xl relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                            <span className="text-cyan-500">THE DOCKING BAY</span>
                            <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded font-mono">
                                SUBSPACE RELAY ACTIVE
                            </span>
                        </h2>
                        <p className="text-slate-400 mb-8">Connect external modules to synchronize mission data.</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <ServiceModule
                                id="google-calendar"
                                name="Google Calendar"
                                icon={Calendar}
                                isConnected={connections['google-calendar']}
                                onToggle={onToggle}
                            />
                            <ServiceModule
                                id="github"
                                name="GitHub"
                                icon={Github}
                                isConnected={connections['github']}
                                onToggle={onToggle}
                            />
                            <ServiceModule
                                id="slack"
                                name="Slack"
                                icon={Slack}
                                isConnected={connections['slack']}
                                onToggle={onToggle}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

DockingBay.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    connections: PropTypes.object.isRequired,
    onToggle: PropTypes.func.isRequired
};

export default DockingBay;
