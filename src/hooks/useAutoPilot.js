import { useState, useCallback } from 'react';

export const useAutoPilot = ({
    addXP,
    setShowArmory,
    setShowTerminal,
    setShowJournal,
    completeTask,
    showToast
}) => {
    const [isActive, setIsActive] = useState(false);

    const startDemo = useCallback(() => {
        if (isActive) return;
        setIsActive(true);

        // Sequence of events
        const sequence = [
            {
                delay: 0,
                action: () => showToast('AUTO-PILOT ENGAGED: INITIATING FLIGHT CHECK')
            },
            {
                delay: 1500,
                action: () => {
                    showToast('SIMULATING TASK COMPLETION...');
                    completeTask(); // Completes a task if available
                }
            },
            {
                delay: 3000,
                action: () => {
                    addXP(100);
                    showToast('XP GAIN REGISTERED');
                }
            },
            {
                delay: 4500,
                action: () => {
                    setShowArmory(true);
                    showToast('OPENING ARMORY: THEME SELECTION');
                }
            },
            {
                delay: 7000,
                action: () => {
                    setShowArmory(false);
                    setShowJournal(true);
                    showToast('ACCESSING CAPTAIN\'S LOG');
                }
            },
            {
                delay: 10000,
                action: () => {
                    setShowJournal(false);
                    setShowTerminal(true);
                    showToast('ANALYZING FLIGHT DATA');
                }
            },
            {
                delay: 14000,
                action: () => {
                    setShowTerminal(false);
                    showToast('SIMULATION COMPLETE. SYSTEMS NOMINAL.');
                    setIsActive(false);
                }
            }
        ];

        // Execute sequence
        sequence.forEach(({ delay, action }) => {
            setTimeout(action, delay);
        });

    }, [isActive, addXP, setShowArmory, setShowTerminal, setShowJournal, completeTask, showToast]);

    return {
        isActive,
        startDemo
    };
};
