import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

const TrophyShelf = ({ medals }) => {
    // medals is expected to be an array of earned medal objects or IDs
    // For now, let's assume it's a list of objects with { id, name, icon, color }

    return (
        <div className="relative w-full h-48 bg-amber-900/40 border-b-8 border-amber-950 rounded-lg overflow-hidden shadow-inner">
            {/* Shelf Texture */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>

            <div className="absolute bottom-0 w-full h-4 bg-amber-950/50 shadow-lg"></div>

            <div className="flex items-end justify-center h-full pb-6 gap-4 px-4 overflow-x-auto">
                {medals && medals.length > 0 ? (
                    medals.map((medal, index) => (
                        <motion.div
                            key={medal.id || index}
                            initial={{ opacity: 0, y: 20, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: index * 0.1, type: 'spring' }}
                            className="flex flex-col items-center group cursor-pointer"
                            whileHover={{ scale: 1.1, y: -5 }}
                        >
                            <div className={`p-3 rounded-full bg-gradient-to-br ${medal.color || 'from-yellow-400 to-yellow-600'} shadow-lg border-2 border-white/20 relative`}>
                                <Award size={24} className="text-white drop-shadow-md" />
                                {/* Shine effect */}
                                <div className="absolute top-0 right-0 w-full h-full bg-white/10 rounded-full skew-x-12"></div>
                            </div>
                            <span className="mt-2 text-xs font-bold text-amber-100 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-2 py-1 rounded absolute -bottom-8 whitespace-nowrap z-10">
                                {medal.name || 'Unknown Honor'}
                            </span>
                        </motion.div>
                    ))
                ) : (
                    <div className="text-amber-500/30 font-mono text-sm italic self-center pb-10">
                        [TROPHY CASE EMPTY]
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrophyShelf;
