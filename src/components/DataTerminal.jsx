import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Upload, Trash2, AlertTriangle } from 'lucide-react';
import { useBlackBox } from '../hooks/useBlackBox';

const DataTerminal = ({ isOpen, onClose }) => {
    const { exportData, importData, hardReset } = useBlackBox();
    const fileInputRef = useRef(null);

    const handleImport = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                await importData(file);
                alert('SYSTEM RESTORED. REBOOTING...');
                window.location.reload();
            } catch (err) {
                alert('DATA CORRUPTION DETECTED. ABORTING.');
            }
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
                        className="bg-slate-950 border border-green-500/30 p-8 rounded-lg w-full max-w-lg shadow-[0_0_50px_rgba(34,197,94,0.1)] relative overflow-hidden font-mono"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="text-green-500 mb-8 border-b border-green-500/30 pb-4">
                            <h2 className="text-xl font-bold tracking-widest uppercase">
                                &gt; BLACK_BOX_TERMINAL
                            </h2>
                            <div className="text-xs opacity-70 mt-1">
                                SECURE DATA MANAGEMENT PROTOCOL v3.0
                            </div>
                        </div>

                        <div className="space-y-4">
                            <button
                                onClick={exportData}
                                className="w-full flex items-center gap-4 p-4 border border-green-500/30 hover:bg-green-500/10 text-green-400 hover:text-green-300 transition-all group"
                            >
                                <Download size={20} />
                                <div className="text-left">
                                    <div className="font-bold">INITIATE_BACKUP</div>
                                    <div className="text-xs opacity-70">Export system state to local drive</div>
                                </div>
                            </button>

                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full flex items-center gap-4 p-4 border border-green-500/30 hover:bg-green-500/10 text-green-400 hover:text-green-300 transition-all group"
                            >
                                <Upload size={20} />
                                <div className="text-left">
                                    <div className="font-bold">RESTORE_SYSTEM</div>
                                    <div className="text-xs opacity-70">Overwrite current state from backup</div>
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImport}
                                    accept=".json"
                                    className="hidden"
                                />
                            </button>

                            <div className="border-t border-cyan-500/30 my-4 pt-4">
                                <div className="text-xs text-cyan-500 mb-2 opacity-70">DEBUG / DEMO PROTOCOLS</div>
                                <button
                                    onClick={() => {
                                        if (window.confirm('INITIATE AUTO-PILOT SIMULATION?')) {
                                            onStartDemo();
                                            onClose();
                                        }
                                    }}
                                    className="w-full flex items-center gap-4 p-4 border border-cyan-500/30 hover:bg-cyan-500/10 text-cyan-400 hover:text-cyan-300 transition-all group"
                                >
                                    <AlertTriangle size={20} />
                                    <div className="text-left">
                                        <div className="font-bold">RUN_SIMULATION</div>
                                        <div className="text-xs opacity-70">Execute full system diagnostics demo</div>
                                    </div>
                                </button>
                            </div>

                            <div className="border-t border-red-500/30 my-4 pt-4">
                                <button
                                    onClick={() => {
                                        if (window.confirm('WARNING: IRREVERSIBLE DATA LOSS. CONFIRM FACTORY RESET?')) {
                                            hardReset();
                                        }
                                    }}
                                    className="w-full flex items-center gap-4 p-4 border border-red-500/30 hover:bg-red-500/10 text-red-500 hover:text-red-400 transition-all group"
                                >
                                    <Trash2 size={20} />
                                    <div className="text-left">
                                        <div className="font-bold">FACTORY_RESET</div>
                                        <div className="text-xs opacity-70">Purge all data and reset system</div>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            className="mt-8 w-full py-2 text-center text-slate-500 hover:text-slate-300 text-sm"
                        >
                            [CLOSE_CONNECTION]
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

DataTerminal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onStartDemo: PropTypes.func
};

export default DataTerminal;
