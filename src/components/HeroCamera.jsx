import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { useLoaderContext } from './LoaderContext';

/**
 * HeroCamera — cinematic zoom sequence
 *
 * When phase becomes 'zooming':
 *   1. ZOOM IN  (1s, ease-in cubic)  — camera dives toward the monitor screen
 *   2. HOLD     (0.2s)               — brief pause right in front of the screen
 *   3. ZOOM OUT (2.5s, ease-out quintic) — dramatic pull-back revealing the full scene
 *
 * setPhase('done') is called only at the very end of zoom-out, which triggers
 * Hero to leave fixed positioning and the rest of the site to fade in.
 */
const HeroCamera = ({ isMobile, children }) => {
  const group = useRef();
  const { phase, setPhase } = useLoaderContext();

  const zoomStartRef = useRef(null);

  // ── Positions ──────────────────────────────────────────────
  // Normal hero camera resting position
  const HERO_POS = [0, 0, 20];
  // Just in front of the monitor screen face
  // (monitor world coords at deskScale 0.24 ≈ y:6.2, pushed slightly forward on z)
  const SCREEN_POS = [0, 6.2, 1.5];

  // ── Timing ─────────────────────────────────────────────────
  const T_IN   = 1.0;   // zoom-in duration  (s)
  const T_HOLD = 0.2;   // hold duration     (s)
  const T_OUT  = 2.5;   // zoom-out duration (s)

  useFrame((state, delta) => {
    if (!group.current) return;

    /* ── ZOOM SEQUENCE ── */
    if (phase === 'zooming') {
      // First frame: initialise timer, snap camera to hero position
      if (zoomStartRef.current === null) {
        zoomStartRef.current = state.clock.elapsedTime;
        state.camera.position.set(...HERO_POS);
      }

      const elapsed = state.clock.elapsedTime - zoomStartRef.current;

      if (elapsed < T_IN) {
        /* Phase 1 — ZOOM IN */
        const t    = elapsed / T_IN;
        const ease = t * t * t;           // ease-in cubic
        state.camera.position.set(
          HERO_POS[0] + (SCREEN_POS[0] - HERO_POS[0]) * ease,
          HERO_POS[1] + (SCREEN_POS[1] - HERO_POS[1]) * ease,
          HERO_POS[2] + (SCREEN_POS[2] - HERO_POS[2]) * ease,
        );
        state.camera.lookAt(0, 6.2, 0);

      } else if (elapsed < T_IN + T_HOLD) {
        /* Phase 2 — HOLD */
        state.camera.position.set(...SCREEN_POS);
        state.camera.lookAt(0, 6.2, 0);

      } else {
        /* Phase 3 — ZOOM OUT */
        const outElapsed = elapsed - T_IN - T_HOLD;
        const t          = Math.min(outElapsed / T_OUT, 1);
        const ease       = 1 - Math.pow(1 - t, 5); // ease-out quintic

        state.camera.position.set(
          SCREEN_POS[0] + (HERO_POS[0] - SCREEN_POS[0]) * ease,
          SCREEN_POS[1] + (HERO_POS[1] - SCREEN_POS[1]) * ease,
          SCREEN_POS[2] + (HERO_POS[2] - SCREEN_POS[2]) * ease,
        );
        state.camera.lookAt(0, 0, 0);

        // Only mark done when zoom-out is fully complete
        if (t >= 1) {
          setPhase('done');
          zoomStartRef.current = null;
        }
      }

      return; // skip normal frame logic during zoom
    }

    /* ── NORMAL — mouse parallax ── */
    easing.damp3(state.camera.position, HERO_POS, 0.25, delta);

    if (!isMobile) {
      easing.dampE(
        group.current.rotation,
        [-state.pointer.y / 3, state.pointer.x / 5, 0],
        0.25,
        delta,
      );
    }
  });

  return <group ref={group}>{children}</group>;
};

export default HeroCamera;
