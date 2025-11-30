import { useState, useEffect, useCallback } from 'react';

// Mock Data Generators
const generateCalendarEvents = () => {
    const now = new Date();
    const events = [];

    // Create 3 events for the day
    for (let i = 0; i < 3; i++) {
        const start = new Date(now);
        start.setHours(now.getHours() + i + 1, 0, 0, 0);
        const end = new Date(start);
        end.setHours(start.getHours() + 1);

        events.push({
            id: `cal-${i}`,
            title: ['Team Sync', 'Deep Work', 'Client Review'][i],
            start,
            end,
            source: 'google-calendar',
            type: i === 1 ? 'FOCUS' : 'MEETING'
        });
    }
    return events;
};

const generateGithubNotifications = () => [
    {
        id: 'gh-1',
        title: 'PR #402 Merged: Fix Hyperdrive Logic',
        source: 'github',
        xp: 50,
        timestamp: new Date()
    }
];

export const useSubspace = (addXP, showToast) => {
    // Connection States
    const [connections, setConnections] = useState({
        'google-calendar': false,
        'github': false,
        'slack': false
    });

    const [timelineEvents, setTimelineEvents] = useState([]);
    const [incomingTransmission, setIncomingTransmission] = useState(null);

    // Toggle Connection (Simulate OAuth)
    const toggleConnection = (serviceId) => {
        setConnections(prev => {
            const newState = { ...prev, [serviceId]: !prev[serviceId] };

            // If connecting, fetch mock data
            if (newState[serviceId]) {
                if (serviceId === 'google-calendar') {
                    setTimelineEvents(generateCalendarEvents());
                    showToast('UPLINK ESTABLISHED: CALENDAR SYNCED');
                } else if (serviceId === 'github') {
                    // Simulate incoming PR notification after delay
                    setTimeout(() => {
                        const notif = generateGithubNotifications()[0];
                        setIncomingTransmission(notif);
                    }, 3000);
                    showToast('UPLINK ESTABLISHED: GITHUB REPO LINKED');
                }
            } else {
                // Disconnecting
                if (serviceId === 'google-calendar') setTimelineEvents([]);
                showToast(`UPLINK TERMINATED: ${serviceId.toUpperCase()}`);
            }

            return newState;
        });
    };

    // Automation Engine (Triggers)
    useEffect(() => {
        // Rule: If "Deep Work" event starts -> Suggest Hyperdrive
        // (Simplified: just check if we have a focus event in the next hour)
        const hasFocusEventSoon = timelineEvents.some(e =>
            e.type === 'FOCUS' &&
            e.start > new Date() &&
            e.start - new Date() < 3600000 // Within 1 hour
        );

        if (hasFocusEventSoon) {
            // In a real app, this might auto-trigger or prompt
            // console.log("Subspace: Approaching Deep Work Sector");
        }
    }, [timelineEvents]);

    const clearTransmission = useCallback(() => {
        if (incomingTransmission) {
            // Auto-claim rewards
            if (incomingTransmission.xp) {
                addXP(incomingTransmission.xp);
                showToast(`+${incomingTransmission.xp} XP [${incomingTransmission.source.toUpperCase()}]`);
            }
            setIncomingTransmission(null);
        }
    }, [incomingTransmission, addXP, showToast]);

    return {
        connections,
        toggleConnection,
        timelineEvents,
        incomingTransmission,
        clearTransmission
    };
};
