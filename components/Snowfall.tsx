import React, { useEffect, useRef } from 'react';

const Snowfall: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const snowflakes: { x: number; y: number; r: number; d: number; color: string }[] = [];
    const colors = ['#FFCDD2', '#EF9A9A', '#E57373', '#D32F2F', '#FFFFFF']; // Pinks and Reds and White

    for (let i = 0; i < 50; i++) {
      snowflakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 4 + 1,
        d: Math.random() * 50,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      for (let i = 0; i < 50; i++) {
        const p = snowflakes[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
        ctx.fillStyle = p.color;
        ctx.fill();
      }
      update();
      requestAnimationFrame(draw);
    };

    let angle = 0;
    const update = () => {
      angle += 0.01;
      for (let i = 0; i < 50; i++) {
        const p = snowflakes[i];
        p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
        p.x += Math.sin(angle) * 2;

        if (p.x > width + 5 || p.x < -5 || p.y > height) {
          if (i % 3 > 0) {
            snowflakes[i] = { x: Math.random() * width, y: -10, r: p.r, d: p.d, color: p.color };
          } else {
            if (Math.sin(angle) > 0) {
              snowflakes[i] = { x: -5, y: Math.random() * height, r: p.r, d: p.d, color: p.color };
            } else {
              snowflakes[i] = { x: width + 5, y: Math.random() * height, r: p.r, d: p.d, color: p.color };
            }
          }
        }
      }
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    const animationId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-60"
    />
  );
};

export default Snowfall;
