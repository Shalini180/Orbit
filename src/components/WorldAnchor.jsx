import React from 'react';
import { Settings, Music, Anchor } from 'lucide-react';

const WorldAnchor = ({ activeDimension }) => {
    return (
        <div className="fixed top-20 right-4 z-30 opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div className="bg-black/80 backdrop-blur text-white p-4 rounded-lg border border-white/20 shadow-xl w-64">
                <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
                    <Anchor size={16} className="text-cyan-400" />
                    <h3 className="font-bold text-sm uppercase tracking-wider">World Anchor</h3>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="text-xs text-slate-400 font-bold block mb-1">CURRENT REALITY</label>
                        <div className="font-mono text-cyan-300 text-sm">{activeDimension.name}</div>
                        <div className="text-[10px] text-slate-500">{activeDimension.id}</div>
                    </div>

                    <div>
                        <label className="text-xs text-slate-400 font-bold block mb-1">PHYSICS ENGINE</label>
                        <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${activeDimension.type === 'WORK' ? 'bg-red-500' : 'bg-green-500'}`}></div>
                            <span className="text-xs font-bold">
                                {activeDimension.type === 'WORK' ? 'HIGH GRAVITY (Focus)' : 'LOW GRAVITY (Relaxed)'}
                            </span>
                        </div>
                    </div>

                    <div>
                        <label className="text-xs text-slate-400 font-bold block mb-1">SOUNDTRACK LINK</label>
                        <div className="flex items-center gap-2 bg-white/5 p-2 rounded cursor-not-allowed opacity-50">
                            <Music size={14} />
                            <span className="text-xs italic">No Signal...</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorldAnchor;
