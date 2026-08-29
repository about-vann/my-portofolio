import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { 
  Gamepad2, 
  Trophy, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Play, 
  Sparkles,
  Touchpad
} from 'lucide-react';
import { ThemeAccent, Language } from '../types';

interface DinoGameSectionProps {
  accent: ThemeAccent;
  lang: Language;
}

type ObstacleType = 
  | 'cactus_small_single'
  | 'cactus_small_double'
  | 'cactus_small_triple'
  | 'cactus_large_single'
  | 'cactus_large_double'
  | 'bird_low'
  | 'bird_mid'
  | 'bird_high';

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  type: ObstacleType;
  animFrame: number;
  animTimer: number;
}

interface Cloud {
  x: number;
  y: number;
  speed: number;
  width: number;
  height: number;
}

interface GroundDetail {
  x: number;
  y: number;
  length: number;
}

export const DinoGameSection: React.FC<DinoGameSectionProps> = ({ accent, lang }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Game state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Audio Context synth for authentic retro 8-bit sounds
  const audioCtxRef = useRef<AudioContext | null>(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        audioCtxRef.current = new AudioContextClass();
      }
    }
  };

  const playRetroSound = (type: 'jump' | 'score' | 'gameover') => {
    if (!soundEnabled) return;
    try {
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'jump') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (type === 'score') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.setValueAtTime(880, now + 0.08); // A5
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        osc.start(now);
        osc.stop(now + 0.22);
      } else if (type === 'gameover') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.exponentialRampToValueAtTime(65, now + 0.35);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      }
    } catch {
      // Ignore audio synthesis on un-interacted browser instances
    }
  };

  // Internal Game Engine State Ref
  const engineRef = useRef({
    dino: {
      x: 50,
      y: 0,
      width: 44,
      height: 47,
      vy: 0,
      isGrounded: true,
      runFrame: 0,
      legTimer: 0,
    },
    groundY: 180,
    gravity: 0.72,
    jumpStrength: -13.2,
    baseSpeed: 6.2,
    currentSpeed: 6.2,
    score: 0,
    obstacles: [] as Obstacle[],
    clouds: [] as Cloud[],
    groundDetails: [] as GroundDetail[],
    nextObstacleTimer: 0,
    animationFrameId: 0,
    groundOffset: 0,
  });

  // Load High Score from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('CHROME_DINO_HIGH_SCORE');
    if (saved) {
      setHighScore(parseInt(saved, 10) || 0);
    }

    // Initialize clouds at varying positions
    const clouds: Cloud[] = [
      { x: 120, y: 35, speed: 0.3, width: 46, height: 14 },
      { x: 380, y: 65, speed: 0.25, width: 46, height: 14 },
      { x: 620, y: 40, speed: 0.35, width: 46, height: 14 },
    ];
    engineRef.current.clouds = clouds;

    // Initialize ground bump details
    const groundDetails: GroundDetail[] = [];
    for (let x = 0; x < 900; x += Math.floor(Math.random() * 40 + 20)) {
      groundDetails.push({
        x,
        y: Math.random() > 0.5 ? 2 : 4,
        length: Math.floor(Math.random() * 8 + 4),
      });
    }
    engineRef.current.groundDetails = groundDetails;
  }, []);

  // Jump Action triggered by Screen Tap / Click or Keyboard
  const handleJumpOrAction = useCallback(() => {
    if (!isPlaying && !isGameOver) {
      startGame();
      return;
    }
    if (isGameOver) {
      startGame();
      return;
    }

    const { dino, jumpStrength } = engineRef.current;
    if (dino.isGrounded) {
      dino.vy = jumpStrength;
      dino.isGrounded = false;
      playRetroSound('jump');
    }
  }, [isPlaying, isGameOver, soundEnabled]);

  // Keyboard Event Handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['Space', 'ArrowUp', 'KeyW', 'Enter'].includes(e.code)) {
        e.preventDefault();
        handleJumpOrAction();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleJumpOrAction]);

  const startGame = () => {
    initAudio();
    const engine = engineRef.current;
    engine.dino.y = engine.groundY - 47;
    engine.dino.vy = 0;
    engine.dino.isGrounded = true;
    engine.dino.runFrame = 0;
    engine.dino.legTimer = 0;
    engine.obstacles = [];
    engine.score = 0;
    engine.currentSpeed = engine.baseSpeed;
    engine.nextObstacleTimer = 65;

    setScore(0);
    setIsGameOver(false);
    setIsPlaying(true);
  };

  // Drawing Sprites: Classic Chrome Pixel Art
  const drawCloud = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';

    // Cloud pixel bumps
    ctx.fillRect(x + 10, y, 24, 4);
    ctx.fillRect(x + 6, y + 4, 34, 4);
    ctx.fillRect(x, y + 8, 46, 6);

    ctx.restore();
  };

  // Draw Classic Cactus (Pohon Kaktus)
  const drawCactus = (ctx: CanvasRenderingContext2D, obs: Obstacle) => {
    ctx.save();
    ctx.fillStyle = '#ffffff';

    const { x, y, width, height, type } = obs;

    if (type === 'cactus_small_single') {
      // 17px wide x 35px high
      // Center Stem
      ctx.fillRect(x + 5, y, 6, height);
      // Left Branch
      ctx.fillRect(x, y + 10, 4, 12);
      ctx.fillRect(x, y + 18, 6, 4);
      // Right Branch
      ctx.fillRect(x + 12, y + 6, 4, 14);
      ctx.fillRect(x + 10, y + 16, 4, 4);
    } else if (type === 'cactus_small_double') {
      // Two small cacti
      // Cactus 1
      ctx.fillRect(x + 4, y, 5, height);
      ctx.fillRect(x, y + 10, 3, 10);
      ctx.fillRect(x, y + 17, 5, 3);
      ctx.fillRect(x + 10, y + 6, 3, 12);
      ctx.fillRect(x + 8, y + 15, 3, 3);

      // Cactus 2
      const x2 = x + 16;
      ctx.fillRect(x2 + 4, y + 4, 5, height - 4);
      ctx.fillRect(x2, y + 12, 3, 8);
      ctx.fillRect(x2, y + 17, 5, 3);
      ctx.fillRect(x2 + 10, y + 8, 3, 10);
      ctx.fillRect(x2 + 8, y + 15, 3, 3);
    } else if (type === 'cactus_small_triple') {
      // Three small cacti cluster
      for (let c = 0; c < 3; c++) {
        const cx = x + c * 15;
        const hOffset = c === 1 ? 0 : 4;
        ctx.fillRect(cx + 4, y + hOffset, 5, height - hOffset);
        if (c !== 2) {
          ctx.fillRect(cx + 10, y + 8 + hOffset, 3, 10);
          ctx.fillRect(cx + 8, y + 15 + hOffset, 3, 3);
        }
        if (c !== 0) {
          ctx.fillRect(cx, y + 10 + hOffset, 3, 8);
          ctx.fillRect(cx, y + 15 + hOffset, 5, 3);
        }
      }
    } else if (type === 'cactus_large_single') {
      // 25px wide x 50px high
      // Center Stem
      ctx.fillRect(x + 8, y, 9, height);
      // Left Branch
      ctx.fillRect(x, y + 14, 6, 18);
      ctx.fillRect(x, y + 26, 9, 6);
      // Right Branch
      ctx.fillRect(x + 19, y + 8, 6, 22);
      ctx.fillRect(x + 16, y + 24, 6, 6);
    } else if (type === 'cactus_large_double') {
      // Two large cacti
      // Large 1
      ctx.fillRect(x + 6, y, 8, height);
      ctx.fillRect(x, y + 14, 5, 16);
      ctx.fillRect(x, y + 25, 7, 5);
      ctx.fillRect(x + 15, y + 10, 5, 18);
      ctx.fillRect(x + 13, y + 23, 5, 5);

      // Large 2
      const x2 = x + 24;
      ctx.fillRect(x2 + 6, y + 5, 8, height - 5);
      ctx.fillRect(x2, y + 16, 5, 14);
      ctx2: ctx.fillRect(x2, y + 25, 7, 5);
      ctx.fillRect(x2 + 15, y + 12, 5, 16);
      ctx.fillRect(x2 + 13, y + 23, 5, 5);
    }

    ctx.restore();
  };

  // Draw Flying Pterodactyl (Burung Terbang)
  const drawBird = (ctx: CanvasRenderingContext2D, obs: Obstacle) => {
    ctx.save();
    ctx.fillStyle = '#ffffff';

    const { x, y, animFrame } = obs;

    // Body & Beak
    ctx.fillRect(x + 12, y + 10, 18, 6);
    ctx.fillRect(x + 2, y + 12, 10, 4); // Beak tip
    ctx.fillRect(x + 28, y + 8, 8, 4);  // Tail feathers
    ctx.fillRect(x + 8, y + 8, 6, 4);   // Head

    // Eye
    ctx.fillStyle = '#060606';
    ctx.fillRect(x + 10, y + 9, 2, 2);

    ctx.fillStyle = '#ffffff';
    // Flapping Wings
    if (animFrame === 0) {
      // Wing Up Frame
      ctx.fillRect(x + 16, y, 6, 10);
      ctx.fillRect(x + 20, y + 2, 6, 8);
      ctx.fillRect(x + 24, y + 4, 4, 6);
    } else {
      // Wing Down Frame
      ctx.fillRect(x + 16, y + 16, 6, 10);
      ctx.fillRect(x + 20, y + 16, 6, 8);
      ctx.fillRect(x + 24, y + 16, 4, 6);
    }

    ctx.restore();
  };

  // Draw Classic Chrome T-Rex Sprite
  const drawChromeDino = (ctx: CanvasRenderingContext2D, dino: any, isDead: boolean) => {
    ctx.save();
    ctx.fillStyle = '#ffffff';

    const x = dino.x;
    const y = dino.y;

    // Head & Snout
    ctx.fillRect(x + 22, y, 20, 16);
    ctx.fillRect(x + 36, y + 2, 8, 12);
    ctx.fillRect(x + 42, y + 6, 2, 6);

    // Mouth cutout
    ctx.fillStyle = '#060606';
    ctx.fillRect(x + 30, y + 12, 14, 4);

    // Eye (Normal 2x2 vs Dead X)
    if (isDead) {
      // X dead eye
      ctx.fillRect(x + 26, y + 4, 4, 4);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x + 26, y + 4, 1, 1);
      ctx.fillRect(x + 29, y + 4, 1, 1);
      ctx.fillRect(x + 27, y + 5, 2, 2);
      ctx.fillRect(x + 26, y + 7, 1, 1);
      ctx.fillRect(x + 29, y + 7, 1, 1);
    } else {
      // Normal pixel eye
      ctx.fillRect(x + 26, y + 3, 3, 3);
    }

    // Dino Body & Tail
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x + 10, y + 14, 22, 18);
    ctx.fillRect(x + 6, y + 16, 6, 14);
    ctx.fillRect(x + 2, y + 18, 6, 10);
    ctx.fillRect(x, y + 20, 4, 6); // Tail tip

    // Tiny T-Rex Arms
    ctx.fillRect(x + 30, y + 20, 6, 3);
    ctx.fillRect(x + 34, y + 23, 2, 4);

    // Legs & Running Cycle
    if (!dino.isGrounded) {
      // Jumping pose: legs tucked slightly
      ctx.fillRect(x + 12, y + 32, 5, 9);
      ctx.fillRect(x + 22, y + 32, 5, 9);
      ctx.fillRect(x + 15, y + 40, 4, 2);
      ctx.fillRect(x + 25, y + 40, 4, 2);
    } else if (isDead) {
      // Dead pose: static legs
      ctx.fillRect(x + 12, y + 32, 5, 14);
      ctx.fillRect(x + 22, y + 32, 5, 14);
      ctx.fillRect(x + 12, y + 44, 7, 3);
      ctx.fillRect(x + 22, y + 44, 7, 3);
    } else {
      // Authentic alternating run legs
      if (dino.runFrame === 0) {
        // Left Leg Down & forward, Right Leg lifted & back
        ctx.fillRect(x + 12, y + 32, 5, 15);
        ctx.fillRect(x + 12, y + 44, 7, 3);

        ctx.fillRect(x + 22, y + 32, 5, 8);
        ctx.fillRect(x + 25, y + 38, 5, 4);
      } else {
        // Right Leg Down & forward, Left Leg lifted & back
        ctx.fillRect(x + 12, y + 32, 5, 8);
        ctx.fillRect(x + 10, y + 38, 5, 4);

        ctx.fillRect(x + 22, y + 32, 5, 15);
        ctx.fillRect(x + 22, y + 44, 7, 3);
      }
    }

    ctx.restore();
  };

  // Main Canvas Render Function
  const renderGameCanvas = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const engine = engineRef.current;
    const dino = engine.dino;

    // Clear Canvas
    ctx.clearRect(0, 0, width, height);

    // Deep Crisp Canvas Background
    ctx.fillStyle = '#060606';
    ctx.fillRect(0, 0, width, height);

    // 1. Draw Clouds (Efek Awan Bergerak)
    engine.clouds.forEach(cloud => {
      drawCloud(ctx, cloud.x, cloud.y);
    });

    // 2. Draw Ground Line & Texture
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, engine.groundY);
    ctx.lineTo(width, engine.groundY);
    ctx.stroke();

    // Dotted Ground bumps
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    engine.groundDetails.forEach(g => {
      const renderX = (g.x - engine.groundOffset + width * 2) % width;
      ctx.fillRect(renderX, engine.groundY + g.y, g.length, 2);
    });

    // 3. Draw Obstacles (Pohon Kaktus & Burung)
    engine.obstacles.forEach(obs => {
      if (obs.type.startsWith('cactus')) {
        drawCactus(ctx, obs);
      } else if (obs.type.startsWith('bird')) {
        drawBird(ctx, obs);
      }
    });

    // 4. Draw Chrome Dino
    drawChromeDino(ctx, dino, isGameOver);
  };

  // Game Loop
  useEffect(() => {
    if (!isPlaying || isGameOver) return;

    const loop = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const engine = engineRef.current;
      const dino = engine.dino;

      // Disable anti-aliasing for sharp retro pixels
      ctx.imageSmoothingEnabled = false;

      // Update Score
      engine.score += 0.18;
      const currentScoreInt = Math.floor(engine.score);
      setScore(currentScoreInt);

      // Score milestone beep every 100 points
      if (currentScoreInt > 0 && currentScoreInt % 100 === 0 && Math.floor(engine.score - 0.18) % 100 !== 0) {
        playRetroSound('score');
      }

      // Smooth Speed Ramping
      engine.currentSpeed = engine.baseSpeed + Math.min(6.5, engine.score * 0.0075);
      engine.groundOffset = (engine.groundOffset + engine.currentSpeed) % canvas.width;

      // Update Clouds (Parallax movement)
      engine.clouds.forEach(cloud => {
        cloud.x -= cloud.speed * (engine.currentSpeed * 0.2);
        if (cloud.x < -cloud.width) {
          cloud.x = canvas.width + Math.random() * 150;
          cloud.y = Math.random() * 60 + 25;
        }
      });

      // Update Ground Details
      engine.groundDetails.forEach(g => {
        g.x -= engine.currentSpeed;
        if (g.x < -20) {
          g.x = canvas.width + Math.random() * 30;
        }
      });

      // Update Dino Physics
      if (!dino.isGrounded) {
        dino.vy += engine.gravity;
        dino.y += dino.vy;

        if (dino.y >= engine.groundY - dino.height) {
          dino.y = engine.groundY - dino.height;
          dino.vy = 0;
          dino.isGrounded = true;
        }
      } else {
        dino.y = engine.groundY - dino.height;
      }

      // Running Animation Cycle
      dino.legTimer += 1;
      const legSpeedThreshold = Math.max(3, Math.floor(6 - (engine.currentSpeed - engine.baseSpeed) * 0.4));
      if (dino.legTimer >= legSpeedThreshold) {
        dino.runFrame = (dino.runFrame + 1) % 2;
        dino.legTimer = 0;
      }

      // Spawn Obstacles (Cactus & Birds)
      engine.nextObstacleTimer -= 1;
      if (engine.nextObstacleTimer <= 0) {
        const types: ObstacleType[] = [
          'cactus_small_single',
          'cactus_small_double',
          'cactus_small_triple',
          'cactus_large_single',
          'cactus_large_double',
        ];

        // Introduce Pterodactyl (Burung) when score is higher
        if (engine.score > 80) {
          types.push('bird_low');
          types.push('bird_high');
        }
        if (engine.score > 160) {
          types.push('bird_mid');
        }

        const selectedType = types[Math.floor(Math.random() * types.length)];
        let width = 17;
        let height = 35;
        let y = engine.groundY - 35;

        if (selectedType === 'cactus_small_single') {
          width = 17;
          height = 35;
          y = engine.groundY - 35;
        } else if (selectedType === 'cactus_small_double') {
          width = 34;
          height = 35;
          y = engine.groundY - 35;
        } else if (selectedType === 'cactus_small_triple') {
          width = 51;
          height = 35;
          y = engine.groundY - 35;
        } else if (selectedType === 'cactus_large_single') {
          width = 25;
          height = 50;
          y = engine.groundY - 50;
        } else if (selectedType === 'cactus_large_double') {
          width = 50;
          height = 50;
          y = engine.groundY - 50;
        } else if (selectedType === 'bird_high') {
          width = 40;
          height = 28;
          y = engine.groundY - 78; // High in sky (can walk under)
        } else if (selectedType === 'bird_mid') {
          width = 40;
          height = 28;
          y = engine.groundY - 52; // Mid height
        } else if (selectedType === 'bird_low') {
          width = 40;
          height = 28;
          y = engine.groundY - 30; // Low flying (must jump)
        }

        engine.obstacles.push({
          x: canvas.width + 10,
          y,
          width,
          height,
          type: selectedType,
          animFrame: 0,
          animTimer: 0,
        });

        // Calculate next obstacle timing based on speed
        engine.nextObstacleTimer = Math.floor(
          Math.random() * 45 + 50 - Math.min(28, engine.score * 0.025)
        );
      }

      // Update & Check Obstacle Collisions
      for (let i = engine.obstacles.length - 1; i >= 0; i--) {
        const obs = engine.obstacles[i];
        obs.x -= engine.currentSpeed;

        // Animate bird flapping
        if (obs.type.startsWith('bird')) {
          obs.animTimer += 1;
          if (obs.animTimer > 8) {
            obs.animFrame = (obs.animFrame + 1) % 2;
            obs.animTimer = 0;
          }
        }

        // Collision Check (AABB with accurate padding)
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
          // Crash Game Over
          setIsGameOver(true);
          setIsPlaying(false);
          playRetroSound('gameover');

          // Save high score
          if (currentScoreInt > highScore) {
            setHighScore(currentScoreInt);
            localStorage.setItem('CHROME_DINO_HIGH_SCORE', currentScoreInt.toString());
          }
          return;
        }

        // Remove off-screen obstacles
        if (obs.x + obs.width < -30) {
          engine.obstacles.splice(i, 1);
        }
      }

      // Render updated frame
      renderGameCanvas(ctx, canvas.width, canvas.height);

      engine.animationFrameId = requestAnimationFrame(loop);
    };

    engineRef.current.animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(engineRef.current.animationFrameId);
  }, [isPlaying, isGameOver, highScore, soundEnabled]);

  // Initial draw once mounted
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.imageSmoothingEnabled = false;
        engineRef.current.dino.y = engineRef.current.groundY - 47;
        renderGameCanvas(ctx, canvas.width, canvas.height);
      }
    }
  }, []);

  return (
    <section 
      id="dino-game"
      className="content-section px-4 sm:px-6 max-w-3xl mx-auto relative z-10 font-sans"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-3.5"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#141417] border border-white/10 flex items-center justify-center text-zinc-200 shadow-sm">
              <Gamepad2 className="w-4 h-4 text-zinc-300" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                {lang === 'id' ? 'Chrome T-Rex Dino Game' : 'Chrome T-Rex Dino Game'}
              </h3>
              <p className="text-xs text-zinc-400">
                {lang === 'id' ? 'Pixel art arcade dengan pohon kaktus & burung' : 'Pixel art runner with cacti, birds & clouds'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-lg bg-[#141417] border border-white/5 text-xs font-mono text-zinc-300 shadow-sm flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>HI {String(highScore).padStart(5, '0')}</span>
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
          
          {/* Top Score HUD */}
          <div className="flex items-center justify-between font-mono text-xs pb-2.5 border-b border-white/5">
            <div className="flex items-center gap-2 text-zinc-400">
              <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-400 animate-ping' : (isGameOver ? 'bg-rose-500' : 'bg-zinc-600')}`} />
              <span className="text-[10px] uppercase tracking-wider text-zinc-400">
                {isPlaying ? 'RUNNING' : (isGameOver ? 'GAME OVER' : 'READY')}
              </span>
            </div>

            <div className="text-right font-mono tracking-widest text-zinc-400">
              <span className="text-zinc-500 mr-2">HI {String(highScore).padStart(5, '0')}</span>
              <span className="text-sm font-bold text-white">
                {String(score).padStart(5, '0')}
              </span>
            </div>
          </div>

          {/* Interactive Tap-to-Jump Canvas Box */}
          <div 
            className="relative w-full overflow-hidden my-3 rounded-xl bg-[#060606] border border-white/10 select-none cursor-pointer active:scale-[0.995] transition-transform"
            onClick={handleJumpOrAction}
            onTouchStart={(e) => {
              e.preventDefault();
              handleJumpOrAction();
            }}
            title={lang === 'id' ? 'Sentuh layar untuk melompat' : 'Tap screen to jump'}
          >
            <canvas
              ref={canvasRef}
              width={800}
              height={220}
              className="w-full h-[170px] sm:h-[220px] block"
            />

            {/* Start Screen Prompt */}
            {!isPlaying && !isGameOver && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-[2px] space-y-3 pointer-events-none">
                <div className="p-2.5 rounded-full bg-white text-black shadow-xl animate-pulse">
                  <Gamepad2 className="w-5 h-5" />
                </div>
                <div className="text-center space-y-1">
                  <p className="text-xs font-bold uppercase tracking-widest font-mono text-white">
                    {lang === 'id' ? 'SENTUH LAYAR / TEKAN SPACE UNTUK LOMPAT' : 'TAP SCREEN / PRESS SPACE TO JUMP'}
                  </p>
                  <p className="text-[10px] text-zinc-400 font-mono">
                    {lang === 'id' ? 'Hindari pohon kaktus & burung' : 'Dodge cacti & pterodactyls'}
                  </p>
                </div>
              </div>
            )}

            {/* Game Over Screen Prompt */}
            {isGameOver && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm space-y-3 pointer-events-none">
                <div className="text-rose-400 font-mono text-xs font-bold tracking-widest">
                  G A M E  O V E R
                </div>
                <div className="text-center space-y-1">
                  <div className="text-sm font-bold text-white font-mono">
                    {lang === 'id' ? 'Skor Kamu:' : 'Score:'} <strong>{score}</strong>
                  </div>
                  <p className="text-[11px] text-zinc-400 font-mono">
                    {lang === 'id' ? 'Sentuh layar untuk main lagi' : 'Tap screen to restart'}
                  </p>
                </div>
                <div className="p-2 rounded-full bg-white text-black shadow-lg">
                  <RotateCcw className="w-4 h-4" />
                </div>
              </div>
            )}
          </div>

          {/* Simple Clean Guide Banner (No redundant jump/duck buttons) */}
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-1 px-1">
            <div className="flex items-center gap-2">
              <Touchpad className="w-3.5 h-3.5 text-zinc-400" />
              <span>{lang === 'id' ? 'Cukup tekan / sentuh layar game untuk loncat' : 'Tap anywhere on the game screen to jump'}</span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-zinc-500">
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-white/10 text-zinc-300 font-semibold text-[10px]">SPACE</kbd>
              <span>{lang === 'id' ? 'atau' : 'or'}</span>
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-white/10 text-zinc-300 font-semibold text-[10px]">↑</kbd>
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
};
