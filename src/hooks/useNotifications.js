import { useState, useEffect, useCallback } from 'react';

export const useNotifications = (tasks) => {
    const [permission, setPermission] = useState(Notification.permission);

    const requestPermission = useCallback(async () => {
        if (!('Notification' in window)) return;
        const result = await Notification.requestPermission();
        setPermission(result);
    }, []);

    const sendNotification = useCallback((title, body) => {
        if (permission === 'granted') {
            new Notification(title, {
                body,
                icon: '/vite.svg', // Placeholder icon
                tag: 'orbit-alert'
            });
        }
    }, [permission]);

    // Check for alerts based on time and task status
    useEffect(() => {
        if (permission !== 'granted') return;

        const checkStatus = () => {
            const now = new Date();
            const hour = now.getHours();
            const incompleteTasks = tasks.filter(t => !t.completed).length;

            if (incompleteTasks > 0) {
                if (hour === 18) { // 6 PM Warning
                    sendNotification(
                        "⚠️ HULL INTEGRITY DROPPING",
                        "Commander, mission objectives incomplete. Hull integrity at 80%."
                    );
                } else if (hour === 22) { // 10 PM Critical
                    sendNotification(
                        "🚨 CRITICAL ALERT",
                        "Orbit decaying. Complete tasks immediately to avoid crash landing."
                    );
                }
            }
        };

        // Check every minute (in a real app, use a more robust scheduler or service worker)
        const interval = setInterval(checkStatus, 60000);
        return () => clearInterval(interval);
    }, [permission, tasks, sendNotification]);

    return {
        permission,
        requestPermission,
        sendNotification
    };
};
