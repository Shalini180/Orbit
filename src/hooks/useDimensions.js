import { useState, useEffect, useCallback } from 'react';

const DIMENSIONS_STORAGE_KEY = 'orbitr_dimensions_v1';

const DEFAULT_DIMENSIONS = [
    {
        id: 'EARTH-616',
        name: 'Prime Reality',
        type: 'DEFAULT',
        theme: {
            primary: '#06b6d4', // Cyan
            accent: '#d946ef', // Fuchsia
            bg: '#ffffff',
            text: '#000000'
        }
    },
    {
        id: 'EARTH-2099',
        name: 'Neon Work',
        type: 'WORK',
        theme: {
            primary: '#00ff00', // Neon Green
            accent: '#ff00ff', // Neon Pink
            bg: '#0f172a', // Slate 900
            text: '#e2e8f0' // Slate 200
        }
    },
    {
        id: 'EARTH-001',
        name: 'Cozy Home',
        type: 'HOME',
        theme: {
            primary: '#f59e0b', // Amber
            accent: '#10b981', // Emerald
            bg: '#fffbeb', // Amber 50
            text: '#451a03' // Amber 950
        }
    }
];

export const useDimensions = () => {
    const [dimensions, setDimensions] = useState(() => {
        const saved = localStorage.getItem(DIMENSIONS_STORAGE_KEY);
        return saved ? JSON.parse(saved) : DEFAULT_DIMENSIONS;
    });

    const [activeDimensionId, setActiveDimensionId] = useState(() => {
        return localStorage.getItem('orbitr_active_dimension') || 'EARTH-616';
    });

    useEffect(() => {
        localStorage.setItem(DIMENSIONS_STORAGE_KEY, JSON.stringify(dimensions));
    }, [dimensions]);

    useEffect(() => {
        localStorage.setItem('orbitr_active_dimension', activeDimensionId);

        // Apply Theme
        const activeDim = dimensions.find(d => d.id === activeDimensionId);
        if (activeDim) {
            const root = document.documentElement;
            root.style.setProperty('--color-comic-primary', activeDim.theme.primary);
            root.style.setProperty('--color-comic-accent', activeDim.theme.accent);
            root.style.setProperty('--color-comic-bg', activeDim.theme.bg);
            root.style.setProperty('--color-comic-text', activeDim.theme.text);

            // Hacky but effective way to handle dark mode classes if needed
            if (activeDim.type === 'WORK') {
                document.body.classList.add('dark-dimension');
            } else {
                document.body.classList.remove('dark-dimension');
            }
        }
    }, [activeDimensionId, dimensions]);

    const switchDimension = useCallback((id) => {
        setActiveDimensionId(id);
    }, []);

    const activeDimension = dimensions.find(d => d.id === activeDimensionId) || dimensions[0];

    return {
        dimensions,
        activeDimension,
        activeDimensionId,
        switchDimension
    };
};
