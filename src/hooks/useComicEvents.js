import { useState, useEffect } from 'react';

export const useComicEvents = (tasks = []) => {
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const checkTime = () => {
            const now = new Date();
            const hour = now.getHours();
            const incompleteTasks = tasks.filter(t => !t.completed).length;

            if (incompleteTasks > 0) {
                if (hour === 18) {
                    setEvent({
                        type: 'PLOT_TWIST',
                        title: 'THE PLOT THICKENS!',
                        message: "Hey boss! We forgot the heavy lifting! Do you want me to carry it? (I can't, I have no arms.)"
                    });
                } else if (hour === 22) {
                    setEvent({
                        type: 'CLIFFHANGER',
                        title: 'CLIFFHANGER WARNING!',
                        message: "Don't end the episode on a cliffhanger! Finish the task to save the day!"
                    });
                }
            }
        };

        // Check every minute
        const interval = setInterval(checkTime, 60000);
        checkTime(); // Initial check

        return () => clearInterval(interval);
    }, [tasks]);

    const clearEvent = () => setEvent(null);

    return {
        event,
        clearEvent
    };
};
