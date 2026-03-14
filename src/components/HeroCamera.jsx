import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { useLoaderContext } from './LoaderContext';

/**
 * HeroCamera — no zoom animation.
 * Just holds the normal hero position and handles mouse parallax once done.
 * The reveal is handled by GlitchReveal (CSS animation in App.jsx).
 */
const HeroCamera = ({ isMobile, children }) => {
  const group = useRef();
  const { phase, setPhase } = useLoaderContext();
  const triggered = useRef(false);

  const HERO_POS = [0, 0, 20];

  useFrame((state, delta) => {
    if (!group.current) return;

    // When zooming phase starts, immediately mark done after 1 frame
    // so the glitch+reveal CSS animation can take over
    if (phase === 'zooming' && !triggered.current) {
      triggered.current = true;
      // Small delay so the texture swap is visible before reveal
      setTimeout(() => setPhase('done'), 80);
    }

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
