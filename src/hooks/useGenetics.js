import { useState, useEffect, useCallback } from 'react';

const GENETICS_STORAGE_KEY = 'orbitr_genetics_v1';

const INITIAL_ATTRIBUTES = {
    MIGHT: { xp: 0, level: 1 },
    MIND: { xp: 0, level: 1 },
    SPEED: { xp: 0, level: 1 },
    SPIRIT: { xp: 0, level: 1 }
};

const DEFAULT_TAG_MAP = {
    '#gym': 'MIGHT',
    '#workout': 'MIGHT',
    '#labor': 'MIGHT',
    '#code': 'MIND',
    '#study': 'MIND',
    '#read': 'MIND',
    '#run': 'SPEED',
    '#chore': 'SPEED',
    '#email': 'SPEED',
    '#social': 'SPIRIT',
    '#family': 'SPIRIT',
    '#meeting': 'SPIRIT'
};

const XP_PER_LEVEL = 100;

export const useGenetics = () => {
    const [attributes, setAttributes] = useState(() => {
        const saved = localStorage.getItem(GENETICS_STORAGE_KEY);
        return saved ? JSON.parse(saved) : INITIAL_ATTRIBUTES;
    });

    const [tagMap, setTagMap] = useState(() => {
        const saved = localStorage.getItem('orbitr_tagmap_v1');
        return saved ? JSON.parse(saved) : DEFAULT_TAG_MAP;
    });

    useEffect(() => {
        localStorage.setItem(GENETICS_STORAGE_KEY, JSON.stringify(attributes));
    }, [attributes]);

    useEffect(() => {
        localStorage.setItem('orbitr_tagmap_v1', JSON.stringify(tagMap));
    }, [tagMap]);

    const processTask = useCallback((taskText) => {
        if (!taskText) return;

        const tags = taskText.match(/#[\w]+/g);
        if (!tags) return;

        setAttributes(prev => {
            const newAttributes = { ...prev };
            let updated = false;

            tags.forEach(tag => {
                const attrKey = tagMap[tag.toLowerCase()];
                if (attrKey) {
                    updated = true;
                    newAttributes[attrKey] = {
                        ...newAttributes[attrKey],
                        xp: newAttributes[attrKey].xp + 10 // 10 XP per tag
                    };

                    // Check Level Up
                    const nextLevelXP = newAttributes[attrKey].level * XP_PER_LEVEL;
                    if (newAttributes[attrKey].xp >= nextLevelXP) {
                        newAttributes[attrKey].level += 1;
                        // Ideally trigger a level up event here
                    }
                }
            });

            return updated ? newAttributes : prev;
        });
    }, [tagMap]);

    const addTagMapping = useCallback((tag, attribute) => {
        setTagMap(prev => ({
            ...prev,
            [tag.toLowerCase()]: attribute
        }));
    }, []);

    return {
        attributes,
        processTask,
        addTagMapping,
        tagMap
    };
};
