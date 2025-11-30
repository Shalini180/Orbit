import { useState, useEffect, useCallback } from 'react';
import { db } from '../lib/firebase';
import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    arrayUnion,
    arrayRemove,
    collection,
    query,
    where,
    getDocs,
    onSnapshot
} from 'firebase/firestore';

export const useFleet = (user) => {
    const [wing, setWing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Listen to user's wing status
    useEffect(() => {
        if (!user) return;

        const userRef = doc(db, 'users', user.uid);
        const unsubscribe = onSnapshot(userRef, async (docSnap) => {
            if (docSnap.exists()) {
                const userData = docSnap.data();
                if (userData.wingId) {
                    // If user has a wing, listen to the wing document
                    subscribeToWing(userData.wingId);
                } else {
                    setWing(null);
                }
            }
        });

        return () => unsubscribe();
    }, [user]);

    const subscribeToWing = (wingId) => {
        const wingRef = doc(db, 'wings', wingId);
        return onSnapshot(wingRef, (docSnap) => {
            if (docSnap.exists()) {
                setWing({ id: docSnap.id, ...docSnap.data() });
            }
        });
    };

    const createWing = async (wingName) => {
        if (!user) return;
        setLoading(true);
        setError(null);

        try {
            // Generate a 6-digit invite code
            const inviteCode = Math.floor(100000 + Math.random() * 900000).toString();

            const wingRef = doc(collection(db, 'wings'));
            const wingId = wingRef.id;

            const newWing = {
                name: wingName || `Squadron ${inviteCode.slice(0, 3)}`,
                commander: user.uid,
                inviteCode,
                members: [user.uid],
                createdAt: new Date().toISOString(),
                bounties: {
                    heavyLifts: 0,
                    target: 10
                }
            };

            await setDoc(wingRef, newWing);

            // Update user doc
            await updateDoc(doc(db, 'users', user.uid), {
                wingId: wingId
            });

        } catch (err) {
            console.error("Failed to create wing:", err);
            setError("Failed to initialize squadron.");
        } finally {
            setLoading(false);
        }
    };

    const joinWing = async (inviteCode) => {
        if (!user) return;
        setLoading(true);
        setError(null);

        try {
            // Find wing by invite code
            const wingsRef = collection(db, 'wings');
            const q = query(wingsRef, where("inviteCode", "==", inviteCode));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                throw new Error("Invalid Hailing Frequency.");
            }

            const wingDoc = querySnapshot.docs[0];
            const wingData = wingDoc.data();

            if (wingData.members.length >= 4) {
                throw new Error("Squadron is full.");
            }

            if (wingData.members.includes(user.uid)) {
                throw new Error("You are already in this squadron.");
            }

            // Add user to wing
            await updateDoc(doc(db, 'wings', wingDoc.id), {
                members: arrayUnion(user.uid)
            });

            // Update user doc
            await updateDoc(doc(db, 'users', user.uid), {
                wingId: wingDoc.id
            });

        } catch (err) {
            console.error("Failed to join wing:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const leaveWing = async () => {
        if (!user || !wing) return;
        setLoading(true);

        try {
            // Remove user from wing
            await updateDoc(doc(db, 'wings', wing.id), {
                members: arrayRemove(user.uid)
            });

            // Update user doc
            await updateDoc(doc(db, 'users', user.uid), {
                wingId: null
            });

            setWing(null);
        } catch (err) {
            console.error("Failed to leave wing:", err);
            setError("Failed to disengage from squadron.");
        } finally {
            setLoading(false);
        }
    };

    return {
        wing,
        loading,
        error,
        createWing,
        joinWing,
        leaveWing
    };
};
