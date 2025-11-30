import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X } from 'lucide-react';

const InstallBeacon = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showPrompt, setShowPrompt] = useState(false);

    useEffect(() => {
        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            // Only show on mobile
            if (window.innerWidth < 768) {
                setShowPrompt(true);
            }
        };

        window.addEventListener('beforeinstallprompt', handler);
        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            setShowPrompt(false);
        }
        setDeferredPrompt(null);
    };

    return (
        <AnimatePresence>
            {showPrompt && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-24 left-4 right-4 z-50 bg-slate-900/90 backdrop-blur-md border border-cyan-500/30 p-4 rounded-lg shadow-xl flex items-center justify-between"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-cyan-500/20 rounded-full text-cyan-400">
                            <Download size={24} />
                        </div>
                        <div>
                            <div className="font-bold text-white text-sm">INSTALL NAVIGATION COMPUTER?</div>
                            <div className="text-xs text-slate-400">Initialize offline capabilities.</div>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowPrompt(false)}
                            className="p-2 text-slate-500 hover:text-white"
                        >
                            <X size={20} />
                        </button>
                        <button
                            onClick={handleInstall}
                            className="px-4 py-2 bg-cyan-500 text-black font-bold text-xs rounded uppercase tracking-wider hover:bg-cyan-400 transition-colors"
                        >
                            Initialize
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default InstallBeacon;
