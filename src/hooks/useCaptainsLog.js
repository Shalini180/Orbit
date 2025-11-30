import { useState, useEffect, useCallback } from 'react';

const HISTORY_STORAGE_KEY = 'orbitr_history_v1';

export const useCaptainsLog = () => {
    const [history, setHistory] = useState(() => {
        const saved = localStorage.getItem(HISTORY_STORAGE_KEY);
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
    }, [history]);

    const getTodayKey = () => new Date().toISOString().split('T')[0];

    const logDailyActivity = useCallback((stats) => {
        const today = getTodayKey();
        setHistory(prev => ({
            ...prev,
            [today]: {
                ...prev[today],
                ...stats,
                lastUpdated: new Date().toISOString()
            }
        }));
    }, []);

    const getStreak = () => {
        const today = new Date();
        let streak = 0;
        let current = today;

        // Check today first
        const todayKey = current.toISOString().split('T')[0];
        if (history[todayKey]) {
            streak++;
        }

        // Check backwards
        while (true) {
            current.setDate(current.getDate() - 1);
            const key = current.toISOString().split('T')[0];
            if (history[key]) {
                streak++;
            } else {
                break;
            }
        }
        return streak;
    };

    return {
        history,
        logDailyActivity,
        streak: getStreak()
    };
};
