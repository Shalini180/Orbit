import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const ConsistencyGraph = () => {
    const [offset, setOffset] = useState(0); // 0 = current, 1 = previous month, etc.

    // Mock Data Generator based on offset
    const generateData = (monthOffset) => {
        const data = [];
        const today = new Date();
        today.setMonth(today.getMonth() - monthOffset);

        for (let i = 30; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(d.getDate() - i);

            // Random consistency for demo
            const val = Math.floor(Math.random() * 100);
            data.push({
                name: d.getDate(),
                value: val,
                target: 80
            });
        }
        return data;
    };

    const data = generateData(offset);

    return (
        <div className="w-full h-64 bg-slate-900/50 rounded-lg p-4 border border-slate-800">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase">Consistency Vector</h3>
                <div className="flex gap-2 text-xs">
                    <button
                        onClick={() => setOffset(o => o + 1)}
                        className="text-slate-500 hover:text-cyan-400"
                    >
                        {'< PREV'}
                    </button>
                    <span className="text-cyan-500 font-mono">
                        {offset === 0 ? 'CURRENT' : `-${offset} MONTHS`}
                    </span>
                    <button
                        onClick={() => setOffset(o => Math.max(0, o - 1))}
                        className={`text-slate-500 hover:text-cyan-400 ${offset === 0 ? 'opacity-30 pointer-events-none' : ''}`}
                    >
                        {'NEXT >'}
                    </button>
                </div>
            </div>

            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={10} />
                    <YAxis stroke="#64748b" fontSize={10} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }}
                        itemStyle={{ color: '#10b981' }}
                    />
                    <ReferenceLine y={80} stroke="#f59e0b" strokeDasharray="3 3" />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#10b981"
                        fillOpacity={1}
                        fill="url(#colorValue)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ConsistencyGraph;
