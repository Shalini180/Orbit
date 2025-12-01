import React from 'react';
import { Sparkles } from 'lucide-react';

const SupporterBadge = ({ isPremium }) => {
    if (!isPremium) return null;

    return (
        <span
            className="inline-flex items-center gap-1 bg-gradient-to-r from-yellow-300 to-yellow-500 text-black text-[10px] font-black px-2 py-0.5 rounded-full ml-2 uppercase tracking-wider shadow-[0_0_10px_rgba(234,179,8,0.5)]"
            title="Hero License Active"
        >
            <Sparkles size={10} /> PRO
        </span>
    );
};

export default SupporterBadge;
