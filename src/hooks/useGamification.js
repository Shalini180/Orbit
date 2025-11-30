import { useState, useEffect, useCallback } from 'react';

const XP_STORAGE_KEY = 'orbitr_xp_v1';

const XP_TABLE = {
    HEAVY_LIFT: 200,
    THRUSTER: 50,
    BOARD_CLEAR: 100
};

// Simple linear leveling for now: Level * 500 XP
const XP_PER_LEVEL = 500;

export const useGamification = () => {
    const [xpState, setXpState] = useState(() => {
        const saved = localStorage.getItem(XP_STORAGE_KEY);
        return saved ? JSON.parse(saved) : { totalXP: 0, level: 1 };
    });

    const [levelUpEvent, setLevelUpEvent] = useState(null);

    useEffect(() => {
        localStorage.setItem(XP_STORAGE_KEY, JSON.stringify(xpState));
    }, [xpState]);

    const calculateLevel = (xp) => {
        return Math.floor(xp / XP_PER_LEVEL) + 1;
    };

    const addXP = useCallback((amount) => {
        setXpState(prev => {
            const newTotal = prev.totalXP + amount;
            const newLevel = calculateLevel(newTotal);

            if (newLevel > prev.level) {
                setLevelUpEvent(newLevel);
            }

            return {
                totalXP: newTotal,
                level: newLevel
            };
        });
    }, []);

    const clearLevelUpEvent = () => setLevelUpEvent(null);

    const getProgress = () => {
        const currentLevelBaseXP = (xpState.level - 1) * XP_PER_LEVEL;
        const progressXP = xpState.totalXP - currentLevelBaseXP;
        return (progressXP / XP_PER_LEVEL) * 100;
    };

    const resetProgress = () => {
        setXpState({ totalXP: 0, level: 1 });
        localStorage.removeItem(XP_STORAGE_KEY);
    };

    return {
        xpState,
        addXP,
        levelUpEvent,
        clearLevelUpEvent,
        progress: getProgress(),
        resetProgress,
        XP_TABLE
    };
};
