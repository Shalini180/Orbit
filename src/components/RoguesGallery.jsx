import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import ComicSoundFX from './ComicSoundFX';

const RoguesGallery = ({ villains, activeVillain, onSwitch, onDamage }) => {
    const [isResisting, setIsResisting] = useState(false);
    const [hitTrigger, setHitTrigger] = useState(0);
    const resistTimerRef = useRef(null);

    const handleResistStart = () => {
        setIsResisting(true);
        resistTimerRef.current = setTimeout(() => {
            onDamage('RESIST');
            setHitTrigger(prev => prev + 1);
            setIsResisting(false);
        }, 2000); // 2 seconds hold for testing (10s in prod)
    };

    const handleResistEnd = () => {
        setIsResisting(false);
        if (resistTimerRef.current) {
            clearTimeout(resistTimerRef.current);
        }
    };

    return (
        <div className="bg-purple-100 comic-panel relative overflow-visible">
            <div className="absolute top-0 left-0 bg-black text-white px-3 py-1 font-bold text-sm transform -rotate-1">
                WANTED: DEAD OR ALIVE
            </div>

            <div className="mt-8 flex flex-col items-center gap-6">
                {/* Active Villain Card */}
                <div className={`relative w-full max-w-xs bg-white border-4 border-[var(--color-villain-dark)] p-4 shadow-[8px_8px_0px_var(--color-villain-accent)] transform rotate-1 transition-all ${hitTrigger ? 'animate-shake animate-flash' : ''}`}>

                    {/* Health Bar */}
                    <div className="w-full h-6 bg-gray-300 border-2 border-black mb-4 relative">
                        <div
                            className="h-full bg-[var(--color-villain-primary)] transition-all duration-300"
                            style={{ width: `${(activeVillain.health / activeVillain.maxHealth) * 100}%` }}
                        />
                        <span className="absolute inset-0 flex items-center justify-center font-bold text-xs">
                            {activeVillain.health} / {activeVillain.maxHealth} HP
                        </span>
                    </div>

                    {/* Villain Image Placeholder */}
                    <div className="w-full aspect-square bg-gray-800 mb-4 border-2 border-black flex items-center justify-center overflow-hidden">
                        <span className="text-6xl">🦹</span>
                    </div>

                    <h3 className="font-comic text-2xl font-bold text-center uppercase mb-1">
                        {activeVillain.name}
                    </h3>
                    <p className="text-xs text-center font-bold text-gray-500 mb-4">
                        WEAKNESS: {activeVillain.weakness.toUpperCase()}
                    </p>

                    {/* Resist Button */}
                    <button
                        onMouseDown={handleResistStart}
                        onMouseUp={handleResistEnd}
                        onMouseLeave={handleResistEnd}
                        onTouchStart={handleResistStart}
                        onTouchEnd={handleResistEnd}
                        className={`w-full py-3 font-bold border-2 border-black transition-all ${isResisting
                                ? 'bg-red-500 text-white scale-95'
                                : 'bg-white hover:bg-red-100'
                            }`}
                    >
                        {isResisting ? 'HOLDING...' : 'HOLD TO RESIST'}
                    </button>

                    {/* FX Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <ComicSoundFX trigger={hitTrigger} />
                    </div>
                </div>

                {/* Villain Selector */}
                <div className="flex gap-2 overflow-x-auto w-full pb-2">
                    {villains.map(v => (
                        <button
                            key={v.id}
                            onClick={() => onSwitch(v.id)}
                            className={`flex-shrink-0 w-12 h-12 border-2 border-black rounded-full flex items-center justify-center font-bold text-lg transition-all ${activeVillain.id === v.id
                                    ? 'bg-[var(--color-villain-primary)] scale-110'
                                    : 'bg-white opacity-50'
                                }`}
                        >
                            {v.name[0]}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RoguesGallery;
