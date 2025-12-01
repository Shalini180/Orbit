import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { X, Download, Share2 } from 'lucide-react';
import DailyIssue from './DailyIssue';
import html2canvas from 'html2canvas';

const ShareOverlay = ({ issueData, onClose }) => {
    const comicRef = useRef(null);
    const [isExporting, setIsExporting] = useState(false);

    const handleDownload = async () => {
        if (!comicRef.current) return;

        setIsExporting(true);
        try {
            const canvas = await html2canvas(comicRef.current, {
                scale: 2, // Retina quality
                useCORS: true,
                backgroundColor: null
            });

            const image = canvas.toDataURL("image/png");
            const link = document.createElement('a');
            link.href = image;
            link.download = `Orbit_Issue_${issueData.date}.png`;
            link.click();
        } catch (err) {
            console.error("Export failed:", err);
            alert("Failed to generate image. Please try again.");
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
        >
            <div className="relative max-w-2xl w-full flex flex-col items-center">
                {/* Controls */}
                <div className="w-full flex justify-between items-center mb-4 text-white">
                    <h2 className="text-2xl font-bold italic">HOT OFF THE PRESS</h2>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
                        <X size={24} />
                    </button>
                </div>

                {/* Comic Preview */}
                <div className="bg-slate-800 p-8 rounded-xl shadow-2xl mb-6 border border-slate-700">
                    <DailyIssue ref={comicRef} issueData={issueData} />
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                    <button
                        onClick={handleDownload}
                        disabled={isExporting}
                        className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-8 rounded-full flex items-center gap-2 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isExporting ? (
                            <span className="animate-spin">⏳</span>
                        ) : (
                            <Download size={20} />
                        )}
                        {isExporting ? "PRINTING..." : "DOWNLOAD ISSUE"}
                    </button>

                    {/* Future Share Button */}
                    <button className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-full flex items-center gap-2 transition-all">
                        <Share2 size={20} /> SHARE
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ShareOverlay;
