import { useState, useCallback } from 'react';

// Simulation Mode Responses
const SIMULATION_RESPONSES = {
    DEFAULT: "Awaiting input, Commander. Systems nominal.",
    THINKING: "Processing... Calculating optimal trajectory...",
    QUEST_GEN: (goal) => ({
        heavyLift: `Master ${goal}`,
        thrusters: [
            `Research ${goal} basics`,
            `Setup ${goal} environment`,
            `Build a 'Hello World' in ${goal}`
        ]
    }),
    INTERVENTION: "Commander, efficiency is dropping. Rerouting power to auxiliary systems. Suggest breaking down current objective.",
    WEEKLY_REVIEW: `
    TACTICAL BRIEFING: WEEK 42
    --------------------------
    EFFICIENCY: 87%
    STREAK: STABLE
    
    ADVISORY:
    Morning performance is optimal.
    Suggest scheduling Heavy Lifts
    prior to 1000 hours.
    
    STATUS: GREEN
  `
};

export const useCortex = (history, setHeavyLift, setThruster) => {
    const [status, setStatus] = useState('IDLE'); // IDLE, THINKING, SPEAKING
    const [message, setMessage] = useState(SIMULATION_RESPONSES.DEFAULT);
    const [showBriefing, setShowBriefing] = useState(false);

    const processInput = useCallback(async (input) => {
        setStatus('THINKING');
        setMessage(SIMULATION_RESPONSES.THINKING);

        // Simulate API latency
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Simple keyword matching for simulation
        if (input.toLowerCase().includes('generate') || input.toLowerCase().includes('plan')) {
            const goal = input.replace(/generate|plan/i, '').trim() || "New Skill";
            const mission = SIMULATION_RESPONSES.QUEST_GEN(goal);

            setHeavyLift({ text: mission.heavyLift, completed: false });
            setThruster(1, { text: mission.thrusters[0], completed: false });
            setThruster(2, { text: mission.thrusters[1], completed: false });
            setThruster(3, { text: mission.thrusters[2], completed: false });

            setMessage(`Mission parameters updated for: ${goal}. Engage when ready.`);
        } else if (input.toLowerCase().includes('status') || input.toLowerCase().includes('report')) {
            setShowBriefing(true);
            setMessage("Displaying tactical briefing.");
        } else {
            setMessage(`Acknowledged. Logging entry: "${input}"`);
        }

        setStatus('SPEAKING');
        setTimeout(() => setStatus('IDLE'), 3000);
    }, [setHeavyLift, setThruster]);

    const triggerIntervention = useCallback(() => {
        setStatus('SPEAKING');
        setMessage(SIMULATION_RESPONSES.INTERVENTION);
        // In a real app, this would trigger a glitch effect
    }, []);

    // Check for slump (Adaptive Difficulty)
    // This would normally run on mount or when history updates
    const checkEfficiency = useCallback(() => {
        // Mock logic: if last 3 days have 0 completed tasks
        // For now, we just expose the function to be called manually
        console.log("Cortex: Analyzing efficiency...");
    }, []);

    return {
        status,
        message,
        processInput,
        triggerIntervention,
        checkEfficiency,
        showBriefing,
        setShowBriefing,
        weeklyReview: SIMULATION_RESPONSES.WEEKLY_REVIEW
    };
};
