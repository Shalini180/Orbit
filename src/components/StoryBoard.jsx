import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Trash2, Upload, Plus, X } from 'lucide-react';

const StoryBoard = ({ draft, onUpdate, onSave, onDelete, onPublish, onClose }) => {
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

    const addMilestone = () => {
        const newMilestone = {
            day: formData.milestones.length + 1,
            title: '',
            reward: 'Badge'
        };
        handleChange('milestones', [...formData.milestones, newMilestone]);
    };

    const updateMilestone = (index, field, value) => {
        const newMilestones = [...formData.milestones];
        newMilestones[index] = { ...newMilestones[index], [field]: value };
        handleChange('milestones', newMilestones);
    };

    const removeMilestone = (index) => {
        const newMilestones = formData.milestones.filter((_, i) => i !== index);
        handleChange('milestones', newMilestones);
    };

    return (
        <div className="fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white w-full max-w-5xl h-[85vh] rounded-xl overflow-hidden flex shadow-2xl comic-border"
            >
                {/* Left Panel: Settings */}
                <div className="w-1/3 p-6 bg-slate-50 border-r-4 border-black flex flex-col">
                    <h2 className="text-3xl font-black italic mb-6">THE WRITER: STORYBOARD</h2>

                    <div className="space-y-6 flex-1 overflow-y-auto">
                        <div>
                            <label className="block font-bold mb-2">ARC TITLE</label>
                            <input
                                type="text"
                                value={name}
                                onChange={handleNameChange}
                                className="w-full p-3 border-2 border-black font-comic text-xl"
                                placeholder="E.G. 30 DAYS OF CODE"
                            />
                        </div>

                        <div>
                            <label className="block font-bold mb-2">DESCRIPTION</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => handleChange('description', e.target.value)}
                                className="w-full p-3 border-2 border-black font-sans h-24"
                                placeholder="What is this quest about?"
                            />
                        </div>

                        <div>
                            <label className="block font-bold mb-2">DURATION (DAYS)</label>
                            <input
                                type="number"
                                value={formData.duration}
                                onChange={(e) => handleChange('duration', parseInt(e.target.value))}
                                className="w-full p-3 border-2 border-black font-mono"
                            />
                        </div>
                    </div>

                    <div className="mt-auto pt-6 border-t-2 border-slate-200">
                        <div className="flex gap-2 mb-2">
                            <button onClick={() => onSave(draft.id)} className="flex-1 bg-blue-600 text-white font-bold py-2 comic-border hover:bg-blue-500 flex items-center justify-center gap-2">
                                <Save size={16} /> SAVE
                            </button>
                            <button onClick={() => onPublish(draft.id)} className="flex-1 bg-green-600 text-white font-bold py-2 comic-border hover:bg-green-500 flex items-center justify-center gap-2">
                                <Upload size={16} /> PUBLISH
                            </button>
                        </div>
                        <button onClick={onClose} className="w-full text-slate-500 font-bold py-2 hover:text-black">
                            CLOSE EDITOR
                        </button>
                    </div>
                </div>

                {/* Right Panel: Timeline Editor */}
                <div className="w-2/3 bg-dots p-8 overflow-y-auto relative">
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                    <div className="max-w-2xl mx-auto">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-2xl font-black bg-white px-4 py-1 border-2 border-black shadow-md">QUEST TIMELINE</h3>
                            <button
                                onClick={addMilestone}
                                className="bg-black text-white px-4 py-2 font-bold hover:bg-slate-800 flex items-center gap-2 rounded-full shadow-lg hover:scale-105 transition-transform"
                            >
                                <Plus size={20} /> ADD MILESTONE
                            </button>
                        </div>

                        <div className="space-y-4 relative">
                            {/* Vertical Line */}
                            <div className="absolute left-8 top-4 bottom-4 w-1 bg-slate-300 -z-10"></div>

                            {formData.milestones.map((milestone, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    className="bg-white p-4 border-2 border-black shadow-md flex gap-4 items-start relative group"
                                >
                                    <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold shrink-0 z-10">
                                        {index + 1}
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <input
                                            type="text"
                                            value={milestone.title}
                                            onChange={(e) => updateMilestone(index, 'title', e.target.value)}
                                            className="w-full font-bold border-b-2 border-slate-200 focus:border-black outline-none bg-transparent"
                                            placeholder="Milestone Title (e.g. 'First Steps')"
                                        />
                                        <div className="flex gap-2">
                                            <span className="text-xs font-bold bg-slate-100 px-2 py-1 rounded text-slate-500">DAY {milestone.day}</span>
                                            <input
                                                type="text"
                                                value={milestone.reward}
                                                onChange={(e) => updateMilestone(index, 'reward', e.target.value)}
                                                className="text-xs border-b border-slate-200 focus:border-black outline-none bg-transparent flex-1"
                                                placeholder="Reward (e.g. 'Python Badge')"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeMilestone(index)}
                                        className="opacity-0 group-hover:opacity-100 text-red-500 hover:bg-red-50 p-1 rounded transition-opacity"
                                    >
                                        <X size={20} />
                                    </button>
                                </motion.div>
                            ))}

                            {formData.milestones.length === 0 && (
                                <div className="text-center py-12 text-slate-400 italic font-mono bg-white/50 border-2 border-dashed border-slate-300 rounded-lg">
                                    NO MILESTONES YET. ADD ONE TO START THE JOURNEY.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default StoryBoard;
