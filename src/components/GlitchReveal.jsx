import { useEffect, useRef, useState } from 'react';
import './GlitchReveal.css';

/**
 * GlitchReveal
 * 
 * Triggered when phase switches from 'zooming' → 'done'.
 * Plays a 3-beat screen glitch on the monitor texture, then a
 * full-page scanline sweep that reveals the site from top to bottom.
 * 
 * Props:
 *   active   — boolean, mount when you want the animation to start
 *   onDone   — called when the reveal finishes
 */
export default function GlitchReveal({ active, onDone }) {
  const [stage, setStage] = useState('idle'); // idle | glitch | sweep | done
  const called = useRef(false);

  useEffect(() => {
    if (!active || called.current) return;
    called.current = true;

    // Beat 1-3: glitch pulses on the screen overlay
    setStage('glitch');

    // After glitches (~900ms), start the sweep
    setTimeout(() => {
      setStage('sweep');
      // After sweep finishes (~900ms), call done
      setTimeout(() => {
        setStage('done');
        onDone?.();
      }, 950);
    }, 900);
  }, [active, onDone]);

  if (stage === 'idle' || stage === 'done') return null;

  return (
    <>
      {/* Glitch overlay — flickers over the whole page */}
      {stage === 'glitch' && (
        <div className="gr-glitch-overlay" aria-hidden="true">
          <div className="gr-glitch-r" />
          <div className="gr-glitch-g" />
          <div className="gr-glitch-b" />
          {/* Horizontal glitch bars */}
          <div className="gr-bars" />
        </div>
      )}

      {/* Sweep — a bright scanline that descends and reveals the page */}
      {stage === 'sweep' && (
        <div className="gr-sweep-overlay" aria-hidden="true">
          <div className="gr-sweep-line" />
          {/* The mask that starts full-black and retracts downward */}
          <div className="gr-sweep-mask" />
        </div>
      )}
    </>
  );
}
