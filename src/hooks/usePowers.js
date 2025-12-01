import { useMemo } from 'react';

export const usePowers = (attributes) => {
    const activePowers = useMemo(() => {
        const powers = [];

        if (attributes.MIND.level >= 5) {
            powers.push({
                id: 'TECHNOPATH',
                name: 'Technopath',
                description: 'Auto-sorts tasks by difficulty.',
                icon: '🧠'
            });
        }

        if (attributes.MIGHT.level >= 5) {
            powers.push({
                id: 'JUGGERNAUT',
                name: 'Juggernaut',
                description: 'Heavy Lift tasks glow and yield double XP.',
                icon: '💪'
            });
        }

        if (attributes.SPEED.level >= 5) {
            powers.push({
                id: 'SPEEDSTER',
                name: 'Speedster',
                description: 'Quick tasks (Thrusters) have a lightning aura.',
                icon: '⚡'
            });
        }

        if (attributes.SPIRIT.level >= 5) {
            powers.push({
                id: 'INSPIRING_PRESENCE',
                name: 'Inspiring Presence',
                description: 'Sidekick is always happy.',
                icon: '✨'
            });
        }

        return powers;
    }, [attributes]);

    const hasPower = (powerId) => activePowers.some(p => p.id === powerId);

    return {
        activePowers,
        hasPower
    };
};
