import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const RadarScope = ({ squadStatus, onPing }) => {
    return (
        <div className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-40">
            <div className="relative w-32 h-32 md:w-48 md:h-48 bg-slate-900/50 rounded-full border border-slate-700 backdrop-blur-sm overflow-hidden shadow-2xl">
                {/* Radar Grid */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 border-[0.5px] border-green-500 rounded-full scale-50" />
                    <div className="absolute inset-0 border-[0.5px] border-green-500 rounded-full scale-75" />
                    <div className="absolute top-1/2 left-0 right-0 h-[0.5px] bg-green-500" />
                    <div className="absolute left-1/2 top-0 bottom-0 w-[0.5px] bg-green-500" />
                </div>

                {/* Sweep Animation */}
                <div className="absolute inset-0 animate-[spin_4s_linear_infinite] origin-center">
                    <div className="w-1/2 h-1/2 bg-gradient-to-tl from-green-500/20 to-transparent rounded-tl-full absolute top-0 left-0" />
                </div>

                {/* Center (You) */}
                <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_white]" />

                {/* Squad Blips */}
                {squadStatus.map((member, index) => {
                    // Calculate random position for visual flair (in real app, could be meaningful)
                    // Using index to keep it stable
                    const angle = (index * (360 / 3)) * (Math.PI / 180);
                    const radius = 30 + (index * 10); // px from center
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;

                    let colorClass = 'bg-slate-500'; // Offline
                    if (member.status === 'ACTIVE') colorClass = 'bg-green-500 shadow-[0_0_10px_#22c55e]';
                    if (member.status === 'HYPERDRIVE') colorClass = 'bg-fuchsia-500 shadow-[0_0_10px_#d946ef] animate-pulse';

                    return (
                        <motion.button
                            key={member.uid}
                            onClick={() => onPing(member.uid)}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={`absolute w-3 h-3 rounded-full ${colorClass} cursor-pointer hover:scale-150 transition-transform`}
                            style={{
                                top: `calc(50% + ${y}px)`,
                                left: `calc(50% + ${x}px)`,
                                transform: 'translate(-50%, -50%)'
                            }}
                            title={`Pilot ${member.uid.slice(0, 4)}`}
                        />
                    );
                })}
            </div>
            <div className="text-center mt-2 text-[10px] text-green-500/50 font-mono tracking-widest uppercase">
                RADAR ACTIVE
            </div>
        </div>
    );
};

RadarScope.propTypes = {
    squadStatus: PropTypes.array.isRequired,
    onPing: PropTypes.func.isRequired
};

export default RadarScope;
