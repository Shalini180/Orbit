import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const StarfieldCanvas = ({ velocity = 1 }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            const particleCount = Math.floor((canvas.width * canvas.height) / 4000);

            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    z: Math.random() * 2 + 0.5, // Depth/Size
                    speed: Math.random() * 0.5 + 0.1
                });
            }
        };

        const draw = () => {
            // Clear with trail effect for warp speed
            ctx.fillStyle = velocity > 5 ? 'rgba(15, 23, 42, 0.3)' : 'rgba(15, 23, 42, 1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#ffffff';

            particles.forEach(p => {
                // Update position
                p.x -= p.speed * velocity;

                // Reset if off screen
                if (p.x < 0) {
                    p.x = canvas.width;
                    p.y = Math.random() * canvas.height;
                }

                // Draw
                const size = p.z;

                if (velocity > 5) {
                    // Warp lines
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(0.8, p.speed)})`;
                    ctx.lineWidth = size;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p.x + (velocity * 5 * p.speed), p.y);
                    ctx.stroke();
                } else {
                    // Normal stars
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        draw();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [velocity]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
            style={{ background: '#0f172a' }}
        />
    );
};

StarfieldCanvas.propTypes = {
    velocity: PropTypes.number
};

export default StarfieldCanvas;
