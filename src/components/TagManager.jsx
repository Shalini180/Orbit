import React, { useState } from 'react';
import { X, Plus, Tag } from 'lucide-react';

const TagManager = ({ tagMap, onAddMapping, onClose }) => {
    const [newTag, setNewTag] = useState('');
    const [selectedAttr, setSelectedAttr] = useState('MIGHT');

    const handleAdd = () => {
        if (newTag && !newTag.startsWith('#')) {
            onAddMapping(`#${newTag}`, selectedAttr);
            setNewTag('');
        } else if (newTag) {
            onAddMapping(newTag, selectedAttr);
            setNewTag('');
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-cyan-500 rounded-xl p-6 w-full max-w-md shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Tag className="text-cyan-400" /> MUTAGEN LAB
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            placeholder="#tagname"
                            className="flex-1 bg-slate-800 border border-slate-700 rounded p-2 text-white focus:border-cyan-500 outline-none"
                        />
                        <select
                            value={selectedAttr}
                            onChange={(e) => setSelectedAttr(e.target.value)}
                            className="bg-slate-800 border border-slate-700 rounded p-2 text-white outline-none"
                        >
                            <option value="MIGHT">MIGHT</option>
                            <option value="MIND">MIND</option>
                            <option value="SPEED">SPEED</option>
                            <option value="SPIRIT">SPIRIT</option>
                        </select>
                        <button
                            onClick={handleAdd}
                            className="bg-cyan-600 hover:bg-cyan-500 text-white p-2 rounded"
                        >
                            <Plus size={20} />
                        </button>
                    </div>

                    <div className="max-h-60 overflow-y-auto space-y-2">
                        {Object.entries(tagMap).map(([tag, attr]) => (
                            <div key={tag} className="flex justify-between items-center bg-slate-800 p-2 rounded border border-slate-700">
                                <span className="text-cyan-300 font-mono">{tag}</span>
                                <span className={`text-xs font-bold px-2 py-1 rounded ${attr === 'MIGHT' ? 'bg-red-900 text-red-200' :
                                        attr === 'MIND' ? 'bg-blue-900 text-blue-200' :
                                            attr === 'SPEED' ? 'bg-yellow-900 text-yellow-200' :
                                                'bg-pink-900 text-pink-200'
                                    }`}>
                                    {attr}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TagManager;
