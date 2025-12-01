import { useCallback } from 'react';

export const useComicGen = () => {
    const generateComic = useCallback((dailyStats, heroName = "Commander", sidekickName = "Sidekick") => {
        const {
            date,
            mainTask, // { text, completed }
            villain, // { name, active, defeated }
            xpEarned,
            tokensEarned
        } = dailyStats;

        const panels = [];

        // Panel 1: The Setup
        panels.push({
            id: 1,
            type: 'SETUP',
            visual: 'SIDEKICK_ALERT',
            text: `Captain! Sensors detect a massive anomaly! It's... ${mainTask?.text || "Unknown"}!`,
            caption: "THE BRIEFING"
        });

        // Panel 2: The Conflict
        if (villain?.active) {
            panels.push({
                id: 2,
                type: 'CONFLICT',
                visual: 'HERO_VS_VILLAIN',
                text: `You won't get away with this, ${villain.name}!`,
                caption: "BATTLE ENGAGED"
            });
        } else {
            panels.push({
                id: 2,
                type: 'CONFLICT',
                visual: 'HERO_LIFTING',
                text: "Hrrngh! This is heavier than a neutron star!",
                caption: "THE GRIND"
            });
        }

        // Panel 3: The Climax
        if (mainTask?.completed) {
            panels.push({
                id: 3,
                type: 'CLIMAX',
                visual: 'VICTORY_POSE',
                text: "BOOYAH! Another victory for the Alliance!",
                caption: "SUCCESS"
            });
        } else {
            panels.push({
                id: 3,
                type: 'CLIMAX',
                visual: 'DEFEAT_RETREAT',
                text: "Tactical retreat! We'll get 'em tomorrow!",
                caption: "FAILURE"
            });
        }

        // Panel 4: The Stats
        panels.push({
            id: 4,
            type: 'STATS',
            visual: 'DATA_SCREEN',
            stats: {
                xp: xpEarned,
                tokens: tokensEarned,
                streak: dailyStats.streak || 0
            },
            caption: "MISSION REPORT"
        });

        return {
            id: date, // Unique ID for the issue
            date: date,
            title: `Issue #${dailyStats.streak || 1}`,
            hero: heroName,
            panels: panels
        };
    }, []);

    return {
        generateComic
    };
};
