import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ComicSoundFX = ({ trigger }) => {
    const [fx, setFx] = useState(null);

    useEffect(() => {
        if (trigger) {
            const sounds = ['POW!', 'BAM!', 'ZAP!', 'WHAM!', 'CRASH!'];
            const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
            const randomRotation = Math.random() * 40 - 20;
            const randomX = Math.random() * 100 - 50;
            const randomY = Math.random() * 100 - 50;

            setFx({
                id: Date.now(),
                text: randomSound,
                rotation: randomRotation,
                x: randomX,
                y: randomY
            });

            // Clear after animation
            setTimeout(() => setFx(null), 1000);
        }
    }, [trigger]);

    return (
        <AnimatePresence>
            {fx && (
                <motion.div
                    key={fx.id}
                    initial={{ scale: 0, opacity: 0, rotate: fx.rotation }}
                    animate={{ scale: [0, 1.5, 1], opacity: 1 }}
                    exit={{ scale: 2, opacity: 0 }}
                    className="absolute z-50 pointer-events-none"
                    style={{
                        top: `calc(50% + ${fx.y}px)`,
                        left: `calc(50% + ${fx.x}px)`
                    }}
                >
                    <div className="relative">
                        {/* Starburst Background */}
                        <div className="absolute inset-0 bg-yellow-400 w-32 h-32 transform -translate-x-1/2 -translate-y-1/2 rotate-45 border-4 border-black"
                            style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)' }}
                        />
                        <h1 className="relative font-comic text-6xl text-red-600 font-black italic tracking-tighter transform -translate-x-1/2 -translate-y-1/2"
                            style={{ textShadow: '4px 4px 0px black' }}
                        >
                            {fx.text}
                        </h1>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ComicSoundFX;
