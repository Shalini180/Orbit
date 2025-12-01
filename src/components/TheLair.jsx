import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, ShoppingCart, Box, ArrowLeft, Trash2 } from 'lucide-react';
import TrophyShelf from './TrophyShelf';
import GadgetLab from './GadgetLab';
import TheSidekick from './TheSidekick';

const GRID_SIZE = 50;

const TheLair = ({
    onClose,
    credits,
    addCredits, // For testing/cheating
    spendCredits,
    lairState,
    cleanliness,
    placeItem,
    moveItem,
    removeItem,
    unlockItem,
    medals
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [showShop, setShowShop] = useState(false);
    const [showInventory, setShowInventory] = useState(false);
    const containerRef = useRef(null);

    // Filter inventory to show only items NOT currently placed in the layout
    // But wait, we might want multiple of the same item? 
    // For now, let's assume unique items for simplicity or check counts.
    // Actually, the inventory is just a list of unlocked IDs.
    // We can place as many as we want? Or just one?
    // Let's assume one instance per unlock for now to keep it simple, 
    // OR we just show the list of unlocked items and dragging one out creates a new instance.
    // Let's go with: Dragging from inventory creates a new instance.

    const handleDragEnd = (event, info, item) => {
        if (!containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const x = info.point.x - containerRect.left;
        const y = info.point.y - containerRect.top;

        // Snap to grid
        const snappedX = Math.round(x / GRID_SIZE) * GRID_SIZE;
        const snappedY = Math.round(y / GRID_SIZE) * GRID_SIZE;

        // Check bounds (roughly)
        if (snappedX >= 0 && snappedX < containerRect.width && snappedY >= 0 && snappedY < containerRect.height) {
            moveItem(item.id, snappedX, snappedY);
        }
    };

    const handleInventoryDragEnd = (event, info, itemId) => {
        if (!containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        // We need to account for the scroll/position of the inventory drawer vs the container
        // This is tricky with Framer Motion drag from a different container.
        // Simpler approach: Click to place at center, then drag.
        // OR: Just add to center.

        placeItem(itemId, 100, 300); // Default position
        setShowInventory(false);
    };

    const getBackgroundStyle = () => {
        switch (cleanliness) {
            case 'DIRTY': return 'bg-slate-900 grayscale sepia-[.5]';
            case 'SPARKLING': return 'bg-slate-800 bg-[url("https://www.transparenttextures.com/patterns/stardust.png")]';
            default: return 'bg-slate-800';
        }
    };

    return (
        <div className="fixed inset-0 z-40 bg-black flex flex-col">
            {/* Header */}
            <div className="h-16 bg-slate-900 border-b border-slate-700 flex items-center justify-between px-4 z-50">
                <div className="flex items-center gap-4">
                    <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors">
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-2xl font-black text-white uppercase tracking-widest italic">Secret Lair</h1>
                </div>

                <div className="flex items-center gap-4">
                    <div className="bg-slate-800 px-4 py-1 rounded-full border border-slate-700 flex items-center gap-2">
                        <span className="text-yellow-400 font-mono font-bold">{credits}</span>
                        <span className="text-xs text-slate-500 font-bold">TOKENS</span>
                    </div>

                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className={`p-2 rounded-full transition-all ${isEditing ? 'bg-yellow-500 text-black' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                    >
                        <Settings size={20} />
                    </button>

                    <button
                        onClick={() => setShowShop(true)}
                        className="p-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full shadow-lg hover:shadow-cyan-500/25 transition-all"
                    >
                        <ShoppingCart size={20} />
                    </button>
                </div>
            </div>

            {/* Main Room Area */}
            <div
                ref={containerRef}
                className={`flex-1 relative overflow-hidden transition-colors duration-1000 ${getBackgroundStyle()}`}
            >
                {/* Grid Background (only in edit mode) */}
                {isEditing && (
                    <div
                        className="absolute inset-0 pointer-events-none opacity-20"
                        style={{
                            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                            backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`
                        }}
                    />
                )}

                {/* Dirty Overlays */}
                {cleanliness === 'DIRTY' && (
                    <>
                        <div className="absolute bottom-10 left-20 text-4xl opacity-80 rotate-12 pointer-events-none">🍕</div>
                        <div className="absolute top-20 right-40 text-6xl opacity-60 pointer-events-none">🕸️</div>
                    </>
                )}

                {/* Trophy Shelf (Fixed Position) */}
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-3/4 max-w-2xl z-0">
                    <TrophyShelf medals={medals} />
                </div>

                {/* Furniture Items */}
                {lairState.layout.map(item => (
                    <motion.div
                        key={item.id}
                        drag={isEditing}
                        dragMomentum={false}
                        onDragEnd={(e, info) => handleDragEnd(e, info, item)}
                        initial={{ x: item.x, y: item.y, scale: 0 }}
                        animate={{ x: item.x, y: item.y, scale: 1 }}
                        whileHover={isEditing ? { scale: 1.1, cursor: 'grab' } : {}}
                        whileDrag={{ scale: 1.2, cursor: 'grabbing', zIndex: 50 }}
                        className="absolute"
                    >
                        {/* Item Visuals */}
                        <div className="relative group">
                            {/* Visual Sound Effect on Place */}
                            {/* We'd need a way to trigger this only on drop, skipping for now to keep it simple */}

                            <div className="text-6xl filter drop-shadow-lg">
                                {/* Map itemId to emoji/icon */}
                                {item.itemId === 'poster_retro' && '🖼️'}
                                {item.itemId === 'rug_fuzzy' && '🧶'}
                                {item.itemId === 'plant_alien' && '🪴'}
                                {item.itemId === 'coffee_machine' && '☕'}
                                {item.itemId === 'super_computer' && '🖥️'}
                                {item.itemId === 'costume_stealth' && '🥋'}
                            </div>

                            {/* Delete Button (Edit Mode Only) */}
                            {isEditing && (
                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity scale-75 hover:scale-100"
                                >
                                    <Trash2 size={12} />
                                </button>
                            )}
                        </div>
                    </motion.div>
                ))}

                {/* Sidekick */}
                <div className="absolute bottom-20 left-1/2 pointer-events-none">
                    {/* We can pass props to control sidekick behavior/costume */}
                    <TheSidekick />
                </div>

            </div>

            {/* Inventory Drawer (Bottom) */}
            <AnimatePresence>
                {(isEditing || showInventory) && (
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        className="h-32 bg-slate-900 border-t border-slate-700 p-4 flex items-center gap-4 overflow-x-auto z-30"
                    >
                        <div className="text-xs font-bold text-slate-500 w-16 shrink-0 text-center">
                            STORAGE
                        </div>
                        {lairState.inventory.map((itemId, index) => (
                            <button
                                key={`${itemId}-${index}`}
                                onClick={() => handleInventoryDragEnd(null, null, itemId)}
                                className="w-20 h-20 bg-slate-800 rounded-lg border border-slate-700 hover:border-cyan-500 flex items-center justify-center text-3xl hover:scale-105 transition-all shrink-0"
                            >
                                {itemId === 'poster_retro' && '🖼️'}
                                {itemId === 'rug_fuzzy' && '🧶'}
                                {itemId === 'plant_alien' && '🪴'}
                                {itemId === 'coffee_machine' && '☕'}
                                {itemId === 'super_computer' && '🖥️'}
                                {itemId === 'costume_stealth' && '🥋'}
                            </button>
                        ))}
                        {lairState.inventory.length === 0 && (
                            <div className="text-slate-600 text-sm italic">Empty. Visit the Gadget Lab!</div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Shop Modal */}
            <AnimatePresence>
                {showShop && (
                    <GadgetLab
                        credits={credits}
                        inventory={lairState.inventory}
                        onBuy={(item) => {
                            spendCredits(item.cost);
                            unlockItem(item.id);
                        }}
                        onClose={() => setShowShop(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default TheLair;
