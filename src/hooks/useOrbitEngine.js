import { useState, useEffect } from 'react';

const STORAGE_KEY = 'orbitr_core_state_v1';

const INITIAL_STATE = {
    identity: '',
    heavyLift: { text: '', completed: false },
    thrusters: [
        { id: 1, text: '', completed: false },
        { id: 2, text: '', completed: false }
    ],
    status: 'IDLE', // IDLE, LOCKED, WARP
};

export const useOrbitEngine = (dimensionId = 'EARTH-616') => {
    const storageKey = `orbitr_core_state_v1_${dimensionId}`;

    const [state, setState] = useState(() => {
        const saved = localStorage.getItem(storageKey);
        return saved ? JSON.parse(saved) : INITIAL_STATE;
    });

    // Reset state when dimension changes if not found in storage
    useEffect(() => {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
            setState(JSON.parse(saved));
        } else {
            setState(INITIAL_STATE);
        }
    }, [dimensionId, storageKey]);

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(state));
    }, [state, storageKey]);

    const setIdentity = (identity) => {
        setState(prev => ({ ...prev, identity }));
    };

    const lockIdentity = () => {
        if (state.identity.trim()) {
            setState(prev => ({ ...prev, status: 'LOCKED' }));
        }
    };

    const setHeavyLift = (text) => {
        setState(prev => ({
            ...prev,
            heavyLift: { ...prev.heavyLift, text }
        }));
    };

    const toggleHeavyLift = () => {
        setState(prev => {
            const newCompleted = !prev.heavyLift.completed;
            return {
                ...prev,
                heavyLift: { ...prev.heavyLift, completed: newCompleted },
                status: newCompleted ? 'WARP' : 'LOCKED'
            };
        });
    };

    const setThruster = (id, text) => {
        setState(prev => ({
            ...prev,
            thrusters: prev.thrusters.map(t =>
                t.id === id ? { ...t, text } : t
            )
        }));
    };

    const toggleThruster = (id) => {
        setState(prev => ({
            ...prev,
            thrusters: prev.thrusters.map(t =>
                t.id === id ? { ...t, completed: !t.completed } : t
            )
        }));
    };

    const jettison = () => {
        setState(INITIAL_STATE);
    };

    return {
        state,
        actions: {
            setIdentity,
            lockIdentity,
            setHeavyLift,
            toggleHeavyLift,
            setThruster,
            toggleThruster,
            jettison
        }
    };
};
