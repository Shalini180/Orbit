import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Zap, Shirt, Armchair, X } from 'lucide-react';

const SHOP_ITEMS = [
    { id: 'poster_retro', name: 'Retro Poster', type: 'DECOR', cost: 50, icon: '🖼️', description: 'A vintage comic poster.' },
    { id: 'rug_fuzzy', name: 'Fuzzy Rug', type: 'DECOR', cost: 100, icon: '🧶', description: 'Really ties the room together.' },
    { id: 'plant_alien', name: 'Alien Plant', type: 'DECOR', cost: 150, icon: '🪴', description: 'Might eat you in your sleep.' },
    { id: 'coffee_machine', name: 'Espresso MK-1', type: 'GADGET', cost: 500, icon: '☕', description: '+5% XP on Morning Tasks.' },
    { id: 'super_computer', name: 'Cortex V2', type: 'GADGET', cost: 1000, icon: '🖥️', description: 'Unlocks advanced analytics.' },
    { id: 'costume_stealth', name: 'Stealth Suit', type: 'COSTUME', cost: 300, icon: '🥷', description: 'For your Sidekick.' },
];

const GadgetLab = ({ credits, onBuy, onClose, inventory = [] }) => {
    const [activeTab, setActiveTab] = useState('DECOR');
    const [purchasing, setPurchasing] = useState(null);

    const filteredItems = SHOP_ITEMS.filter(item => item.type === activeTab);

    const handleBuy = (item) => {
        if (credits >= item.cost && !inventory.includes(item.id)) {
            setPurchasing(item.id);
            // Simulate mechanical arm animation delay
            setTimeout(() => {
                onBuy(item);
                setPurchasing(null);
            }, 800);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
            <div className="w-full max-w-4xl bg-slate-900 border-4 border-cyan-500 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.3)] flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="bg-cyan-950/50 p-4 border-b-2 border-cyan-500/30 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-cyan-500 rounded-lg text-black">
                            <Zap size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-cyan-400 tracking-wider uppercase italic">Gadget Lab</h2>
                            <p className="text-cyan-600 font-mono text-xs">R&D DEPARTMENT // AUTH: OMEGA</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="text-right">
                            <div className="text-xs text-cyan-600 font-bold">AVAILABLE FUNDS</div>
                            <div className="text-2xl font-mono text-yellow-400 font-bold">{credits} <span className="text-sm">TOKENS</span></div>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-red-500/20 rounded-full text-cyan-400 hover:text-red-400 transition-colors">
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b-2 border-cyan-500/30 bg-slate-950/50">
                    {[
                        { id: 'DECOR', icon: Armchair, label: 'Decor' },
                        { id: 'GADGET', icon: Zap, label: 'Gadgets' },
                        { id: 'COSTUME', icon: Shirt, label: 'Costumes' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 py-4 flex items-center justify-center gap-2 font-bold tracking-widest transition-colors ${activeTab === tab.id
                                    ? 'bg-cyan-500/10 text-cyan-400 border-b-4 border-cyan-500'
                                    : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                                }`}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
                    {filteredItems.map(item => {
                        const isOwned = inventory.includes(item.id);
                        const canAfford = credits >= item.cost;

                        return (
                            <div key={item.id} className={`relative group bg-slate-800 border-2 ${isOwned ? 'border-green-500/50' : 'border-slate-600'} rounded-lg p-4 hover:border-cyan-400 transition-all hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]`}>
                                <div className="flex justify-between items-start mb-2">
                                    <div className="text-4xl">{item.icon}</div>
                                    {isOwned ? (
                                        <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded border border-green-500/30">OWNED</span>
                                    ) : (
                                        <span className={`font-mono font-bold ${canAfford ? 'text-yellow-400' : 'text-red-400'}`}>
                                            {item.cost} T
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
                                <p className="text-slate-400 text-sm mb-4 leading-snug">{item.description}</p>

                                <button
                                    disabled={isOwned || !canAfford || purchasing}
                                    onClick={() => handleBuy(item)}
                                    className={`w-full py-2 rounded font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${isOwned
                                            ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                            : canAfford
                                                ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg hover:shadow-cyan-500/25 active:scale-95'
                                                : 'bg-slate-700 text-slate-500 cursor-not-allowed opacity-50'
                                        }`}
                                >
                                    {purchasing === item.id ? (
                                        <motion.span
                                            animate={{ rotate: 360 }}
                                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                        >
                                            ⚙️
                                        </motion.span>
                                    ) : isOwned ? (
                                        'In Inventory'
                                    ) : (
                                        <>
                                            <ShoppingCart size={16} /> Buy
                                        </>
                                    )}
                                </button>

                                {/* Mechanical Arm Animation Overlay */}
                                <AnimatePresence>
                                    {purchasing === item.id && (
                                        <motion.div
                                            initial={{ y: -100 }}
                                            animate={{ y: 0 }}
                                            exit={{ y: -100 }}
                                            className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
                                        >
                                            <div className="text-6xl drop-shadow-2xl filter grayscale">🦾</div>
                                            <motion.div
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1.5, opacity: 1 }}
                                                transition={{ delay: 0.3 }}
                                                className="absolute text-yellow-400 font-black italic text-2xl"
                                                style={{ textShadow: '2px 2px 0 #000' }}
                                            >
                                                KA-CHUNK!
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
};

export default GadgetLab;
