import { useState, useEffect, useCallback } from 'react';

const SUBSCRIPTIONS_KEY = 'orbitr_newsstand_subs_v1';

// Mock Community Content
const MOCK_FEED = [
    {
        id: 'mock-villain-1',
        type: 'VILLAIN',
        name: 'The Procrastinator',
        author: 'DevDave',
        rating: 4.5,
        downloads: 120,
        description: 'He delays your dreams until tomorrow!',
        data: { hp: 500, weakness: 'DEADLINES', avatar: { color: '#888888', shape: 'SLIME' } }
    },
    {
        id: 'mock-arc-1',
        type: 'ARC',
        name: '30 Days of Python',
        author: 'CodeWizard',
        rating: 4.8,
        downloads: 350,
        description: 'Zero to Hero in Python. Build 5 apps.',
        data: { duration: 30, milestones: [] }
    },
    {
        id: 'mock-villain-2',
        type: 'VILLAIN',
        name: 'Captain Burnout',
        author: 'TiredDev',
        rating: 4.2,
        downloads: 85,
        description: 'Drains your energy bar instantly.',
        data: { hp: 300, weakness: 'SLEEP', avatar: { color: '#ff4400', shape: 'FIRE' } }
    }
];

export const useNewsstand = () => {
    const [subscriptions, setSubscriptions] = useState(() => {
        const saved = localStorage.getItem(SUBSCRIPTIONS_KEY);
        return saved ? JSON.parse(saved) : [];
    });

    const [feed, setFeed] = useState(MOCK_FEED);

    useEffect(() => {
        localStorage.setItem(SUBSCRIPTIONS_KEY, JSON.stringify(subscriptions));
    }, [subscriptions]);

    // In a real app, we'd fetch from an API here.
    // We could also pull from 'orbitr_creator_published_v1' to show local user's published items in the feed for testing.
    useEffect(() => {
        const localPublished = localStorage.getItem('orbitr_creator_published_v1');
        if (localPublished) {
            const parsed = JSON.parse(localPublished);
            // Merge local published items into feed if not already there
            setFeed(prev => {
                const newItems = parsed.filter(p => !prev.find(f => f.id === p.id));
                return [...prev, ...newItems.map(item => ({ ...item, author: 'You (Local)' }))];
            });
        }
    }, []);

    const subscribe = useCallback((item) => {
        setSubscriptions(prev => {
            if (prev.find(s => s.id === item.id)) return prev;
            return [...prev, { ...item, subscribedAt: new Date().toISOString() }];
        });
    }, []);

    const unsubscribe = useCallback((id) => {
        setSubscriptions(prev => prev.filter(s => s.id !== id));
    }, []);

    const isSubscribed = useCallback((id) => {
        return subscriptions.some(s => s.id === id);
    }, [subscriptions]);

    return {
        feed,
        subscriptions,
        subscribe,
        unsubscribe,
        isSubscribed
    };
};
