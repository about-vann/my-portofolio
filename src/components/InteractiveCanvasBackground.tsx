import React, { useEffect, useRef } from 'react';
import { ThemeAccent, BackgroundMode } from '../types';

interface Props {
  accent: ThemeAccent;
  bgMode: BackgroundMode;
}

export const InteractiveCanvasBackground: React.FC<Props> = ({ accent, bgMode }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (bgMode === 'off') {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const getAccentRGB = (theme: ThemeAccent) => {
      switch (theme) {
        case 'violet':
          return { r: 168, g: 85, b: 247, hex: '#a855f7' };
        case 'emerald':
          return { r: 16, g: 185, b: 129, hex: '#10b981' };
        case 'amber':
          return { r: 245, g: 158, b: 11, hex: '#f59e0b' };
        case 'cyan':
        default:
          return { r: 6, g: 182, b: 212, hex: '#06b6d4' };
      }
    };

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    let tick = 0;

    // --- MODE 1: PARTICLES / MESH ---
    const particleCount = Math.min(Math.floor((width * height) / 18000), 65);
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      pulseSpeed: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.8 + 0.8,
        alpha: Math.random() * 0.5 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.005,
      });
    }

    // --- MODE 2: MATRIX CODE RAIN ---
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const matrixDrops: number[] = [];
    const matrixChars = '0123456789ABCDEF<>{}/*+=~$_[];:IGNMASVIKK';
    for (let i = 0; i < columns; i++) {
      matrixDrops[i] = Math.floor(Math.random() * -100);
    }

    // --- MODE 3: DEEP STARS ---
    const starCount = Math.min(Math.floor((width * height) / 8000), 160);
    const stars: Array<{
      x: number;
      y: number;
      z: number;
      size: number;
      brightness: number;
      blinkSpeed: number;
    }> = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 2 + 0.5,
        size: Math.random() * 1.6 + 0.4,
        brightness: Math.random() * 0.7 + 0.3,
        blinkSpeed: Math.random() * 0.03 + 0.005,
      });
    }

    const render = () => {
      tick++;
      const color = getAccentRGB(accent);

      if (bgMode === 'matrix') {
        ctx.fillStyle = 'rgba(5, 5, 5, 0.12)';
        ctx.fillRect(0, 0, width, height);
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < matrixDrops.length; i++) {
          const char = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
          const x = i * fontSize;
          const y = matrixDrops[i] * fontSize;

          const isHead = Math.random() > 0.85;
          ctx.fillStyle = isHead ? '#ffffff' : `rgba(${color.r}, ${color.g}, ${color.b}, 0.85)`;
          ctx.fillText(char, x, y);

          if (y > height && Math.random() > 0.975) {
            matrixDrops[i] = 0;
          }
          matrixDrops[i]++;
        }
      } else if (bgMode === 'stars') {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < stars.length; i++) {
          const s = stars[i];
          const blink = s.brightness + Math.sin(tick * s.blinkSpeed) * 0.25;
          
          // Subtle mouse parallax
          const dxMouse = (mouseX - width / 2) * 0.005 * s.z;
          const dyMouse = (mouseY - height / 2) * 0.005 * s.z;

          ctx.beginPath();
          ctx.arc(s.x + dxMouse, s.y + dyMouse, s.size, 0, Math.PI * 2);
          ctx.fillStyle = i % 4 === 0 
            ? `rgba(${color.r}, ${color.g}, ${color.b}, ${Math.max(0.1, Math.min(1, blink))})`
            : `rgba(255, 255, 255, ${Math.max(0.1, Math.min(1, blink * 0.8))})`;
          ctx.fill();
        }
      } else if (bgMode === 'grid') {
        ctx.clearRect(0, 0, width, height);
        const gridSize = 48;
        const offset = (tick * 0.4) % gridSize;

        ctx.lineWidth = 0.5;
        ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.12)`;

        // Vertical lines
        for (let x = 0; x < width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }

        // Horizontal moving lines
        for (let y = offset; y < height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      } else if (bgMode === 'particles') {
        // Standard Particles & Mesh
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
          const p1 = particles[i];

          p1.x += p1.vx;
          p1.y += p1.vy;

          if (p1.x < 0 || p1.x > width) p1.vx *= -1;
          if (p1.y < 0 || p1.y > height) p1.vy *= -1;

          const dxMouse = p1.x - mouseX;
          const dyMouse = p1.y - mouseY;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
          if (distMouse < 120 && distMouse > 0) {
            const force = (120 - distMouse) / 120;
            p1.x += (dxMouse / distMouse) * force * 1.2;
            p1.y += (dyMouse / distMouse) * force * 1.2;
          }

          const currentAlpha = p1.alpha + Math.sin(tick * p1.pulseSpeed) * 0.15;
          ctx.beginPath();
          ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${Math.max(0.1, currentAlpha)})`;
          ctx.fill();

          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 130) {
              const lineAlpha = (1 - dist / 130) * 0.14;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${lineAlpha})`;
              ctx.lineWidth = 0.75;
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [accent, bgMode]);

  if (bgMode === 'off') {
    return null;
  }

  return (
    <div id="ambient-canvas-wrapper" className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="block w-full h-full opacity-60" />
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] pointer-events-none opacity-10 blur-[140px] transition-colors duration-700"
        style={{
          background: 
            accent === 'cyan' ? '#06b6d4' :
            accent === 'violet' ? '#a855f7' :
            accent === 'emerald' ? '#10b981' : '#f59e0b'
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />
    </div>
  );
};
