import React, { createContext, useContext, useState, useEffect } from 'react';

const THEMES = {
    VOID: {
        id: 'VOID',
        name: 'The Void',
        colors: {
            '--color-bg': '#0f172a', // Slate 900
            '--color-primary': '#22d3ee', // Cyan 400
            '--color-accent': '#d946ef', // Fuchsia 500
        },
        requiredLevel: 1
    },
    NEBULA: {
        id: 'NEBULA',
        name: 'Nebula',
        colors: {
            '--color-bg': '#2e1065', // Violet 950
            '--color-primary': '#e879f9', // Fuchsia 400
            '--color-accent': '#38bdf8', // Sky 400
        },
        requiredLevel: 5
    },
    SUPERNOVA: {
        id: 'SUPERNOVA',
        name: 'Supernova',
        colors: {
            '--color-bg': '#451a03', // Amber 950
            '--color-primary': '#fbbf24', // Amber 400
            '--color-accent': '#f87171', // Red 400
        },
        requiredLevel: 10
    },
    MATRIX: {
        id: 'MATRIX',
        name: 'The Matrix',
        colors: {
            '--color-bg': '#020617', // Slate 950 (almost black)
            '--color-primary': '#4ade80', // Green 400
            '--color-accent': '#22c55e', // Green 500
        },
        requiredLevel: 20
    }
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children, userLevel }) => {
    const [currentTheme, setCurrentTheme] = useState(() => {
        return localStorage.getItem('orbitr_theme') || 'VOID';
    });

    useEffect(() => {
        const theme = THEMES[currentTheme];
        if (theme) {
            const root = document.documentElement;
            Object.entries(theme.colors).forEach(([key, value]) => {
                root.style.setProperty(key, value);
            });
            localStorage.setItem('orbitr_theme', currentTheme);
        }
    }, [currentTheme]);

    const unlockTheme = (themeId) => {
        const theme = THEMES[themeId];
        if (theme && userLevel >= theme.requiredLevel) {
            setCurrentTheme(themeId);
            return true;
        }
        return false;
    };

    return (
        <ThemeContext.Provider value={{ currentTheme, unlockTheme, availableThemes: THEMES }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
