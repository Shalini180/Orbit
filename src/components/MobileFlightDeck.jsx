import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Target, BarChart2, Settings, Wifi } from 'lucide-react';

const MobileFlightDeck = ({
    onOpenStats,
    onOpenArmory,
    onOpenComms,
    isLocked,
    status
}) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-6 bg-gradient-to-t from-slate-950 to-transparent md:hidden pointer-events-none">
            <div className="flex justify-between items-end max-w-sm mx-auto pointer-events-auto">

                {/* Left: Stats */}
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={onOpenStats}
                    className="p-3 rounded-full bg-slate-900/80 border border-slate-700 text-slate-400 backdrop-blur-md shadow-lg"
                >
                    <BarChart2 size={24} />
                </motion.button>

                {/* Center: Heavy Lift / Focus */}
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className={`
            p-4 rounded-full border-2 shadow-[0_0_20px_rgba(34,211,238,0.3)] backdrop-blur-md mb-2
            ${isLocked
                            ? 'bg-cyan-500 border-cyan-400 text-black'
                            : 'bg-slate-900/80 border-cyan-500/50 text-cyan-400'
                        }
          `}
                >
                    <Target size={32} />
                </motion.button>

                {/* Right: Armory & Comms */}
                <div className="flex flex-col gap-2">
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={onOpenComms}
                        className={`p-3 rounded-full border backdrop-blur-md shadow-lg ${status === 'SYNCED' ? 'bg-green-500/10 border-green-500/50 text-green-500' :
                                status === 'ERROR' ? 'bg-red-500/10 border-red-500/50 text-red-500' :
                                    'bg-slate-900/80 border-slate-700 text-slate-400'
                            }`}
                    >
                        <Wifi size={24} />
                    </motion.button>

                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={onOpenArmory}
                        className="p-3 rounded-full bg-slate-900/80 border border-slate-700 text-slate-400 backdrop-blur-md shadow-lg"
                    >
                        <Settings size={24} />
                    </motion.button>
                </div>

            </div>
        </div>
    );
};

MobileFlightDeck.propTypes = {
    onOpenStats: PropTypes.func.isRequired,
    onOpenArmory: PropTypes.func.isRequired,
    onOpenComms: PropTypes.func.isRequired,
    isLocked: PropTypes.bool.isRequired,
    status: PropTypes.string.isRequired
};

export default MobileFlightDeck;
