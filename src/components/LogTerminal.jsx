import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Clock, Send, X } from 'lucide-react';

const TypewriterText = ({ text, onComplete }) => {
    const [displayed, setDisplayed] = useState('');

    useEffect(() => {
        if (displayed.length < text.length) {
            const timeout = setTimeout(() => {
                setDisplayed(text.slice(0, displayed.length + 1));
            }, 30);
            return () => clearTimeout(timeout);
        } else if (onComplete) {
            onComplete();
        }
    }, [displayed, text, onComplete]);

    return <span>{displayed}</span>;
};

const LogTerminal = ({ isOpen, onClose, mode = 'LAUNCH', template, onSave, onConvertToTask }) => {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
    const [isTyping, setIsTyping] = useState(false);
    const inputRef = useRef(null);

    const [viewMode, setViewMode] = useState('WRITE'); // WRITE | ARCHIVE
    const [history, setHistory] = useState([]);

    useEffect(() => {
        if (isOpen && viewMode === 'ARCHIVE') {
            const saved = localStorage.getItem('orbitr_journal_v1');
            if (saved) {
                setHistory(JSON.parse(saved).sort((a, b) => new Date(b.date) - new Date(a.date)));
            }
        }
    }, [isOpen, viewMode]);

    // Reset when opening
    useEffect(() => {
        if (isOpen) {
            setStep(0);
            setAnswers({});
            setTimeLeft(300);
            setIsTyping(false);
            setViewMode('WRITE');
        }
    }, [isOpen]);

    // Timer
    useEffect(() => {
        if (!isOpen || timeLeft <= 0 || viewMode === 'ARCHIVE') return;
        const interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
        return () => clearInterval(interval);
    }, [isOpen, timeLeft, viewMode]);

    // Auto-focus input
    useEffect(() => {
        if (!isTyping && inputRef.current && viewMode === 'WRITE') {
            inputRef.current.focus();
        }
    }, [step, isTyping, viewMode]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const currentPrompt = template.prompts[step];
        const value = e.target.elements.input.value;

        if (!value.trim()) return;

        setAnswers(prev => ({ ...prev, [currentPrompt.id]: value }));
        e.target.reset();

        if (step < template.prompts.length - 1) {
            setStep(s => s + 1);
        } else {
            onSave({ ...answers, [currentPrompt.id]: value });
            onClose();
        }
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    if (!isOpen) return null;

    const currentPrompt = template.prompts[step];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-2xl bg-slate-950 border border-slate-700 rounded-lg shadow-2xl overflow-hidden font-mono"
            >
                {/* Header */}
                <div className="bg-slate-900 p-3 flex items-center justify-between border-b border-slate-800">
                    <div className="flex items-center gap-2 text-green-500">
                        <Terminal size={18} />
                        <span className="font-bold tracking-wider">{viewMode === 'ARCHIVE' ? 'FLIGHT RECORDER' : template.title}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        {viewMode === 'WRITE' && (
                            <div className={`flex items-center gap-2 ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-slate-400'}`}>
                                <Clock size={16} />
                                <span>{formatTime(timeLeft)}</span>
                            </div>
                        )}
                        <button
                            onClick={() => setViewMode(v => v === 'WRITE' ? 'ARCHIVE' : 'WRITE')}
                            className="text-xs text-cyan-500 hover:text-cyan-400"
                        >
                            {viewMode === 'WRITE' ? '[VIEW LOGS]' : '[NEW ENTRY]'}
                        </button>
                        <button onClick={onClose} className="text-slate-500 hover:text-white">
                            <X size={18} />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 min-h-[300px] flex flex-col max-h-[60vh] overflow-y-auto">
                    {viewMode === 'WRITE' ? (
                        <div className="flex-1 space-y-4">
                            {/* History */}
                            {template.prompts.slice(0, step).map((p, i) => (
                                <div key={i} className="text-slate-400 opacity-50">
                                    <span>{p.text} </span>
                                    <span className="text-green-400">{answers[p.id]}</span>
                                </div>
                            ))}

                            {/* Current Prompt */}
                            <div className="text-lg text-slate-200">
                                <TypewriterText
                                    text={currentPrompt.text}
                                    onComplete={() => setIsTyping(false)}
                                />
                            </div>

                            {/* Input */}
                            <form onSubmit={handleSubmit} className="flex gap-2">
                                <span className="text-green-500">{'>'}</span>
                                <input
                                    ref={inputRef}
                                    name="input"
                                    autoComplete="off"
                                    className="flex-1 bg-transparent border-none outline-none text-green-400 placeholder-slate-700"
                                    placeholder={currentPrompt.placeholder}
                                />
                                <button type="submit" className="text-slate-600 hover:text-green-500">
                                    <Send size={18} />
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {history.length === 0 && <div className="text-slate-500">NO FLIGHT LOGS FOUND.</div>}
                            {history.map(entry => (
                                <div key={entry.id} className="border-b border-slate-800 pb-4">
                                    <div className="flex justify-between text-xs text-slate-500 mb-2">
                                        <span>{new Date(entry.date).toLocaleString()}</span>
                                        <span className="text-cyan-500">[{entry.type}]</span>
                                    </div>
                                    <div className="space-y-1 text-sm text-slate-300">
                                        {Object.entries(entry.data).map(([key, val]) => (
                                            <div key={key}>
                                                <span className="opacity-50 mr-2">{key.toUpperCase()}:</span>
                                                <span className="text-green-400">{val}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Footer Actions */}
                    {viewMode === 'WRITE' && mode === 'LAUNCH' && step === 1 && (
                        <div className="mt-4 pt-4 border-t border-slate-800 flex justify-end">
                            <button
                                type="button"
                                onClick={() => {
                                    const val = inputRef.current.value;
                                    if (val) {
                                        onConvertToTask(val);
                                        inputRef.current.value = ''; // Clear but don't advance yet, or advance? 
                                        // For now, let's just trigger the action and let user submit normally
                                    }
                                }}
                                className="text-xs text-cyan-500 hover:text-cyan-400 flex items-center gap-1"
                            >
                                [CONVERT TO SIDE THRUSTER]
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default LogTerminal;
