import { useState, useEffect, useCallback, useRef } from 'react';

import NavBar from '@sections/NavBar';
import Hero from '@sections/Hero';
import Formation from '@sections/Formation';
import Experience from '@sections/Experience';
import Projects from '@sections/Projects';
import DevTools from '@sections/DevTools';
import DevSkills from '@sections/DevSkills';
import Contact from '@sections/Contact';
import Footer from '@sections/Footer';

import HackingLoader from '@components/HackingLoader';
import GlitchReveal from '@components/GlitchReveal';
import { LoaderContext } from '@components/LoaderContext';
import fetchData from '@apis/server';

function App() {
  // 'loading' → 'zooming' (texture applied) → 'done' (site visible)
  const [phase, setPhase] = useState('loading');
  const canvasRef         = useRef(null);

  const [dbDone, setDbDone]       = useState(false);
  const [modelDone, setModelDone] = useState(false);
  const [isReady, setIsReady]     = useState(false);

  // GlitchReveal fires when phase hits 'done', then we show the site
  const [siteVisible, setSiteVisible] = useState(false);

  // ── 1. Prefetch MongoDB data ───────────────────────────────
  useEffect(() => {
    Promise.allSettled(
      ['projects', 'formations', 'experiences'].map((ep) => fetchData(ep))
    ).then(() => setDbDone(true));
  }, []);

  // ── 2. 3D model ready ─────────────────────────────────────
  const handleModelLoaded = useCallback(() => setModelDone(true), []);

  // ── 3. Both ready ─────────────────────────────────────────
  useEffect(() => {
    if (dbDone && modelDone) setIsReady(true);
  }, [dbDone, modelDone]);

  // ── 4. Hard timeout 8s ────────────────────────────────────
  useEffect(() => {
    const id = setTimeout(() => setIsReady(true), 8000);
    return () => clearTimeout(id);
  }, []);

  // ── 5. After glitch+sweep animation finishes → show site ──
  const handleRevealDone = useCallback(() => {
    setSiteVisible(true);
  }, []);

  const isZooming = phase === 'zooming' || phase === 'done';

  return (
    <LoaderContext.Provider value={{ canvasRef, phase, setPhase }}>

      {/* ── 2D terminal loader ── */}
      {phase === 'loading' && (
        <HackingLoader isReady={isReady} />
      )}

      {/* ── Glitch + sweep reveal ── fires once phase hits 'done' ── */}
      <GlitchReveal active={phase === 'done'} onDone={handleRevealDone} />

      {/* ── Main site ── */}
      <div>
        {/* NavBar + rest of site — hidden until reveal finishes */}
        <div style={{
          opacity: siteVisible ? 1 : 0,
          transition: 'opacity 0.4s ease',
          pointerEvents: siteVisible ? 'auto' : 'none',
        }}>
          <NavBar />
        </div>

        {/* Hero always mounted (3D Canvas preloads underneath loader) */}
        <Hero onModelLoaded={handleModelLoaded} siteVisible={siteVisible} />

        <div style={{
          opacity: siteVisible ? 1 : 0,
          transition: 'opacity 0.5s ease 0.15s',
          pointerEvents: siteVisible ? 'auto' : 'none',
        }}>
          <Formation />
          <Experience />
          <Projects />
          <DevTools />
          <DevSkills />
          <Contact />
          <Footer />
        </div>
      </div>

    </LoaderContext.Provider>
  );
}

export default App;
