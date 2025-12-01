import { useMemo } from 'react';

export const useSidekickVariant = (dimensionType) => {
    const variant = useMemo(() => {
        switch (dimensionType) {
            case 'WORK':
                return {
                    name: 'Unit 2099',
                    outfit: 'CYBER_VISOR',
                    dialogueStyle: 'PROFESSIONAL', // "Task initialized. Efficiency required."
                    colors: ['#00ff00', '#003300']
                };
            case 'HOME':
                return {
                    name: 'Lil Buddy',
                    outfit: 'HOODIE',
                    dialogueStyle: 'RELAXED', // "Hey! Don't forget to hydrate."
                    colors: ['#f59e0b', '#fffbeb']
                };
            case 'GYM':
                return {
                    name: 'Coach',
                    outfit: 'HEADBAND',
                    dialogueStyle: 'HYPE', // "ONE MORE REP!"
                    colors: ['#ef4444', '#fee2e2']
                };
            default:
                return {
                    name: 'Sidekick',
                    outfit: 'CAPE',
                    dialogueStyle: 'HEROIC', // "We can do this, Commander!"
                    colors: ['#06b6d4', '#ffffff']
                };
        }
    }, [dimensionType]);

    return variant;
};
