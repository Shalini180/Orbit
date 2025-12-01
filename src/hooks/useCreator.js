import { useState, useEffect, useCallback } from 'react';

const DRAFTS_KEY = 'orbitr_creator_drafts_v1';
const PUBLISHED_KEY = 'orbitr_creator_published_v1';

export const useCreator = () => {
    const [drafts, setDrafts] = useState(() => {
        const saved = localStorage.getItem(DRAFTS_KEY);
        return saved ? JSON.parse(saved) : [];
    });

    const [published, setPublished] = useState(() => {
        const saved = localStorage.getItem(PUBLISHED_KEY);
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
    }, [drafts]);

    useEffect(() => {
        localStorage.setItem(PUBLISHED_KEY, JSON.stringify(published));
    }, [published]);

    const createDraft = useCallback((type) => {
        const newDraft = {
            id: Date.now().toString(),
            type, // 'VILLAIN' or 'ARC'
            name: 'Untitled Project',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            data: type === 'VILLAIN' ? {
                hp: 100,
                weakness: '',
                bio: '',
                avatar: { color: '#000000', shape: 'DEFAULT' }
            } : {
                duration: 7,
                milestones: [],
                description: ''
            }
        };
        setDrafts(prev => [...prev, newDraft]);
        return newDraft.id;
    }, []);

    const updateDraft = useCallback((id, updates) => {
        setDrafts(prev => prev.map(draft =>
            draft.id === id
                ? { ...draft, ...updates, updatedAt: new Date().toISOString() }
                : draft
        ));
    }, []);

    const deleteDraft = useCallback((id) => {
        setDrafts(prev => prev.filter(draft => draft.id !== id));
    }, []);

    const publishContent = useCallback((id) => {
        const draft = drafts.find(d => d.id === id);
        if (!draft) return;

        const publishedItem = {
            ...draft,
            publishedAt: new Date().toISOString(),
            version: 1,
            downloads: 0,
            rating: 0
        };

        setPublished(prev => [...prev, publishedItem]);
        deleteDraft(id);

        // In a real app, this would push to a server. 
        // Here we might want to expose it to useNewsstand via a shared key or event.
        // For now, we'll just store it in local 'published' state which acts as "My Contributions"

        return publishedItem;
    }, [drafts, deleteDraft]);

    return {
        drafts,
        published,
        createDraft,
        updateDraft,
        deleteDraft,
        publishContent
    };
};
