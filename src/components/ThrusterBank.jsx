import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Check, Square } from 'lucide-react';

const ThrusterBank = ({ thrusters, setThruster, toggleThruster, isLocked }) => {
    if (!isLocked) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 z-10 relative"
        >
            {thrusters.map((thruster) => (
                <div
                    key={thruster.id}
                    className={`
            flex items-center gap-3 p-4 rounded-xl border transition-all duration-300
            ${thruster.completed
                            ? 'bg-cyan-900/20 border-cyan-500/50'
                            : 'bg-slate-900/40 border-slate-800 hover:border-cyan-500/30'
                        }
            backdrop-blur-sm
          `}
                >
                    <button
                        onClick={() => toggleThruster(thruster.id)}
                        className={`
              flex-shrink-0 transition-colors
              ${thruster.completed ? 'text-cyan-400' : 'text-slate-600 hover:text-cyan-300'}
            `}
                    >
                        {thruster.completed ? <Check size={20} /> : <Square size={20} />}
                    </button>

                    <input
                        type="text"
                        value={thruster.text}
                        onChange={(e) => setThruster(thruster.id, e.target.value)}
                        placeholder="Thruster Task"
                        disabled={thruster.completed}
                        className={`
              w-full bg-transparent border-none outline-none text-sm font-medium tracking-wide
              ${thruster.completed ? 'text-cyan-200/50 line-through' : 'text-slate-200'}
              placeholder-slate-700
            `}
                    />
                </div>
            ))}
        </motion.div>
    );
};

ThrusterBank.propTypes = {
    thrusters: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        text: PropTypes.string,
        completed: PropTypes.bool
    })).isRequired,
    setThruster: PropTypes.func.isRequired,
    toggleThruster: PropTypes.func.isRequired,
    isLocked: PropTypes.bool.isRequired
};

export default ThrusterBank;
