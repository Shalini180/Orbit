import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BootSequence = ({ onComplete, themeName = 'VOID' }) => {
    const [step, setStep] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Check if already booted in this session
        const hasBooted = sessionStorage.getItem('orbitr_booted');
        if (hasBooted) {
            setIsVisible(false);
            onComplete();
            return;
        }

        const sequence = [
            { t: 1000, action: () => setStep(1) }, // Authenticating
            { t: 2000, action: () => setStep(2) }, // Loading Theme
            { t: 3000, action: () => setStep(3) }, // Syncing History
            {
                t: 4500, action: () => {
                    setIsVisible(false);
                    sessionStorage.setItem('orbitr_booted', 'true');
                    onComplete();
                }
            }
        ];

        const timeouts = sequence.map(s => setTimeout(s.action, s.t));
        return () => timeouts.forEach(clearTimeout);
    }, [onComplete]);

    if (!isVisible) return null;

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center font-mono text-green-500"
        >
            <div className="w-full max-w-md space-y-4 p-8">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-slate-500 mb-8"
                >
                    ORBITR OS v9.0.0 // INITIALIZING...
                </motion.div>

                <div className="space-y-2">
                    <BootLine text="Authenticating Commander..." status="OK" show={step >= 0} done={step >= 1} />
                    <BootLine text={`Loading Theme: ${themeName}...`} status="OK" show={step >= 1} done={step >= 2} />
                    <BootLine text="Syncing Flight History..." status="OK" show={step >= 2} done={step >= 3} />
                    <BootLine text="Engaging Warp Drive..." status="READY" show={step >= 3} done={step >= 4} />
                </div>

                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: step / 3 }}
                    className="h-1 bg-green-500 mt-8 origin-left"
                />
            </div>
        </motion.div>
    );
};

const BootLine = ({ text, status, show, done }) => {
    if (!show) return null;
    return (
        <div className="flex justify-between items-center">
            <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
            >
                {text}
            </motion.span>
            {done && (
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-green-400 font-bold"
                >
                    [{status}]
                </motion.span>
            )}
        </div>
    );
};

export default BootSequence;
