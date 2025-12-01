import { useState, useEffect } from 'react';

export const useHeroLicense = () => {
    const [isPremium, setIsPremium] = useState(false);
    const [perks, setPerks] = useState([]);

    // Load state from local storage
    useEffect(() => {
        const saved = localStorage.getItem('orbitr_license_v1');
        if (saved) {
            const parsed = JSON.parse(saved);
            setIsPremium(parsed.isPremium);
            if (parsed.isPremium) {
                setPerks(['INFINITE_LONGBOX', '4K_EXPORT', 'PRISMATIC_DYE', 'GOLDEN_SIDEKICK']);
            }
        }
    }, []);

    // Save state to local storage
    useEffect(() => {
        localStorage.setItem('orbitr_license_v1', JSON.stringify({
            isPremium
        }));
    }, [isPremium]);

    const upgrade = () => {
        // Mock payment processing
        return new Promise((resolve) => {
            setTimeout(() => {
                setIsPremium(true);
                setPerks(['INFINITE_LONGBOX', '4K_EXPORT', 'PRISMATIC_DYE', 'GOLDEN_SIDEKICK']);
                resolve(true);
            }, 1500);
        });
    };

    const cancel = () => {
        setIsPremium(false);
        setPerks([]); // In a real app, we might keep some perks if they were "bought" permanently
    };

    const checkPerk = (perkId) => {
        return perks.includes(perkId);
    };

    return {
        isPremium,
        perks,
        upgrade,
        cancel,
        checkPerk
    };
};
