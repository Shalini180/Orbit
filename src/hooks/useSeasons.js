import { useState, useEffect } from 'react';

const SEASONS = [
    { id: 'solar-flare', name: 'Solar Flare', affix: '+20% XP for Heavy Lifts', color: 'text-orange-500', border: 'border-orange-500' },
    { id: 'nebula', name: 'Nebula', affix: 'Deep Work grants 2x XP', color: 'text-purple-500', border: 'border-purple-500' },
    { id: 'void', name: 'The Void', affix: 'No XP penalty for missed tasks', color: 'text-slate-500', border: 'border-slate-500' },
    { id: 'supernova', name: 'Supernova', affix: 'All XP gains +50%', color: 'text-yellow-400', border: 'border-yellow-400' }
];

export const useSeasons = (userLevel) => {
    const [currentSeason, setCurrentSeason] = useState(SEASONS[0]);
    const [seasonProgress, setSeasonProgress] = useState(0);
    const [daysRemaining, setDaysRemaining] = useState(0);

    useEffect(() => {
        // Determine season based on month
        const now = new Date();
        const monthIndex = now.getMonth() % SEASONS.length;
        setCurrentSeason(SEASONS[monthIndex]);

        // Calculate days remaining in month
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        const diffTime = Math.abs(endOfMonth - now);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDaysRemaining(diffDays);

        // Mock progress based on day of month
        const dayOfMonth = now.getDate();
        const totalDays = endOfMonth.getDate();
        setSeasonProgress((dayOfMonth / totalDays) * 100);

    }, []);

    return {
        currentSeason,
        seasonProgress,
        daysRemaining
    };
};
