import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import {
    doc,
    updateDoc,
    onSnapshot,
    collection,
    query,
    where
} from 'firebase/firestore';

export const useRadar = (user, wing) => {
    const [squadStatus, setSquadStatus] = useState([]);

    // Broadcast own status
    const updateStatus = async (status) => {
        if (!user) return;
        try {
            await updateDoc(doc(db, 'users', user.uid), {
                status: status,
                lastActive: new Date().toISOString()
            });
        } catch (err) {
            console.error("Failed to broadcast status:", err);
        }
    };

    // Listen to squad status
    useEffect(() => {
        if (!user || !wing) {
            setSquadStatus([]);
            return;
        }

        // In a real app, we would query users where wingId == wing.id
        // For now, let's just listen to the specific users in the wing
        const squadMembers = wing.members.filter(uid => uid !== user.uid);

        if (squadMembers.length === 0) {
            setSquadStatus([]);
            return;
        }

        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('wingId', '==', wing.id));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const statuses = [];
            snapshot.forEach((doc) => {
                if (doc.id !== user.uid) {
                    statuses.push({
                        uid: doc.id,
                        ...doc.data()
                    });
                }
            });
            setSquadStatus(statuses);
        });

        return () => unsubscribe();
    }, [user, wing]);

    return {
        squadStatus,
        updateStatus
    };
};
