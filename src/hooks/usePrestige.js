import { useState } from 'react';

export const usePrestige = (level, onReset) => {
    const [isPrestigeAvailable, setIsPrestigeAvailable] = useState(false);
    const [prestigeCount, setPrestigeCount] = useState(() => {
        return parseInt(localStorage.getItem('orbit_prestige_count') || '0');
    });

    // Check eligibility
    if (level >= 50 && !isPrestigeAvailable) {
        setIsPrestigeAvailable(true);
    }

    const triggerPrestige = () => {
        if (level < 50) return;

        // Increment count
        const newCount = prestigeCount + 1;
        setPrestigeCount(newCount);
        localStorage.setItem('orbit_prestige_count', newCount.toString());

        // Trigger external reset (level, inventory, etc.)
        onReset();

        setIsPrestigeAvailable(false);
    };

    return {
        isPrestigeAvailable,
        prestigeCount,
        triggerPrestige
    };
};
