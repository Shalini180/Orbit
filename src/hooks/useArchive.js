import { useState, useEffect, useCallback } from 'react';

const ARCHIVE_STORAGE_KEY = 'orbitr_archive_v1';

export const useArchive = () => {
    const [archive, setArchive] = useState(() => {
        const saved = localStorage.getItem(ARCHIVE_STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem(ARCHIVE_STORAGE_KEY, JSON.stringify(archive));
    }, [archive]);

    const saveIssue = useCallback((issueData) => {
        setArchive(prev => {
            // Check if issue for this date already exists to prevent duplicates
            const exists = prev.find(issue => issue.date === issueData.date);
            if (exists) return prev;
            return [issueData, ...prev];
        });
    }, []);

    const getIssue = useCallback((date) => {
        return archive.find(issue => issue.date === date);
    }, [archive]);

    const deleteIssue = useCallback((date) => {
        setArchive(prev => prev.filter(issue => issue.date !== date));
    }, []);

    return {
        archive,
        saveIssue,
        getIssue,
        deleteIssue
    };
};
