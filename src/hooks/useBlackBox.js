import { useCallback } from 'react';

export const useBlackBox = () => {
    const exportData = useCallback(() => {
        const data = {
            core: JSON.parse(localStorage.getItem('orbitr_core_state_v1') || '{}'),
            xp: JSON.parse(localStorage.getItem('orbitr_xp_v1') || '{}'),
            history: JSON.parse(localStorage.getItem('orbitr_history_v1') || '{}'),
            theme: localStorage.getItem('orbitr_theme') || 'VOID',
            timestamp: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `orbitr_backup_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, []);

    const importData = useCallback((file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);

                    if (data.core) localStorage.setItem('orbitr_core_state_v1', JSON.stringify(data.core));
                    if (data.xp) localStorage.setItem('orbitr_xp_v1', JSON.stringify(data.xp));
                    if (data.history) localStorage.setItem('orbitr_history_v1', JSON.stringify(data.history));
                    if (data.theme) localStorage.setItem('orbitr_theme', data.theme);

                    resolve(true);
                } catch (err) {
                    reject(err);
                }
            };
            reader.readAsText(file);
        });
    }, []);

    const hardReset = useCallback(() => {
        localStorage.removeItem('orbitr_core_state_v1');
        localStorage.removeItem('orbitr_xp_v1');
        localStorage.removeItem('orbitr_history_v1');
        localStorage.removeItem('orbitr_theme');
        window.location.reload();
    }, []);

    return {
        exportData,
        importData,
        hardReset
    };
};
