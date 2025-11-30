import { useMemo } from 'react';

export const useWarpDrive = (engineState) => {
    const velocity = useMemo(() => {
        if (engineState.status === 'WARP') {
            return 10; // Warp speed
        }
        return 1; // Normal drifting
    }, [engineState.status]);

    return velocity;
};
