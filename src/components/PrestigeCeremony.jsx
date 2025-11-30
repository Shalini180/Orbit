import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const PrestigeCeremony = ({ onComplete }) => {
    useEffect(() => {
        // Play sound here in a real app
        const timer = setTimeout(onComplete, 4000); // 4s animation
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white flex items-center justify-center overflow-hidden"
        >
            {/* Big Bang Flash */}
            <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 50, opacity: 0 }}
                transition={{ duration: 2, ease: "circOut" }}
                className="w-32 h-32 bg-yellow-400 rounded-full"
            />

            {/* Text Reveal */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute z-10 text-center"
            >
                <h1 className="text-6xl font-black text-black tracking-tighter mb-4">PRESTIGE</h1>
                <p className="text-xl text-yellow-600 font-mono tracking-[0.5em] uppercase">
                    A New Beginning
                </p>
            </motion.div>
        </motion.div>
    );
};

PrestigeCeremony.propTypes = {
    onComplete: PropTypes.func.isRequired
};

export default PrestigeCeremony;
