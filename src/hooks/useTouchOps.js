import { useState, useEffect, useCallback } from 'react';

export const useTouchOps = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(navigator.maxTouchPoints > 0 || window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const vibrate = useCallback((pattern) => {
        if (navigator.vibrate) {
            navigator.vibrate(pattern);
        }
    }, []);

    const handleTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = (onSwipeLeft, onSwipeRight) => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe && onSwipeLeft) {
            vibrate(10);
            onSwipeLeft();
        }

        if (isRightSwipe && onSwipeRight) {
            vibrate([10, 50, 10]); // Success pattern
            onSwipeRight();
        }
    };

    return {
        isMobile,
        vibrate,
        bindGestures: (onSwipeLeft, onSwipeRight) => ({
            onTouchStart: handleTouchStart,
            onTouchMove: handleTouchMove,
            onTouchEnd: () => handleTouchEnd(onSwipeLeft, onSwipeRight)
        })
    };
};
