import { useState, useEffect } from 'react';

export const useCurriculum = (isMatched) => {
    const [syllabus, setSyllabus] = useState([]); // Array of 3 habits
    const [buffs, setBuffs] = useState([]); // Active bonuses
    const [montageProgress, setMontageProgress] = useState(0); // 0-3 daily tasks

    // Load from local storage
    useEffect(() => {
        const saved = localStorage.getItem('orbitr_curriculum_v1');
        if (saved) {
            const parsed = JSON.parse(saved);
            setSyllabus(parsed.syllabus);
            setBuffs(parsed.buffs);
        } else if (isMatched) {
            // Default syllabus if matched but no save
            setSyllabus([
                { id: 'h1', text: 'Deep Work (1hr)', type: 'MIND' },
                { id: 'h2', text: 'No Distractions', type: 'SPIRIT' },
                { id: 'h3', text: 'Review Goals', type: 'MIND' }
            ]);
            setBuffs(['GUIDANCE_BONUS']); // +10% XP
        }
    }, [isMatched]);

    useEffect(() => {
        localStorage.setItem('orbitr_curriculum_v1', JSON.stringify({
            syllabus, buffs
        }));
    }, [syllabus, buffs]);

    const completeMontageTask = (taskId) => {
        setMontageProgress(prev => Math.min(prev + 1, 3));
    };

    const resetDailyMontage = () => {
        setMontageProgress(0);
    };

    return {
        syllabus,
        buffs,
        montageProgress,
        completeMontageTask,
        resetDailyMontage
    };
};
