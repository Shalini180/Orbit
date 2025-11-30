import { useState, useEffect } from 'react';

const MEDALS = [
    { id: 'iron-will', name: 'Iron Will', description: '7-day streak of Heavy Lifts', icon: '🛡️', condition: (stats) => stats.streak >= 7 },
    { id: 'void-walker', name: 'Void Walker', description: 'Accumulate 100 hours in Hyperdrive', icon: '🌌', condition: (stats) => stats.totalFocusHours >= 100 },
    { id: 'social-butterfly', name: 'Social Butterfly', description: 'Complete 50 Squad Bounties', icon: '🦋', condition: (stats) => stats.bountiesCompleted >= 50 },
    { id: 'prestige-pioneer', name: 'Prestige Pioneer', description: 'Reset your journey once', icon: '🌟', condition: (stats) => stats.prestigeCount >= 1 },
];

export const useMedals = (stats, showToast) => {
    const [unlockedMedals, setUnlockedMedals] = useState(() => {
        const saved = localStorage.getItem('orbit_medals');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        let newUnlock = false;
        const updatedMedals = [...unlockedMedals];

        MEDALS.forEach(medal => {
            if (!updatedMedals.includes(medal.id) && medal.condition(stats)) {
                updatedMedals.push(medal.id);
                showToast(`ACHIEVEMENT UNLOCKED: ${medal.name.toUpperCase()}`);
                newUnlock = true;
            }
        });

        if (newUnlock) {
            setUnlockedMedals(updatedMedals);
            localStorage.setItem('orbit_medals', JSON.stringify(updatedMedals));
        }
    }, [stats, unlockedMedals, showToast]);

    return {
        medals: MEDALS,
        unlockedMedals
    };
};
