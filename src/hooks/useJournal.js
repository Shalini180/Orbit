import { useState, useEffect } from 'react';

const JOURNAL_STORAGE_KEY = 'orbitr_journal_v1';

const TEMPLATES = {
    MORNING: {
        id: 'MORNING',
        title: 'EPISODE START',
        prompts: [
            { id: 'hero', label: 'THE HERO WAKES UP...', placeholder: 'What is the mission today?' },
            { id: 'villain', label: 'THE VILLAIN ARRIVES...', placeholder: 'What is the distraction?' },
            { id: 'power', label: 'SUPERPOWER ACTIVATED...', placeholder: 'What is your focus?' }
        ]
    },
    EVENING: {
        id: 'EVENING',
        title: 'TO BE CONTINUED...',
        prompts: [
            { id: 'climax', label: 'THE CLIMAX...', placeholder: 'What was the hardest part?' },
            { id: 'victory', label: 'THE VICTORY...', placeholder: 'What did we achieve?' },
            { id: 'sequel', label: 'NEXT EPISODE...', placeholder: 'Plan for tomorrow?' }
        ]
    },
    // Keep legacy templates for backward compatibility if needed, or map them
    LAUNCH: {
        id: 'LAUNCH',
        title: 'LAUNCH SEQUENCE',
        prompts: [
            { id: 'intent', label: 'INTENTION SETTING', placeholder: 'Today is about...' },
            { id: 'tactical', label: 'TACTICAL PLAN', placeholder: 'I will accomplish...' },
            { id: 'fuel', label: 'FUEL CHECK', placeholder: 'Energy level (1-10)...' }
        ]
    }
};

export const useJournal = () => {
    const [entries, setEntries] = useState(() => {
        const saved = localStorage.getItem(JOURNAL_STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(entries));
    }, [entries]);

    const addEntry = (type, data) => {
        const newEntry = {
            id: Date.now(),
            date: new Date().toISOString(),
            type,
            data
        };
        setEntries(prev => [newEntry, ...prev]);
        return newEntry;
    };

    const getTodayEntry = (type) => {
        const today = new Date().toDateString();
        return entries.find(e =>
            e.type === type &&
            new Date(e.date).toDateString() === today
        );
    };

    return {
        entries,
        addEntry,
        getTodayEntry,
        TEMPLATES
    };
};
