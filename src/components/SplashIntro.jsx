import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SplashIntro = ({ onComplete }) => {
    const [page, setPage] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setPage(p => {
                if (p >= 2) {
                    clearInterval(timer);
                    setTimeout(onComplete, 1000);
                    return p;
                }
                return p + 1;
            });
        }, 1500);
        return () => clearInterval(timer);
    }, [onComplete]);

    const panels = [
        { text: "MEANWHILE...", color: "bg-yellow-400" },
        { text: "AT THE SECRET BASE...", color: "bg-cyan-400" },
        { text: "THE HERO RETURNS!", color: "bg-fuchsia-400" }
    ];

    return (
        <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-8">
            <AnimatePresence mode='wait'>
                <motion.div
                    key={page}
                    initial={{ opacity: 0, rotate: -5, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 5, scale: 1.2 }}
                    className={`w-full max-w-2xl aspect-video ${panels[page].color} comic-border flex items-center justify-center p-12 shadow-[20px_20px_0px_rgba(255,255,255,0.2)]`}
                >
                    <h1 className="font-comic text-6xl md:text-8xl text-black text-center leading-tight drop-shadow-md">
                        {panels[page].text}
                    </h1>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default SplashIntro;
