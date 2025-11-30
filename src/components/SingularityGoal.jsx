import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle } from 'lucide-react';

const SingularityGoal = ({ goal, setGoal, toggleGoal, isLocked }) => {
    if (!isLocked) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl mb-16 z-10 relative"
        >
            <label className="block text-fuchsia-500 text-sm tracking-[0.2em] uppercase mb-4 text-center font-mono">
                The Heavy Lift
            </label>

            <div
                className={`
          relative p-8 rounded-2xl border-2 transition-all duration-500
          ${goal.completed
                        ? 'bg-fuchsia-900/20 border-fuchsia-500 shadow-[0_0_50px_rgba(217,70,239,0.3)]'
                        : 'bg-slate-900/50 border-slate-700 hover:border-fuchsia-500/50'
                    }
          backdrop-blur-md
        `}
            >
                {!goal.completed && (
                    <div className="absolute inset-0 rounded-2xl animate-pulse-slow border border-fuchsia-500/20 pointer-events-none" />
                )}

                <div className="flex items-center gap-6">
                    <button
                        onClick={toggleGoal}
                        className={`
              flex-shrink-0 transition-all duration-300 transform hover:scale-110
              ${goal.completed ? 'text-fuchsia-500' : 'text-slate-600 hover:text-fuchsia-400'}
            `}
                    >
                        {goal.completed ? (
                            <CheckCircle2 size={48} weight="fill" />
                        ) : (
                            <Circle size={48} />
                        )}
                    </button>

                    <input
                        type="text"
                        value={goal.text}
                        onChange={(e) => setGoal(e.target.value)}
                        placeholder="ENTER MAIN OBJECTIVE"
                        disabled={goal.completed}
                        className={`
              w-full bg-transparent border-none outline-none text-2xl md:text-3xl font-bold tracking-wide
              ${goal.completed ? 'text-fuchsia-200 line-through decoration-fuchsia-500/50' : 'text-white'}
              placeholder-slate-700
            `}
                    />
                </div>
            </div>
        </motion.div>
    );
};

SingularityGoal.propTypes = {
    goal: PropTypes.shape({
        text: PropTypes.string,
        completed: PropTypes.bool
    }).isRequired,
    setGoal: PropTypes.func.isRequired,
    toggleGoal: PropTypes.func.isRequired,
    isLocked: PropTypes.bool.isRequired
};

export default SingularityGoal;
