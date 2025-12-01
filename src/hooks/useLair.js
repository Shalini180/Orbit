import { useState, useEffect, useCallback } from 'react';

const LAIR_STORAGE_KEY = 'orbitr_lair_v1';

const INITIAL_LAIR_STATE = {
    layout: [], // Array of { id, itemId, x, y }
    inventory: [], // Array of itemIds
    ambiance: 'DEFAULT', // 'DEFAULT', 'TECH', 'GOTHIC', etc.
};

export const useLair = (history = []) => {
    const [lairState, setLairState] = useState(() => {
        const saved = localStorage.getItem(LAIR_STORAGE_KEY);
        return saved ? JSON.parse(saved) : INITIAL_LAIR_STATE;
    });

    useEffect(() => {
        localStorage.setItem(LAIR_STORAGE_KEY, JSON.stringify(lairState));
    }, [lairState]);

    // Logic for "Dirty Room"
    const getCleanliness = useCallback(() => {
        if (!history || !Array.isArray(history) || history.length < 3) return 'CLEAN';

        // Check last 3 days
        const last3Days = history.slice(-3);
        const avgCompletion = last3Days.reduce((acc, day) => {
            // Assuming day.completedTasks and day.totalTasks or similar metric
            // For now, let's use a simple heuristic if perfectDay exists
            return acc + (day.perfectDay ? 100 : 50);
        }, 0) / 3;

        if (avgCompletion < 50) return 'DIRTY';
        if (avgCompletion > 90) return 'SPARKLING';
        return 'CLEAN';
    }, [history]);

    const placeItem = useCallback((itemId, x, y) => {
        setLairState(prev => {
            const newId = Date.now().toString();
            return {
                ...prev,
                layout: [...prev.layout, { id: newId, itemId, x, y }]
            };
        });
    }, []);

    const moveItem = useCallback((id, x, y) => {
        setLairState(prev => ({
            ...prev,
            layout: prev.layout.map(item =>
                item.id === id ? { ...item, x, y } : item
            )
        }));
    }, []);

    const removeItem = useCallback((id) => {
        setLairState(prev => ({
            ...prev,
            layout: prev.layout.filter(item => item.id !== id)
        }));
    }, []);

    const unlockItem = useCallback((itemId) => {
        setLairState(prev => {
            if (prev.inventory.includes(itemId)) return prev;
            return {
                ...prev,
                inventory: [...prev.inventory, itemId]
            };
        });
    }, []);

    const setAmbiance = useCallback((ambiance) => {
        setLairState(prev => ({ ...prev, ambiance }));
    }, []);

    return {
        lairState,
        cleanliness: getCleanliness(),
        placeItem,
        moveItem,
        removeItem,
        unlockItem,
        setAmbiance
    };
};
