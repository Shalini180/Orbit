import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

const JettisonControl = ({ onJettison, isLocked }) => {
    if (!isLocked) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="fixed bottom-8 right-8 z-20"
        >
            <button
                onClick={() => {
                    if (window.confirm('WARNING: EJECTING CORE. ALL SYSTEMS WILL RESET. CONFIRM?')) {
                        onJettison();
                    }
                }}
                className="
          group flex items-center gap-2 px-4 py-2 
          bg-red-500/10 hover:bg-red-500/20 
          border border-red-500/30 hover:border-red-500 
          rounded-full transition-all duration-300
          text-red-500 hover:text-red-400
        "
            >
                <AlertTriangle size={16} />
                <span className="text-xs font-mono tracking-widest uppercase">Jettison</span>
            </button>
        </motion.div>
    );
};

JettisonControl.propTypes = {
    onJettison: PropTypes.func.isRequired,
    isLocked: PropTypes.bool.isRequired
};

export default JettisonControl;
