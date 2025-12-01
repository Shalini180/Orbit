import React from 'react';

const CoverArt = ({ issue, onClick }) => {
    // Generate a deterministic color based on the date string
    const getColor = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
        return '#' + '00000'.substring(0, 6 - c.length) + c;
    };

    const bgBase = getColor(issue.date);

    return (
        <div
            onClick={onClick}
            className="relative aspect-[2/3] bg-slate-800 rounded-sm shadow-lg cursor-pointer hover:scale-105 transition-transform overflow-hidden border-l-4 border-white/10 group"
        >
            {/* Background Art */}
            <div
                className="absolute inset-0 opacity-50"
                style={{ backgroundColor: bgBase }}
            ></div>

            {/* Title */}
            <div className="absolute top-0 left-0 right-0 p-2">
                <h3 className="text-white font-black text-2xl italic leading-none drop-shadow-md uppercase break-words">
                    {issue.title}
                </h3>
            </div>

            {/* Hero Image (Placeholder) */}
            <div className="absolute bottom-0 right-0 text-8xl opacity-80 transform translate-x-4 translate-y-4 group-hover:scale-110 transition-transform">
                🦸
            </div>

            {/* Price Tag / Date */}
            <div className="absolute bottom-2 left-2 bg-white text-black text-xs font-bold px-1 border border-black transform -rotate-2">
                {issue.date}
            </div>

            {/* Barcode */}
            <div className="absolute top-2 right-2 bg-white p-0.5">
                <div className="w-8 h-4 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/UPC-A-036000291452.svg/1200px-UPC-A-036000291452.svg.png')] bg-cover opacity-80"></div>
            </div>
        </div>
    );
};

export default CoverArt;
