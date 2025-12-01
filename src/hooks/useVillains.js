import { useState, useEffect } from 'react';

const VILLAINS_STORAGE_KEY = 'orbitr_villains_v1';

const DEFAULT_VILLAINS = [
    { id: 'v1', name: 'Dr. Doomscroll', health: 100, maxHealth: 100, weakness: 'Focus Mode', description: 'Drains your time with endless feeds.' },
    { id: 'v2', name: 'The Procrastinator', health: 100, maxHealth: 100, weakness: 'Heavy Lift', description: 'Delays your dreams until tomorrow.' },
    { id: 'v3', name: 'Sugar Rush', health: 100, maxHealth: 100, weakness: 'Water', description: 'Spikes your energy then crashes it.' }
];

export const useVillains = () => {
    const [villains, setVillains] = useState(() => {
        const saved = localStorage.getItem(VILLAINS_STORAGE_KEY);
        return saved ? JSON.parse(saved) : DEFAULT_VILLAINS;
    });

    const [activeVillainId, setActiveVillainId] = useState(villains[0].id);

    useEffect(() => {
        localStorage.setItem(VILLAINS_STORAGE_KEY, JSON.stringify(villains));
    }, [villains]);

    const damageVillain = (amount) => {
        setVillains(prev => prev.map(v => {
            if (v.id === activeVillainId) {
                const newHealth = Math.max(0, v.health - amount);
                return { ...v, health: newHealth };
            }
            return v;
        }));
        return amount;
    };

    const healVillain = (amount) => {
        setVillains(prev => prev.map(v => {
            if (v.id === activeVillainId) {
                const newHealth = Math.min(v.maxHealth, v.health + amount);
                return { ...v, health: newHealth };
            }
            return v;
        }));
    };

    const getActiveVillain = () => villains.find(v => v.id === activeVillainId);

    const switchVillain = (id) => {
        setActiveVillainId(id);
    };

    return {
        villains,
        activeVillain: getActiveVillain(),
        damageVillain,
        healVillain,
        switchVillain
    };
};
