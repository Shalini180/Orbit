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

export const useOrbitEngine = () => {
    const [state, setState] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : INITIAL_STATE;
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, [state]);

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
