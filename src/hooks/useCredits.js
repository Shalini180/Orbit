import { useState, useEffect, useCallback } from 'react';

const CREDITS_STORAGE_KEY = 'orbitr_credits_v1';

export const useCredits = () => {
    const [credits, setCredits] = useState(() => {
        const saved = localStorage.getItem(CREDITS_STORAGE_KEY);
        return saved ? parseInt(saved, 10) : 0;
    });

    useEffect(() => {
        localStorage.setItem(CREDITS_STORAGE_KEY, credits.toString());
    }, [credits]);

    const addCredits = useCallback((amount) => {
        setCredits(prev => prev + amount);
    }, []);

    const spendCredits = useCallback((amount) => {
        setCredits(prev => {
            if (prev >= amount) {
                return prev - amount;
            }
            return prev;
        });
    }, []);

    return {
        credits,
        addCredits,
        spendCredits
    };
};
