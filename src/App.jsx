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
import { LoaderContext } from '@components/LoaderContext';
import fetchData from '@apis/server';

function App() {
  // ── Loader context state ───────────────────────────────────
  // 'loading' → 'zooming' → 'done'
  const [phase, setPhase]     = useState('loading');
  const canvasRef             = useRef(null);   // terminal canvas snapshot

  // ── Async loading flags ────────────────────────────────────
  const [dbDone, setDbDone]       = useState(false);
  const [modelDone, setModelDone] = useState(false);
  const [isReady, setIsReady]     = useState(false);

  // ── Site visibility ────────────────────────────────────────
  // Reveal the full site once zoom animation completes
  const siteVisible = phase === 'done';

  // ── 1. Prefetch MongoDB data ───────────────────────────────
  useEffect(() => {
    Promise.allSettled(
      ['projects', 'formations', 'experiences'].map((ep) => fetchData(ep))
    ).then(() => setDbDone(true));
  }, []);

  // ── 2. 3D model ready callback ─────────────────────────────
  const handleModelLoaded = useCallback(() => setModelDone(true), []);

  // ── 3. Both ready → unlock the exit sequence ──────────────
  useEffect(() => {
    if (dbDone && modelDone) setIsReady(true);
  }, [dbDone, modelDone]);

  // ── 4. Hard timeout (8 s) to avoid infinite blocking ──────
  useEffect(() => {
    const id = setTimeout(() => setIsReady(true), 8000);
    return () => clearTimeout(id);
  }, []);

  // ── 5. onZoomStart: called by HackingLoader right before the
  //       2D overlay fades — sets phase to 'zooming' ─────────
  const handleZoomStart = useCallback(() => {
    // phase is set inside HackingLoader via setPhase('zooming')
    // nothing extra needed here, kept for extensibility
  }, []);

  return (
    <LoaderContext.Provider value={{ canvasRef, phase, setPhase }}>
      {/* ── 2D hacking terminal overlay ── */}
      {phase !== 'done' && (
        <HackingLoader isReady={isReady} onZoomStart={handleZoomStart} />
      )}

      {/* ── Main site ── */}
      {/*
        The Canvas (inside Hero) is ALWAYS mounted even during loading
        so Three.js can preload desk.glb in the background.
        We show it immediately but make the rest of the site fade in
        only when the zoom finishes.
      */}
      <div
        style={{
          // Keep hero always visible (3D canvas shows during zoom)
          // Fade in the rest of the page only after zoom done
        }}
      >
        <div
          style={{
            opacity: siteVisible ? 1 : 0,
            transition: 'opacity 0.5s ease',
            pointerEvents: siteVisible ? 'auto' : 'none',
          }}
        >
          <NavBar />
        </div>

        {/* Hero is always visible — the 3D canvas lives here */}
        <Hero onModelLoaded={handleModelLoaded} />

        <div
          style={{
            opacity: siteVisible ? 1 : 0,
            transition: 'opacity 0.6s ease 0.2s',
            pointerEvents: siteVisible ? 'auto' : 'none',
          }}
        >
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