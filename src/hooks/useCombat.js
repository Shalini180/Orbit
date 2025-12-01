import { useState, useCallback } from 'react';

export const useCombat = (damageVillain, addXP, showToast) => {
    const [combo, setCombo] = useState(0);
    const [lastHitTime, setLastHitTime] = useState(0);

    const registerHit = useCallback((type) => {
        const now = Date.now();
        let damage = 0;
        let isCritical = false;

        // Combo Logic: Hits within 5 minutes keep the combo alive
        if (now - lastHitTime < 5 * 60 * 1000) {
            setCombo(c => c + 1);
        } else {
            setCombo(1);
        }
        setLastHitTime(now);

        // Damage Calculation
        switch (type) {
            case 'HEAVY_LIFT':
                damage = 25;
                break;
            case 'THRUSTER':
                damage = 10;
                break;
            case 'RESIST':
                damage = 5;
                break;
            default:
                damage = 5;
        }

        // Critical Hit on Combo > 3
        if (combo >= 3) {
            damage *= 2;
            isCritical = true;
            showToast('COMBO BREAKER! CRITICAL HIT!');
        }

        damageVillain(damage);

        return { damage, isCritical, combo };
    }, [damageVillain, combo, lastHitTime, showToast]);

    return {
        registerHit,
        combo
    };
};
