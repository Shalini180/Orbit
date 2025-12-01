import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Trash2, Upload } from 'lucide-react';

const VillainCreator = ({ draft, onUpdate, onSave, onDelete, onPublish, onClose }) => {
    const [formData, setFormData] = useState(draft.data);
    const [name, setName] = useState(draft.name);

    useEffect(() => {
        setFormData(draft.data);
        setName(draft.name);
    }, [draft]);

    const handleChange = (field, value) => {
        const newData = { ...formData, [field]: value };
        setFormData(newData);
        onUpdate(draft.id, { name, data: newData });
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
        onUpdate(draft.id, { name: e.target.value, data: formData });
    };

    return (
        <div className="fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white w-full max-w-4xl h-[80vh] rounded-xl overflow-hidden flex shadow-2xl comic-border"
            >
                {/* Left Panel: Form */}
                <div className="w-1/2 p-8 bg-slate-50 overflow-y-auto border-r-4 border-black">
                    <h2 className="text-3xl font-black italic mb-6">THE INKER: VILLAIN CREATOR</h2>

                    <div className="space-y-6">
                        <div>
                            <label className="block font-bold mb-2">VILLAIN NAME</label>
                            <input
                                type="text"
                                value={name}
                                onChange={handleNameChange}
                                className="w-full p-3 border-2 border-black font-comic text-xl uppercase"
                                placeholder="E.G. DOCTOR DOOMSCROLL"
                            />
                        </div>

                        <div>
                            <label className="block font-bold mb-2">BIO / ORIGIN STORY</label>
                            <textarea
                                value={formData.bio}
                                onChange={(e) => handleChange('bio', e.target.value)}
                                className="w-full p-3 border-2 border-black font-sans h-32"
                                placeholder="How did they become evil?"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block font-bold mb-2">HIT POINTS (HP)</label>
                                <input
                                    type="number"
                                    value={formData.hp}
                                    onChange={(e) => handleChange('hp', parseInt(e.target.value))}
                                    className="w-full p-3 border-2 border-black font-mono"
                                />
                            </div>
                            <div>
                                <label className="block font-bold mb-2">WEAKNESS TAG</label>
                                <input
                                    type="text"
                                    value={formData.weakness}
                                    onChange={(e) => handleChange('weakness', e.target.value)}
                                    className="w-full p-3 border-2 border-black font-mono text-red-600"
                                    placeholder="#FOCUS"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block font-bold mb-2">AVATAR STYLE</label>
                            <div className="flex gap-4 mb-4">
                                {['SLIME', 'FIRE', 'SHADOW', 'MECH'].map(shape => (
                                    <button
                                        key={shape}
                                        onClick={() => handleChange('avatar', { ...formData.avatar, shape })}
                                        className={`p-2 border-2 border-black font-bold text-xs ${formData.avatar.shape === shape ? 'bg-black text-white' : 'bg-white'}`}
                                    >
                                        {shape}
                                    </button>
                                ))}
                            </div>
                            <label className="block font-bold mb-2">COLOR HEX</label>
                            <input
                                type="color"
                                value={formData.avatar.color}
                                onChange={(e) => handleChange('avatar', { ...formData.avatar, color: e.target.value })}
                                className="w-full h-12 border-2 border-black cursor-pointer"
                            />
                        </div>
                    </div>

                    <div className="mt-8 flex gap-4">
                        <button onClick={() => onSave(draft.id)} className="flex-1 bg-blue-600 text-white font-bold py-3 comic-border hover:bg-blue-500 flex items-center justify-center gap-2">
                            <Save size={20} /> SAVE DRAFT
                        </button>
                        <button onClick={() => onPublish(draft.id)} className="flex-1 bg-green-600 text-white font-bold py-3 comic-border hover:bg-green-500 flex items-center justify-center gap-2">
                            <Upload size={20} /> PUBLISH
                        </button>
                    </div>
                    <button onClick={() => onDelete(draft.id)} className="mt-4 w-full bg-red-100 text-red-600 font-bold py-2 hover:bg-red-200 flex items-center justify-center gap-2">
                        <Trash2 size={16} /> DELETE DRAFT
                    </button>
                    <button onClick={onClose} className="mt-2 w-full text-slate-500 font-bold py-2 hover:text-black">
                        CANCEL
                    </button>
                </div>

                {/* Right Panel: Preview */}
                <div className="w-1/2 bg-dots p-8 flex items-center justify-center relative">
                    <div className="absolute top-4 right-4 bg-yellow-300 px-4 py-2 font-black border-2 border-black rotate-2 shadow-lg">
                        PREVIEW ISSUE #1
                    </div>

                    <div className="w-80 bg-white comic-border p-4 shadow-2xl transform -rotate-1">
                        <div className="h-64 bg-slate-200 border-2 border-black mb-4 flex items-center justify-center relative overflow-hidden">
                            {/* Mock Avatar Render */}
                            <div
                                className="w-40 h-40 transition-all duration-300"
                                style={{
                                    backgroundColor: formData.avatar.color,
                                    borderRadius: formData.avatar.shape === 'SLIME' ? '50% 50% 40% 60% / 60% 50% 70% 40%' :
                                        formData.avatar.shape === 'MECH' ? '10%' : '50%'
                                }}
                            />
                            <div className="absolute bottom-2 right-2 bg-red-600 text-white px-2 font-bold text-xs">
                                HP: {formData.hp}
                            </div>
                        </div>
                        <h3 className="text-2xl font-black uppercase text-center mb-2">{name || "UNKNOWN VILLAIN"}</h3>
                        <p className="text-sm font-mono text-center text-slate-600 mb-4">{formData.bio || "No origin story yet..."}</p>

                        <div className="bg-red-100 p-2 border border-red-500 text-center">
                            <span className="font-bold text-red-800 text-xs">WEAKNESS:</span>
                            <div className="font-black text-red-600">{formData.weakness || "???"}</div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default VillainCreator;
