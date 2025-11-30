import { useState, useEffect, useRef, useCallback } from 'react';

const MODES = {
    FOCUS: 'FOCUS',
    COOLDOWN: 'COOLDOWN'
};

const CYCLES = {
    STANDARD: { focus: 25 * 60, cooldown: 5 * 60 },
    DEEP_SPACE: { focus: 50 * 60, cooldown: 10 * 60 }
};

export const useHyperdrive = (onComplete) => {
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState(MODES.FOCUS);
    const [cycleType, setCycleType] = useState('STANDARD');
    const [timeLeft, setTimeLeft] = useState(CYCLES.STANDARD.focus);

    const endTimeRef = useRef(null);
    const rafRef = useRef(null);

    const startHyperdrive = useCallback(() => {
        if (!isActive) {
            setIsActive(true);
            // Calculate expected end time based on current timeLeft
            endTimeRef.current = Date.now() + timeLeft * 1000;

            const tick = () => {
                const now = Date.now();
                const remaining = Math.ceil((endTimeRef.current - now) / 1000);

                if (remaining <= 0) {
                    setTimeLeft(0);
                    setIsActive(false);
                    handleComplete();
                } else {
                    setTimeLeft(remaining);
                    rafRef.current = requestAnimationFrame(tick);
                }
            };

            rafRef.current = requestAnimationFrame(tick);
        }
    }, [isActive, timeLeft]);

    const pauseHyperdrive = useCallback(() => {
        if (isActive) {
            setIsActive(false);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        }
    }, [isActive]);

    const stopHyperdrive = useCallback(() => {
        setIsActive(false);
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
        }
        resetTimer();
    }, [cycleType, mode]);

    const resetTimer = useCallback(() => {
        const duration = CYCLES[cycleType][mode.toLowerCase()];
        setTimeLeft(duration);
    }, [cycleType, mode]);

    const handleComplete = () => {
        // Play sound or trigger callback
        if (onComplete) onComplete(mode);

        // Switch modes automatically or wait? For now, let's just switch and wait.
        if (mode === MODES.FOCUS) {
            setMode(MODES.COOLDOWN);
            setTimeLeft(CYCLES[cycleType].cooldown);
        } else {
            setMode(MODES.FOCUS);
            setTimeLeft(CYCLES[cycleType].focus);
        }
    };

    const toggleCycleType = () => {
        if (!isActive) {
            const newType = cycleType === 'STANDARD' ? 'DEEP_SPACE' : 'STANDARD';
            setCycleType(newType);
            setTimeLeft(CYCLES[newType][mode.toLowerCase()]);
        }
    };

    // Cleanup
    useEffect(() => {
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return {
        isActive,
        mode,
        cycleType,
        timeLeft,
        progress: 1 - (timeLeft / CYCLES[cycleType][mode.toLowerCase()]),
        actions: {
            start: startHyperdrive,
            pause: pauseHyperdrive,
            stop: stopHyperdrive,
            toggleCycle: toggleCycleType
        }
    };
};
