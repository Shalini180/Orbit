import { useState, useEffect } from 'react';

const JOURNAL_STORAGE_KEY = 'orbitr_journal_v1';

const TEMPLATES = {
    LAUNCH: {
        title: 'LAUNCH SEQUENCE',
        prompts: [
            { id: 'focus', text: 'Today is about', placeholder: 'FOCUS KEYWORD' },
            { id: 'task', text: 'I will accomplish', placeholder: 'MISSION OBJECTIVE' },
            { id: 'time', text: 'by', placeholder: 'TIME (e.g. 1400)' }
        ]
    },
    DEBRIEF: {
        title: 'MISSION DEBRIEF',
        prompts: [
            { id: 'report', text: 'Mission Report:', placeholder: 'STATUS' },
            { id: 'efficiency', text: 'Efficiency Rating (1-10):', placeholder: 'RATING' },
            { id: 'reflection', text: 'Analysis:', placeholder: 'ONE SENTENCE REFLECTION' }
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
            type, // 'LAUNCH' or 'DEBRIEF'
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
