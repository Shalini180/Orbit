import React from 'react';
import { motion } from 'framer-motion';
import { Download, Star, User, Search } from 'lucide-react';

const TheNewsstand = ({ feed, subscriptions, onSubscribe, onClose }) => {
    return (
        <div className="fixed inset-0 z-40 bg-slate-900/95 backdrop-blur-md overflow-y-auto">
            <div className="max-w-7xl mx-auto p-8">
                {/* Header */}
                <div className="flex justify-between items-end mb-12 border-b-4 border-white pb-6">
                    <div>
                        <h1 className="text-6xl font-black text-white italic tracking-tighter mb-2">THE NEWSSTAND</h1>
                        <p className="text-cyan-400 font-mono text-xl">COMMUNITY CREATIONS & INDIE ARCS</p>
                    </div>
                    <button onClick={onClose} className="text-white hover:text-cyan-400 font-bold text-2xl">
                        CLOSE X
                    </button>
                </div>

                {/* Filters (Mock) */}
                <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
                    {['TRENDING', 'NEW ARRIVALS', 'TOP RATED', 'VILLAINS', 'STORY ARCS'].map(filter => (
                        <button key={filter} className="bg-slate-800 text-white px-6 py-2 rounded-full font-bold border border-slate-600 hover:bg-white hover:text-black transition-colors whitespace-nowrap">
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {feed.map((item) => {
                        const isSubscribed = subscriptions.some(s => s.id === item.id);

                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white comic-border relative group hover:-translate-y-2 transition-transform duration-300"
                            >
                                {/* Cover Art Mockup */}
                                <div className={`h-48 ${item.type === 'VILLAIN' ? 'bg-red-100' : 'bg-blue-100'} border-b-2 border-black flex items-center justify-center relative overflow-hidden`}>
                                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
                                    <div className="text-center z-10">
                                        <h3 className="text-4xl font-black opacity-20 uppercase tracking-widest">{item.type}</h3>
                                    </div>
                                    {/* Badge */}
                                    <div className="absolute top-2 right-2 bg-black text-white text-xs font-bold px-2 py-1">
                                        {item.type}
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-2xl font-black leading-none mb-2 uppercase">{item.name}</h3>
                                    <div className="flex items-center gap-2 text-slate-500 text-sm font-bold mb-4">
                                        <User size={14} /> {item.author}
                                    </div>

                                    <p className="text-sm text-slate-700 mb-6 line-clamp-2 h-10">
                                        {item.description}
                                    </p>

                                    <div className="flex items-center justify-between border-t-2 border-slate-100 pt-4">
                                        <div className="flex items-center gap-1 text-yellow-500 font-black">
                                            <Star size={16} fill="currentColor" /> {item.rating}
                                        </div>
                                        <div className="text-xs font-bold text-slate-400">
                                            {item.downloads} DLs
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => !isSubscribed && onSubscribe(item)}
                                        disabled={isSubscribed}
                                        className={`w-full mt-4 py-3 font-black flex items-center justify-center gap-2 transition-colors ${isSubscribed
                                                ? 'bg-slate-200 text-slate-500 cursor-default'
                                                : 'bg-black text-white hover:bg-cyan-500'
                                            }`}
                                    >
                                        {isSubscribed ? (
                                            <>IN COLLECTION</>
                                        ) : (
                                            <><Download size={18} /> GET IT</>
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default TheNewsstand;
