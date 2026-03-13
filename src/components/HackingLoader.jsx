import { useEffect, useRef, useState, useCallback } from 'react';
import { useLoaderContext } from './LoaderContext';
import './HackingLoader.css';

/* ─────────────────────────────────────────────────────────────
   Boot lines
───────────────────────────────────────────────────────────── */
const BOOT_LINES = [
  { text: '> Initializing MeylandMan Portfolio v2.0...', delay: 0 },
  { text: '> Loading system modules...', delay: 380 },
  { text: '> [OK] React 18 renderer loaded', delay: 750 },
  { text: '> [OK] Three.js WebGL context established', delay: 1100 },
  { text: '> Connecting to MongoDB Atlas...', delay: 1550 },
  { text: '> AUTH handshake... ████████ 100%', delay: 2050 },
  { text: '> [OK] Database connection established', delay: 2500 },
  { text: '> Fetching /api/projects ............. done', delay: 2900 },
  { text: '> Fetching /api/formations ........... done', delay: 3250 },
  { text: '> Fetching /api/experiences .......... done', delay: 3600 },
  { text: '> Parsing BSON documents... ██████████ 100%', delay: 4000 },
  { text: '> Loading 3D assets: desk.glb', delay: 4400 },
  { text: '> Compiling GLSL shaders... ████████░░ 80%', delay: 4750 },
  { text: '> Compiling GLSL shaders... ██████████ 100%', delay: 5100 },
  { text: '> [OK] 3D model fully loaded', delay: 5450 },
  { text: '> All systems nominal. Launching...', delay: 5800 },
];

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*<>/\\|[]{}';

function scramble(target, progress) {
  return target
    .split('')
    .map((char, i) => {
      if (char === ' ') return ' ';
      if (i / target.length < progress) return char;
      return CHARS[Math.floor(Math.random() * CHARS.length)];
    })
    .join('');
}

/* ─────────────────────────────────────────────────────────────
   Single typed line
───────────────────────────────────────────────────────────── */
function TerminalLine({ text, startDelay, onDone }) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted]     = useState(false);
  const rafRef       = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStarted(true);
      startTimeRef.current = performance.now();
      const duration = Math.min(550, text.length * 17);

      function tick(now) {
        const progress = Math.min((now - startTimeRef.current) / duration, 1);
        setDisplayed(scramble(text, progress));
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setDisplayed(text);
          onDone?.();
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    }, startDelay);

    return () => { clearTimeout(timeout); cancelAnimationFrame(rafRef.current); };
  }, [text, startDelay]);

  if (!started) return null;

  return (
    <div className="hl-line">
      <span className="hl-text">{displayed}</span>
      {displayed !== text && <span className="hl-cursor">█</span>}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   HackingLoader
───────────────────────────────────────────────────────────── */
export default function HackingLoader({ isReady, onZoomStart }) {
  const { canvasRef, setPhase } = useLoaderContext();

  const [linesTyped, setLinesTyped] = useState(0);
  const [hidden, setHidden]         = useState(false);
  const triggered = useRef(false);

  const terminalCanvasRef = useRef(null);

  const handleLineDone = useCallback((i) => {
    setLinesTyped((v) => Math.max(v, i + 1));
  }, []);

  /* ── Draw terminal content onto an off-screen canvas for texture ── */
  const snapshotToCanvas = useCallback(() => {
    const dest = terminalCanvasRef.current;
    if (!dest) return;

    const W = 1024, H = 512;
    dest.width  = W;
    dest.height = H;
    const ctx = dest.getContext('2d');

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H);

    ctx.font        = '14px "Courier New", monospace';
    ctx.fillStyle   = '#00e060';
    ctx.shadowColor = 'rgba(0,224,96,0.55)';
    ctx.shadowBlur  = 10;

    const lineH  = 26;
    const startY = 40;
    const startX = 32;

    BOOT_LINES.forEach((line, i) => {
      ctx.fillText(line.text, startX, startY + i * lineH);
    });
    ctx.fillText('\u2588', startX, startY + BOOT_LINES.length * lineH);

    ctx.shadowBlur = 0;
    for (let y = 0; y < H; y += 4) {
      ctx.fillStyle = 'rgba(0,0,0,0.10)';
      ctx.fillRect(0, y, W, 2);
    }

    canvasRef.current = dest;
  }, [canvasRef]);

  /* ── Exit trigger ── */
  useEffect(() => {
    if (isReady && linesTyped >= BOOT_LINES.length && !triggered.current) {
      triggered.current = true;
      setTimeout(() => {
        snapshotToCanvas();
        setHidden(true);
        setPhase('zooming');
        onZoomStart?.();
      }, 600);
    }
  }, [isReady, linesTyped, snapshotToCanvas, setPhase, onZoomStart]);

  if (hidden) return null;

  return (
    <div className="hl-overlay">
      <div className="hl-crt" />

      <div className="hl-content">
        {BOOT_LINES.map((line, i) => (
          <TerminalLine
            key={i}
            text={line.text}
            startDelay={line.delay}
            onDone={() => handleLineDone(i)}
          />
        ))}
        {linesTyped >= BOOT_LINES.length && (
          <div className="hl-line">
            <span className="hl-cursor blink">\u2588</span>
          </div>
        )}
      </div>

      <div className="hl-progress-track">
        <div
          className="hl-progress-fill"
          style={{ width: `${Math.round((linesTyped / BOOT_LINES.length) * 100)}%` }}
        />
      </div>

      <canvas ref={terminalCanvasRef} style={{ display: 'none' }} />
    </div>
  );
}
