import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio } from 'lucide-react';

const IncomingTransmission = ({ data, onClear }) => {
    useEffect(() => {
        if (data) {
            const timer = setTimeout(onClear, 5000);
            return () => clearTimeout(timer);
        }
    }, [data, onClear]);

    return (
        <AnimatePresence>
            {data && (
                <motion.div
                    initial={{ opacity: 0, y: -50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -50, scale: 0.9 }}
                    className="fixed top-24 right-8 z-50 w-80 bg-slate-900/95 border border-purple-500/50 rounded-lg p-4 shadow-[0_0_20px_rgba(168,85,247,0.2)] cursor-pointer"
                    onClick={onClear}
                >
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-purple-500/20 rounded-full animate-pulse">
                            <Radio size={20} className="text-purple-400" />
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-purple-400 tracking-widest mb-1">INCOMING TRANSMISSION</h4>
                            <p className="text-sm text-white font-medium">{data.title}</p>
                            {data.xp && (
                                <span className="text-xs text-green-400 font-mono mt-1 block">
                                    REWARD: +{data.xp} XP
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Scanline effect */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] pointer-events-none bg-[length:100%_2px,2px_100%] rounded-lg" />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

IncomingTransmission.propTypes = {
    data: PropTypes.object,
    onClear: PropTypes.func.isRequired
};

export default IncomingTransmission;
