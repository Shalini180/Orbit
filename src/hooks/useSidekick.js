import { useState, useCallback, useEffect } from 'react';

const MOODS = {
    HAPPY: 'HAPPY',
    PANICKED: 'PANICKED',
    SLEEPING: 'SLEEPING',
    DISAPPOINTED: 'DISAPPOINTED',
    EXCITED: 'EXCITED'
};

export const useSidekick = (tasks = [], streak = 0) => {
    const [mood, setMood] = useState(MOODS.SLEEPING);
    const [message, setMessage] = useState('');
    const [isInteracting, setIsInteracting] = useState(false);

    // Determine mood based on state
    useEffect(() => {
        if (isInteracting) return;

        const hour = new Date().getHours();
        const incompleteTasks = tasks.filter(t => !t.completed).length;

        if (hour >= 22 && incompleteTasks > 0) {
            setMood(MOODS.PANICKED);
            setMessage("WE'RE GONNA CRASH! DO SOMETHING!");
        } else if (incompleteTasks === 0 && tasks.length > 0) {
            setMood(MOODS.EXCITED);
            setMessage("WE DID IT BOSS! PIZZA TIME?");
        } else if (streak > 3) {
            setMood(MOODS.HAPPY);
            setMessage(`LOOK AT THAT STREAK! ${streak} DAYS!`);
        } else if (hour >= 9 && hour < 18) {
            setMood(MOODS.HAPPY);
            setMessage("READY FOR ACTION!");
        } else {
            setMood(MOODS.SLEEPING);
            setMessage("Zzz...");
        }
    }, [tasks, streak, isInteracting]);

    const interact = useCallback(() => {
        setIsInteracting(true);
        setMood(MOODS.EXCITED);

        const quotes = [
            "YOU'RE THE BEST!",
            "DON'T GIVE UP!",
            "I BELIEVE IN YOU!",
            "DID YOU DRINK WATER?",
            "IS IT LUNCH TIME YET?"
        ];
        setMessage(quotes[Math.floor(Math.random() * quotes.length)]);

        setTimeout(() => {
            setIsInteracting(false);
        }, 3000);
    }, []);

    return {
        mood,
        message,
        interact,
        MOODS
    };
};
