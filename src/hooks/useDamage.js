import { useState, useEffect } from 'react';

export const useDamage = (tasks) => {
    const [damageLevel, setDamageLevel] = useState('NORMAL'); // NORMAL, WARNING, CRITICAL
    const [shake, setShake] = useState(false);

    useEffect(() => {
        const checkDamage = () => {
            const now = new Date();
            const hour = now.getHours();
            const incompleteTasks = tasks.filter(t => !t.completed).length;

            if (incompleteTasks > 0) {
                if (hour >= 21) {
                    setDamageLevel('CRITICAL');
                } else if (hour >= 18) {
                    setDamageLevel('WARNING');
                } else {
                    setDamageLevel('NORMAL');
                }
            } else {
                setDamageLevel('NORMAL');
            }
        };

        checkDamage();
        const interval = setInterval(checkDamage, 60000); // Check every minute
        return () => clearInterval(interval);
    }, [tasks]);

    const triggerShake = () => {
        setShake(true);
        setTimeout(() => setShake(false), 500);
    };

    return {
        damageLevel,
        shake,
        triggerShake
    };
};
