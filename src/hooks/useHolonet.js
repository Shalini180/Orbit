import { useState, useEffect, useCallback } from 'react';
import { auth, db } from '../lib/firebase';
import {
    signInAnonymously,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    linkWithPopup
} from 'firebase/auth';
import {
    doc,
    onSnapshot,
    setDoc,
    getDoc,
    serverTimestamp
} from 'firebase/firestore';

export const useHolonet = (localState, setLocalState) => {
    const [user, setUser] = useState(null);
    const [status, setStatus] = useState('OFFLINE'); // OFFLINE, SYNCED, ERROR
    const [isAnonymous, setIsAnonymous] = useState(true);

    // Initialize Auth
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                setIsAnonymous(currentUser.isAnonymous);
                setStatus('SYNCED');
            } else {
                setStatus('OFFLINE');
            }
        });
        return () => unsubscribe();
    }, []);

    // Sync Data (Listen to Cloud)
    useEffect(() => {
        if (!user) return;

        const userRef = doc(db, 'users', user.uid);

        // Initial fetch to see if cloud data exists
        getDoc(userRef).then((docSnap) => {
            if (docSnap.exists()) {
                // Cloud data exists, merge with local or overwrite?
                // For now, let's trust cloud if it's newer, but this is complex.
                // Simple strategy: If cloud exists, take it.
                const data = docSnap.data();
                // We would need a way to update the parent state here.
                // This hook might need to be more integrated or expose a "cloudData" object.
            } else {
                // No cloud data, upload local
                syncToCloud(localState);
            }
        });

        const unsubscribe = onSnapshot(userRef, (doc) => {
            if (doc.exists()) {
                const data = doc.data();
                // Check timestamps to avoid loops? 
                // For this MVP, we might just expose the data and let the app decide.
                // Or better, we just sync OUT for now, and only sync IN on load.
            }
        }, (error) => {
            console.error("Holonet Link Severed:", error);
            setStatus('ERROR');
        });

        return () => unsubscribe();
    }, [user]);

    const establishUplink = async () => {
        try {
            await signInAnonymously(auth);
        } catch (error) {
            console.error("Uplink Failed:", error);
            setStatus('ERROR');
        }
    };

    const linkIdentity = async () => {
        if (!user) return;
        const provider = new GoogleAuthProvider();
        try {
            await linkWithPopup(user, provider);
            setIsAnonymous(false);
        } catch (error) {
            console.error("Identity Link Failed:", error);
        }
    };

    const syncToCloud = useCallback(async (data) => {
        if (!user) return;

        try {
            const userRef = doc(db, 'users', user.uid);
            await setDoc(userRef, {
                ...data,
                lastUpdated: serverTimestamp()
            }, { merge: true });
            setStatus('SYNCED');
        } catch (error) {
            console.error("Transmission Failed:", error);
            setStatus('ERROR');
        }
    }, [user]);

    return {
        user,
        status,
        isAnonymous,
        establishUplink,
        linkIdentity,
        syncToCloud
    };
};
