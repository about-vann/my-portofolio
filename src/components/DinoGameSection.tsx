import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gamepad2, 
  Trophy, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Play, 
  Flame, 
  Sparkles,
  ArrowUp,
  ArrowDown,
  Zap,
  ShieldAlert
} from 'lucide-react';
import { ThemeAccent, Language } from '../types';

interface DinoGameSectionProps {
  accent: ThemeAccent;
  lang: Language;
}

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'cactus_small' | 'cactus_large' | 'cactus_double' | 'drone_low' | 'drone_high';
  passed?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
}

export const DinoGameSection: React.FC<DinoGameSectionProps> = ({ accent, lang }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Game states
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);

  // Audio Context synth
  const audioCtxRef = useRef<AudioContext | null>(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        audioCtxRef.current = new AudioContextClass();
      }
    }
  };

  const playSynthSound = (type: 'jump' | 'score' | 'gameover') => {
    if (!soundEnabled) return;
    try {
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx || ctx.state === 'suspended') {
        ctx?.resume();
      }
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'jump') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.12);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'score') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now);
        osc.frequency.setValueAtTime(880, now + 0.08);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'gameover') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(60, now + 0.35);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      }
    } catch {
      // Ignore audio synthesis errors on auto-play restrictions
    }
  };

  // Game Engine Internal Variables
  const stateRef = useRef({
    dino: {
      x: 60,
      y: 0,
      width: 44,
      height: 48,
      vy: 0,
      isGrounded: true,
      isDucking: false,
      runFrame: 0,
      legTimer: 0,
    },
    groundY: 170,
    gravity: 0.78,
    jumpStrength: -13.5,
    baseSpeed: 6.5,
    currentSpeed: 6.5,
    score: 0,
    obstacles: [] as Obstacle[],
    particles: [] as Particle[],
    nextObstacleTimer: 0,
    animationFrameId: 0,
    stars: [] as { x: number; y: number; size: number; speed: number }[],
    groundOffset: 0,
  });

  // Load High Score from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('CYBER_DINO_HIGH_SCORE');
    if (saved) {
      setHighScore(parseInt(saved, 10) || 0);
    }

    // Init background stars
    const stars: { x: number; y: number; size: number; speed: number }[] = [];
    for (let i = 0; i < 40; i++) {
      stars.push({
        x: Math.random() * 800,
        y: Math.random() * 140,
        size: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.4 + 0.2,
      });
    }
    stateRef.current.stars = stars;
  }, []);

  const triggerJump = () => {
    if (!isPlaying && !isGameOver) {
      startGame();
      return;
    }
    if (isGameOver) {
      startGame();
      return;
    }

    const { dino } = stateRef.current;
    if (dino.isGrounded) {
      dino.vy = stateRef.current.jumpStrength;
      dino.isGrounded = false;
      playSynthSound('jump');

      // Add jump dust particles
      for (let i = 0; i < 5; i++) {
        stateRef.current.particles.push({
          x: dino.x + 10 + Math.random() * 20,
          y: stateRef.current.groundY,
          vx: (Math.random() - 0.5) * 3,
          vy: -(Math.random() * 2 + 1),
          size: Math.random() * 3 + 1,
          color: '#ffffff',
          alpha: 0.8,
          life: 18,
        });
      }
    }
  };

  const setDucking = (ducking: boolean) => {
    stateRef.current.dino.isDucking = ducking;
    if (ducking && !stateRef.current.dino.isGrounded) {
      stateRef.current.dino.vy += 2.5; // Fast-drop
    }
  };

  // Keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['Space', 'ArrowUp', 'KeyW'].includes(e.code)) {
        e.preventDefault();
        triggerJump();
      } else if (['ArrowDown', 'KeyS'].includes(e.code)) {
        e.preventDefault();
        setDucking(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (['ArrowDown', 'KeyS'].includes(e.code)) {
        e.preventDefault();
        setDucking(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isPlaying, isGameOver, soundEnabled]);

  const startGame = () => {
    initAudio();
    const state = stateRef.current;
    state.dino.y = state.groundY - 48;
    state.dino.vy = 0;
    state.dino.isGrounded = true;
    state.dino.isDucking = false;
    state.dino.height = 48;
    state.obstacles = [];
    state.particles = [];
    state.score = 0;
    state.currentSpeed = state.baseSpeed;
    state.nextObstacleTimer = 60;
    
    setScore(0);
    setSpeedMultiplier(1);
    setIsGameOver(false);
    setIsPlaying(true);
  };

  // Game Loop
  useEffect(() => {
    if (!isPlaying || isGameOver) return;

    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const state = stateRef.current;
      const dino = state.dino;

      // Calculate logic updates
      state.score += 0.2;
      const currentScoreInt = Math.floor(state.score);
      setScore(currentScoreInt);

      // Score chime every 100 points
      if (currentScoreInt > 0 && currentScoreInt % 100 === 0 && Math.floor(state.score - 0.2) % 100 !== 0) {
        playSynthSound('score');
      }

      // Smooth speed ramping
      state.currentSpeed = state.baseSpeed + Math.min(7, state.score * 0.008);
      setSpeedMultiplier(parseFloat((state.currentSpeed / state.baseSpeed).toFixed(2)));

      // Update Dino Physics
      if (dino.isDucking) {
        dino.height = 26;
        dino.width = 54;
      } else {
        dino.height = 48;
        dino.width = 40;
      }

      if (!dino.isGrounded) {
        dino.vy += state.gravity;
        dino.y += dino.vy;

        if (dino.y >= state.groundY - dino.height) {
          dino.y = state.groundY - dino.height;
          dino.vy = 0;
          dino.isGrounded = true;
        }
      } else {
        dino.y = state.groundY - dino.height;
      }

      // Dino running animation cycle
      dino.legTimer += 1;
      if (dino.legTimer > 5) {
        dino.runFrame = (dino.runFrame + 1) % 2;
        dino.legTimer = 0;
      }

      // Update Obstacles
      state.nextObstacleTimer -= 1;
      if (state.nextObstacleTimer <= 0) {
        const types: Obstacle['type'][] = ['cactus_small', 'cactus_large', 'cactus_double'];
        if (state.score > 80) {
          types.push('drone_high');
        }
        if (state.score > 150) {
          types.push('drone_low');
        }

        const selectedType = types[Math.floor(Math.random() * types.length)];
        let width = 24;
        let height = 36;
        let y = state.groundY - 36;

        if (selectedType === 'cactus_small') {
          width = 20;
          height = 32;
          y = state.groundY - 32;
        } else if (selectedType === 'cactus_large') {
          width = 28;
          height = 46;
          y = state.groundY - 46;
        } else if (selectedType === 'cactus_double') {
          width = 46;
          height = 38;
          y = state.groundY - 38;
        } else if (selectedType === 'drone_high') {
          width = 38;
          height = 22;
          y = state.groundY - 58; // Jump over or stand under
        } else if (selectedType === 'drone_low') {
          width = 38;
          height = 22;
          y = state.groundY - 32; // Must duck under or jump high
        }

        state.obstacles.push({
          x: canvas.width + 20,
          y,
          width,
          height,
          type: selectedType,
        });

        // Interval between obstacles decreases with speed
        state.nextObstacleTimer = Math.floor(Math.random() * 45 + 50 - Math.min(30, state.score * 0.03));
      }

      // Move & filter obstacles
      for (let i = state.obstacles.length - 1; i >= 0; i--) {
        const obs = state.obstacles[i];
        obs.x -= state.currentSpeed;

        // Collision Check (AABB with slight padding for fairness)
        const padX = 6;
        const padY = 5;
        const dinoBox = {
          x: dino.x + padX,
          y: dino.y + padY,
          width: dino.width - padX * 2,
          height: dino.height - padY * 2,
        };

        const obsBox = {
          x: obs.x + 3,
          y: obs.y + 3,
          width: obs.width - 6,
          height: obs.height - 6,
        };

        if (
          dinoBox.x < obsBox.x + obsBox.width &&
          dinoBox.x + dinoBox.width > obsBox.x &&
          dinoBox.y < obsBox.y + obsBox.height &&
          dinoBox.y + dinoBox.height > obsBox.y
        ) {
          // Game Over Collision
          setIsGameOver(true);
          setIsPlaying(false);
          playSynthSound('gameover');

          // Burst particles
          for (let p = 0; p < 25; p++) {
            state.particles.push({
              x: dino.x + dino.width / 2,
              y: dino.y + dino.height / 2,
              vx: (Math.random() - 0.5) * 8,
              vy: (Math.random() - 0.5) * 8,
              size: Math.random() * 4 + 2,
              color: p % 2 === 0 ? '#ff0055' : '#ffffff',
              alpha: 1,
              life: 35,
            });
          }

          // Save high score
          if (currentScoreInt > highScore) {
            setHighScore(currentScoreInt);
            localStorage.setItem('CYBER_DINO_HIGH_SCORE', currentScoreInt.toString());
          }
          return;
        }

        if (obs.x + obs.width < -20) {
          state.obstacles.splice(i, 1);
        }
      }

      // Update Particles
      for (let i = state.particles.length - 1; i >= 0; i--) {
        const p = state.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 1 / p.life;
        if (p.alpha <= 0) {
          state.particles.splice(i, 1);
        }
      }

      // Draw Everything
      renderCanvas(ctx, canvas.width, canvas.height);

      state.animationFrameId = requestAnimationFrame(loop);
    };

    stateRef.current.animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(stateRef.current.animationFrameId);
  }, [isPlaying, isGameOver, highScore, soundEnabled]);

  // Canvas Renderer
  const renderCanvas = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const state = stateRef.current;
    const dino = state.dino;

    // Clear Canvas
    ctx.clearRect(0, 0, width, height);

    // Dark Background Grid
    ctx.fillStyle = '#060606';
    ctx.fillRect(0, 0, width, height);

    // Background Stars / Cyber Dust
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    state.stars.forEach(star => {
      star.x -= star.speed * (isPlaying ? state.currentSpeed * 0.1 : 0.5);
      if (star.x < 0) star.x = width;
      ctx.fillRect(star.x, star.y, star.size, star.size);
    });

    // Ground line
    state.groundOffset = (state.groundOffset + (isPlaying ? state.currentSpeed : 0)) % 40;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, state.groundY);
    ctx.lineTo(width, state.groundY);
    ctx.stroke();

    // Ground cyber tick marks
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let x = -state.groundOffset; x < width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, state.groundY + 3);
      ctx.lineTo(x + 12, state.groundY + 8);
      ctx.stroke();
    }

    // Render Particles
    state.particles.forEach(p => {
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size);
      ctx.restore();
    });

    // Render Obstacles
    state.obstacles.forEach(obs => {
      ctx.save();
      if (obs.type.startsWith('cactus')) {
        // Neon Cyber Cactus
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);

        // Inner glowing core line
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(obs.x + 3, obs.y + 4, obs.width - 6, obs.height - 8);

        // Cactus needle accents
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(obs.x - 3, obs.y + 8, 3, 6);
        ctx.fillRect(obs.x + obs.width, obs.y + 14, 3, 6);
      } else {
        // Airborne Surveillance Drone
        ctx.fillStyle = '#ffffff';
        // Drone fuselage
        ctx.fillRect(obs.x, obs.y + 6, obs.width, obs.height - 12);
        // Drone wings/rotors
        ctx.fillRect(obs.x + 4, obs.y, obs.width - 8, 3);
        ctx.fillRect(obs.x + 4, obs.y + obs.height - 3, obs.width - 8, 3);
        // Scanning eye
        ctx.fillStyle = '#ff0055';
        ctx.fillRect(obs.x + (Math.sin(Date.now() * 0.01) * 8 + 14), obs.y + 9, 6, 4);
      }
      ctx.restore();
    });

    // Render Cyber Dino
    ctx.save();
    ctx.fillStyle = '#ffffff';

    if (dino.isDucking) {
      // Ducking / Sliding Cyber Dino
      // Body
      ctx.fillRect(dino.x, dino.y + 6, dino.width, dino.height - 6);
      // Head
      ctx.fillRect(dino.x + dino.width - 14, dino.y, 18, 14);
      // Eye
      ctx.fillStyle = '#060606';
      ctx.fillRect(dino.x + dino.width - 6, dino.y + 3, 3, 3);
      // Jet boost flame
      ctx.fillStyle = '#ffffff';
      if (Math.random() > 0.3) {
        ctx.fillRect(dino.x - 8, dino.y + 12, 6, 4);
      }
    } else {
      // Standing / Running Cyber Dino
      // Head
      ctx.fillRect(dino.x + 18, dino.y, 22, 18);
      // Eye
      ctx.fillStyle = '#060606';
      ctx.fillRect(dino.x + 30, dino.y + 4, 4, 4);
      // Snout
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(dino.x + 34, dino.y + 10, 6, 8);
      // Body
      ctx.fillRect(dino.x + 6, dino.y + 16, 26, 20);
      // Tail
      ctx.fillRect(dino.x, dino.y + 16, 8, 12);
      ctx.fillRect(dino.x - 4, dino.y + 12, 6, 8);
      // Arms
      ctx.fillRect(dino.x + 28, dino.y + 22, 6, 4);

      // Running Legs
      if (dino.isGrounded) {
        if (dino.runFrame === 0) {
          ctx.fillRect(dino.x + 10, dino.y + 36, 6, 12);
          ctx.fillRect(dino.x + 22, dino.y + 36, 6, 7);
          ctx.fillRect(dino.x + 26, dino.y + 43, 6, 5);
        } else {
          ctx.fillRect(dino.x + 10, dino.y + 36, 6, 7);
          ctx.fillRect(dino.x + 14, dino.y + 43, 6, 5);
          ctx.fillRect(dino.x + 22, dino.y + 36, 6, 12);
        }
      } else {
        // Jumping legs tucked
        ctx.fillRect(dino.x + 10, dino.y + 36, 6, 8);
        ctx.fillRect(dino.x + 22, dino.y + 36, 6, 8);
      }
    }

    ctx.restore();
  };

  // Initial draw once mounted
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        stateRef.current.dino.y = stateRef.current.groundY - 48;
        renderCanvas(ctx, canvas.width, canvas.height);
      }
    }
  }, []);

  return (
    <section 
      id="dino-game"
      className="py-4 px-4 sm:px-6 max-w-3xl mx-auto relative z-10 font-sans"
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="space-y-3.5"
      >
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#141417] border border-white/10 flex items-center justify-center text-zinc-200 shadow-sm">
              <Gamepad2 className="w-4 h-4 text-zinc-300" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                {lang === 'id' ? 'Mini Game: Cyber Runner' : 'Mini Game: Cyber Runner'}
              </h3>
              <p className="text-xs text-zinc-400">
                {lang === 'id' ? 'Eksperimen canvas arcade 60fps' : '60fps canvas arcade runner'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1 rounded-lg bg-[#141417] border border-white/5 text-[11px] font-medium text-amber-400 shadow-sm flex items-center gap-1.5 font-mono">
              <Trophy className="w-3.5 h-3.5" />
              <span>{highScore}</span>
            </div>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-lg bg-[#141417] hover:bg-zinc-800 border border-white/5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              title={soundEnabled ? 'Mute Audio' : 'Unmute Audio'}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5 text-zinc-600" />}
            </button>
          </div>
        </div>

        {/* Main Arcade Frame Container */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-[#111113] border border-white/5 hover:border-white/15 transition-all shadow-md overflow-hidden">
          
          {/* Top Telemetry HUD */}
          <div className="flex items-center justify-between font-mono text-xs pb-3 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-zinc-400">
                <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-400 animate-ping' : 'bg-zinc-600'}`} />
                <span className="text-[10px] uppercase tracking-wider">{isPlaying ? 'RUNNING' : (isGameOver ? 'CRASHED' : 'STANDBY')}</span>
              </div>
              <div className="text-[10px] text-zinc-500">SPEED: <span className="text-zinc-300">{speedMultiplier}x</span></div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest mr-2">SCORE</span>
              <span className="text-sm sm:text-base font-bold font-mono tracking-widest text-white">
                {String(score).padStart(5, '0')}
              </span>
            </div>
          </div>

          {/* Canvas Area */}
          <div className="relative w-full overflow-hidden my-3 rounded-xl bg-[#060606] border border-white/5">
            <canvas
              ref={canvasRef}
              width={800}
              height={200}
              className="w-full h-[160px] sm:h-[200px] block cursor-pointer"
              onClick={triggerJump}
            />

            {/* Start Screen Overlay */}
            {!isPlaying && !isGameOver && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-[2px] space-y-3">
                <div className="p-2.5 rounded-full bg-white text-black shadow-xl animate-pulse">
                  <Gamepad2 className="w-5 h-5" />
                </div>
                <div className="text-center space-y-0.5">
                  <p className="text-xs font-semibold uppercase tracking-widest font-mono text-white">
                    {lang === 'id' ? 'TEKAN SPACE ATAU KLIK' : 'PRESS SPACE OR TAP TO JUMP'}
                  </p>
                </div>
                <button
                  onClick={startGame}
                  className="px-5 py-2 rounded-xl bg-white text-black font-bold font-mono text-xs hover:bg-zinc-200 transition-all cursor-pointer shadow-lg active:scale-95 flex items-center gap-2"
                >
                  <Play className="w-3 h-3 fill-black" />
                  <span>{lang === 'id' ? 'Mulai Main' : 'Start Run'}</span>
                </button>
              </div>
            )}

            {/* Game Over Overlay */}
            {isGameOver && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm space-y-3">
                <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold tracking-widest">
                  <ShieldAlert className="w-4 h-4" />
                  <span>GAME OVER</span>
                </div>
                <div className="text-center space-y-1">
                  <div className="text-lg font-bold text-white font-mono">
                    {lang === 'id' ? 'Skor Akhir:' : 'Final Score:'} <strong>{score}</strong>
                  </div>
                </div>
                <button
                  onClick={startGame}
                  className="px-5 py-2 rounded-xl bg-white text-black font-bold font-mono text-xs hover:bg-zinc-200 transition-all cursor-pointer shadow-lg active:scale-95 flex items-center gap-2"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{lang === 'id' ? 'Main Lagi' : 'Retry'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile & Touch Controls */}
          <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-zinc-500">
            <div className="flex items-center gap-3 text-[10px]">
              <span className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 rounded bg-[#18181b] border border-white/10 text-white font-semibold">SPACE</kbd>
                <span>{lang === 'id' ? 'Lompat' : 'Jump'}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 rounded bg-[#18181b] border border-white/10 text-white font-semibold">↓</kbd>
                <span>{lang === 'id' ? 'Menunduk' : 'Duck'}</span>
              </span>
            </div>

            {/* On-Screen Touch Buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onMouseDown={() => setDucking(true)}
                onMouseUp={() => setDucking(false)}
                onTouchStart={() => setDucking(true)}
                onTouchEnd={() => setDucking(false)}
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-[#18181b] active:bg-zinc-800 border border-white/10 text-zinc-300 font-mono text-xs flex items-center justify-center gap-1.5 cursor-pointer select-none"
              >
                <ArrowDown className="w-3.5 h-3.5" />
                <span>DUCK</span>
              </button>

              <button
                onClick={triggerJump}
                className="flex-1 sm:flex-none px-5 py-2 rounded-xl bg-white active:bg-zinc-200 text-black font-bold font-mono text-xs flex items-center justify-center gap-1.5 cursor-pointer select-none shadow-sm"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>JUMP</span>
              </button>
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
};
