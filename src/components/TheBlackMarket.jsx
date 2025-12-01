import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Clock } from 'lucide-react';

const MOCK_ITEMS = [
    { id: 'bm1', name: 'Noir Filter', price: 5000, type: 'FILTER', description: 'Classic detective vibes.' },
    { id: 'bm2', name: 'Neon City BG', price: 12000, type: 'BG', description: 'Cyberpunk aesthetic.' },
    { id: 'bm3', name: 'Golden Monocle', price: 25000, type: 'COSMETIC', description: 'Classy.' },
];

const TheBlackMarket = ({ walletBalance, onBuy, onClose }) => {
    return (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 font-mono">
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-neutral-900 w-full max-w-4xl border border-neutral-700 p-8 relative"
            >
                <div className="flex justify-between items-end mb-8 border-b border-neutral-800 pb-4">
                    <div>
                        <h2 className="text-4xl font-black text-neutral-200 tracking-tighter uppercase">
                            The Black Market
                        </h2>
                        <p className="text-neutral-500 text-sm flex items-center gap-2">
                            <Clock size={14} /> STOCK REFRESHES IN: 04:23:12
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="text-neutral-500 text-xs">YOUR FUNDS</div>
                        <div className="text-2xl font-bold text-green-500">{walletBalance}</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {MOCK_ITEMS.map(item => (
                        <div key={item.id} className="bg-neutral-800 p-4 border border-neutral-700 hover:border-neutral-500 transition-colors group">
                            <div className="h-32 bg-black mb-4 flex items-center justify-center text-neutral-600 group-hover:text-neutral-400">
                                [PREVIEW_UNAVAILABLE]
                            </div>
                            <h3 className="text-white font-bold text-lg">{item.name}</h3>
                            <p className="text-neutral-500 text-xs mb-4">{item.description}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-yellow-500 font-bold">{item.price}</span>
                                <button
                                    onClick={() => onBuy(item)}
                                    disabled={walletBalance < item.price}
                                    className={`px-4 py-1 text-sm font-bold uppercase ${walletBalance >= item.price
                                            ? 'bg-white text-black hover:bg-neutral-200'
                                            : 'bg-neutral-700 text-neutral-500 cursor-not-allowed'
                                        }`}
                                >
                                    {walletBalance >= item.price ? 'Acquire' : 'Insufficient'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <button onClick={onClose} className="mt-8 text-neutral-500 hover:text-white font-bold w-full text-center">
                    LEAVE QUIETLY
                </button>
            </motion.div>
        </div>
    );
};

export default TheBlackMarket;
