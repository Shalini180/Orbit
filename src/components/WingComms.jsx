import React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

const WingComms = ({ feed }) => {
    return (
        <div className="fixed bottom-24 left-4 z-30 w-64 pointer-events-none hidden md:block">
            <div className="flex flex-col-reverse gap-2">
                <AnimatePresence>
                    {feed.slice(0, 3).map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            className="bg-slate-900/80 border-l-2 border-cyan-500 p-2 text-xs font-mono backdrop-blur-sm"
                        >
                            <span className="text-cyan-400 font-bold">{item.user}:</span>{' '}
                            <span className="text-slate-300">{item.action}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

WingComms.propTypes = {
    feed: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        user: PropTypes.string.isRequired,
        action: PropTypes.string.isRequired
    })).isRequired
};

export default WingComms;
