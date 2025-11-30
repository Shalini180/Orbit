import { useState, useCallback, useRef, useEffect } from 'react';

// Sound assets (using placeholder URLs or base64 if real assets aren't available, 
// but for now we'll assume we might need to use synthesized sounds or external URLs)
// Since I cannot download files easily, I will use the Web Audio API to synthesize simple sounds
// for a true "no-dependency" experience, or use public URLs if permitted.
// Given the constraints, I'll use a simple Oscillator-based synthesizer for now to ensure it works without assets.

export const useAudioSystem = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const audioContextRef = useRef(null);

    useEffect(() => {
        if (isEnabled && !audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }
    }, [isEnabled]);

    const playTone = (freq, type, duration, vol = 0.1) => {
        if (!isEnabled || !audioContextRef.current) return;

        const ctx = audioContextRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(vol, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + duration);
    };

    const playHover = useCallback(() => {
        // Subtle high tick
        playTone(800, 'sine', 0.05, 0.05);
    }, [isEnabled]);

    const playComplete = useCallback(() => {
        // Mechanical latch: two quick tones
        if (!isEnabled || !audioContextRef.current) return;
        const ctx = audioContextRef.current;
        const now = ctx.currentTime;

        // Tone 1
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.frequency.setValueAtTime(440, now);
        gain1.gain.setValueAtTime(0.1, now);
        gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.start(now);
        osc1.stop(now + 0.1);

        // Tone 2
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.frequency.setValueAtTime(880, now + 0.1);
        gain2.gain.setValueAtTime(0.1, now + 0.1);
        gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(now + 0.1);
        osc2.stop(now + 0.3);
    }, [isEnabled]);

    const playWarp = useCallback(() => {
        // Deep bass swell
        if (!isEnabled || !audioContextRef.current) return;
        const ctx = audioContextRef.current;
        const now = ctx.currentTime;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(50, now);
        osc.frequency.exponentialRampToValueAtTime(100, now + 2);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.2, now + 1);
        gain.gain.linearRampToValueAtTime(0, now + 3);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 3);
    }, [isEnabled]);

    const playLevelUp = useCallback(() => {
        // Triumphant chord
        if (!isEnabled || !audioContextRef.current) return;
        const ctx = audioContextRef.current;
        const now = ctx.currentTime;

        [440, 554, 659, 880].forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + i * 0.1);
            gain.gain.setValueAtTime(0.1, now + i * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 1.5);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + i * 0.1);
            osc.stop(now + 1.5);
        });
    }, [isEnabled]);

    return {
        isEnabled,
        toggleAudio: () => setIsEnabled(prev => !prev),
        playHover,
        playComplete,
        playWarp,
        playLevelUp
    };
};
