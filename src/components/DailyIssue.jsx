import React, { forwardRef } from 'react';

const DailyIssue = forwardRef(({ issueData }, ref) => {
    if (!issueData) return null;

    const { panels, date, title, hero } = issueData;

    // Helper to render panel content based on visual type
    const renderPanelVisual = (panel) => {
        switch (panel.visual) {
            case 'SIDEKICK_ALERT':
                return (
                    <g>
                        <rect x="10" y="10" width="180" height="180" fill="#e0f2fe" />
                        <circle cx="100" cy="100" r="60" fill="#0ea5e9" />
                        <text x="100" y="110" fontSize="80" textAnchor="middle" fill="white">🤖</text>
                    </g>
                );
            case 'HERO_VS_VILLAIN':
                return (
                    <g>
                        <rect x="10" y="10" width="180" height="180" fill="#fecaca" />
                        <text x="60" y="120" fontSize="60" textAnchor="middle">🦸</text>
                        <text x="140" y="120" fontSize="60" textAnchor="middle">🦹</text>
                        <path d="M 80 80 L 120 120 M 120 80 L 80 120" stroke="black" strokeWidth="5" />
                    </g>
                );
            case 'HERO_LIFTING':
                return (
                    <g>
                        <rect x="10" y="10" width="180" height="180" fill="#fef08a" />
                        <text x="100" y="120" fontSize="80" textAnchor="middle">🏋️</text>
                        <rect x="60" y="40" width="80" height="40" fill="#475569" />
                    </g>
                );
            case 'VICTORY_POSE':
                return (
                    <g>
                        <rect x="10" y="10" width="180" height="180" fill="#bbf7d0" />
                        <text x="100" y="120" fontSize="80" textAnchor="middle">🏆</text>
                        <path d="M 10 10 L 190 190 M 190 10 L 10 190" stroke="white" strokeWidth="2" strokeOpacity="0.5" />
                    </g>
                );
            case 'DEFEAT_RETREAT':
                return (
                    <g>
                        <rect x="10" y="10" width="180" height="180" fill="#cbd5e1" />
                        <text x="100" y="120" fontSize="80" textAnchor="middle">🏳️</text>
                    </g>
                );
            case 'DATA_SCREEN':
                return (
                    <g>
                        <rect x="10" y="10" width="180" height="180" fill="#1e293b" />
                        <text x="20" y="50" fontSize="14" fill="#22d3ee" fontFamily="monospace">XP EARNED: {panel.stats.xp}</text>
                        <text x="20" y="80" fontSize="14" fill="#22d3ee" fontFamily="monospace">TOKENS: {panel.stats.tokens}</text>
                        <text x="20" y="110" fontSize="14" fill="#22d3ee" fontFamily="monospace">STREAK: {panel.stats.streak}</text>
                        <rect x="20" y="130" width="160" height="2" fill="#22d3ee" />
                        <text x="100" y="160" fontSize="20" fill="#22d3ee" textAnchor="middle" fontFamily="monospace">MISSION COMPLETE</text>
                    </g>
                );
            default:
                return <text x="100" y="100">?</text>;
        }
    };

    return (
        <div ref={ref} className="bg-white p-4 w-[400px] shadow-2xl">
            {/* Header */}
            <div className="border-b-4 border-black mb-4 flex justify-between items-end pb-2">
                <div>
                    <h1 className="text-3xl font-black italic tracking-tighter uppercase">{hero}'s CHRONICLES</h1>
                    <p className="text-xs font-bold text-gray-500">{date} | {title}</p>
                </div>
                <div className="text-right">
                    <div className="bg-red-600 text-white px-2 py-1 font-bold text-xs transform rotate-3">DAILY ISSUE</div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 gap-4 bg-black p-2">
                {panels.map((panel, index) => (
                    <div key={index} className="bg-white relative aspect-square border-2 border-black overflow-hidden group">
                        {/* Panel Content (SVG) */}
                        <svg viewBox="0 0 200 200" className="w-full h-full">
                            {renderPanelVisual(panel)}
                        </svg>

                        {/* Caption Box */}
                        <div className="absolute top-0 left-0 bg-yellow-300 border-r-2 border-b-2 border-black px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                            {panel.caption}
                        </div>

                        {/* Speech Bubble */}
                        {panel.text && (
                            <div className="absolute bottom-2 left-2 right-2 bg-white border-2 border-black rounded-xl p-2 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                                <p className="text-[10px] font-comic leading-tight text-center">{panel.text}</p>
                            </div>
                        )}

                        {/* Halftone Overlay */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-10 pointer-events-none mix-blend-multiply"></div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="mt-2 text-center">
                <p className="text-[10px] text-gray-400 font-mono">GENERATED BY ORBIT COMIC ENGINE v1.0</p>
            </div>
        </div>
    );
});

DailyIssue.displayName = 'DailyIssue';

export default DailyIssue;
