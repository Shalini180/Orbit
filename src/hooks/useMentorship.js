import { useState, useEffect } from 'react';

const MOCK_MENTORS = [
    { id: 'm1', name: 'Professor X', level: 65, archetype: 'MIND', bio: 'Master of the mind. Focus is key.', avatar: { color: '#3b82f6', shape: 'circle' } },
    { id: 'm2', name: 'Logan', level: 72, archetype: 'MIGHT', bio: 'Bub. Do the work.', avatar: { color: '#eab308', shape: 'square' } },
    { id: 'm3', name: 'Storm', level: 58, archetype: 'SPIRIT', bio: 'Weather the storm. Find peace.', avatar: { color: '#a855f7', shape: 'triangle' } },
];

const MOCK_CADETS = [
    { id: 'c1', name: 'Newbie Nate', level: 3, archetype: 'MIGHT', bio: 'I want to get strong!', avatar: { color: '#ef4444', shape: 'square' } },
    { id: 'c2', name: 'Green Gary', level: 5, archetype: 'SPEED', bio: 'Gotta go fast!', avatar: { color: '#22c55e', shape: 'circle' } },
];

export const useMentorship = (userLevel, userArchetype) => {
    const [status, setStatus] = useState('IDLE'); // IDLE, SEARCHING, MATCHED, GRADUATED
    const [role, setRole] = useState(userLevel >= 50 ? 'MENTOR' : 'CADET');
    const [partner, setPartner] = useState(null);
    const [progress, setProgress] = useState(0); // Days completed (0-14)
    const [strikes, setStrikes] = useState(0);
    const [oathSigned, setOathSigned] = useState(false);

    // Load state from local storage
    useEffect(() => {
        const saved = localStorage.getItem('orbitr_academy_v1');
        if (saved) {
            const parsed = JSON.parse(saved);
            setStatus(parsed.status);
            setRole(parsed.role);
            setPartner(parsed.partner);
            setProgress(parsed.progress);
            setStrikes(parsed.strikes);
            setOathSigned(parsed.oathSigned);
        } else {
            // Auto-detect role if not saved
            setRole(userLevel >= 50 ? 'MENTOR' : 'CADET');
        }
    }, [userLevel]);

    // Save state to local storage
    useEffect(() => {
        localStorage.setItem('orbitr_academy_v1', JSON.stringify({
            status, role, partner, progress, strikes, oathSigned
        }));
    }, [status, role, partner, progress, strikes, oathSigned]);

    const findMatch = () => {
        setStatus('SEARCHING');

        // Simulate API delay
        setTimeout(() => {
            if (role === 'CADET') {
                // Find a mentor with matching archetype if possible, else random
                const match = MOCK_MENTORS.find(m => m.archetype === userArchetype) || MOCK_MENTORS[0];
                setPartner(match);
            } else {
                const match = MOCK_CADETS[0]; // Just pick first for now
                setPartner(match);
            }
            setStatus('MATCHED');
        }, 2000);
    };

    const signOath = () => {
        setOathSigned(true);
    };

    const checkProgress = (dailyTasksCompleted) => {
        if (!oathSigned) return;

        // Logic: Both must complete tasks. For now, we assume partner always completes theirs if user does.
        if (dailyTasksCompleted) {
            setProgress(prev => {
                const newProgress = prev + 1;
                if (newProgress >= 14) {
                    graduate();
                }
                return newProgress;
            });
        } else {
            // Strike system? Maybe too harsh for MVP, let's just not advance progress.
            // setStrikes(prev => prev + 1);
        }
    };

    const graduate = () => {
        setStatus('GRADUATED');
        // Trigger rewards in UI
    };

    const leaveAcademy = () => {
        setStatus('IDLE');
        setPartner(null);
        setProgress(0);
        setStrikes(0);
        setOathSigned(false);
        localStorage.removeItem('orbitr_academy_v1');
    };

    return {
        status,
        role,
        partner,
        progress,
        strikes,
        oathSigned,
        findMatch,
        signOath,
        checkProgress,
        graduate,
        leaveAcademy
    };
};
