import { useState, useEffect } from 'react';

export const useEconomy = (walletBalance, setWalletBalance) => {
    const [bankBalance, setBankBalance] = useState(0);
    const [interestRate, setInterestRate] = useState(0.01); // 1% weekly
    const [lastInterestDate, setLastInterestDate] = useState(Date.now());

    // Load state from local storage
    useEffect(() => {
        const saved = localStorage.getItem('orbitr_economy_v1');
        if (saved) {
            const parsed = JSON.parse(saved);
            setBankBalance(parsed.bankBalance);
            setLastInterestDate(parsed.lastInterestDate);
        }
    }, []);

    // Save state to local storage
    useEffect(() => {
        localStorage.setItem('orbitr_economy_v1', JSON.stringify({
            bankBalance,
            lastInterestDate
        }));
    }, [bankBalance, lastInterestDate]);

    const deposit = (amount) => {
        if (amount <= 0 || amount > walletBalance) return false;
        setWalletBalance(prev => prev - amount);
        setBankBalance(prev => prev + amount);
        return true;
    };

    const withdraw = (amount) => {
        if (amount <= 0 || amount > bankBalance) return false;
        setBankBalance(prev => prev - amount);
        setWalletBalance(prev => prev + amount);
        return true;
    };

    const collectInterest = () => {
        const now = Date.now();
        const oneWeek = 7 * 24 * 60 * 60 * 1000;

        if (now - lastInterestDate >= oneWeek) {
            const interest = Math.floor(bankBalance * interestRate);
            if (interest > 0) {
                setBankBalance(prev => prev + interest);
                setLastInterestDate(now);
                return interest;
            }
        }
        return 0;
    };

    // Inflation Control: Decay logic would go here (e.g., check wallet > 10k)
    const checkDecay = () => {
        if (walletBalance > 10000) {
            return {
                warning: true,
                amountAtRisk: Math.floor(walletBalance * 0.05)
            };
        }
        return { warning: false, amountAtRisk: 0 };
    };

    return {
        bankBalance,
        interestRate,
        deposit,
        withdraw,
        collectInterest,
        checkDecay
    };
};
