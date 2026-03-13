import { createContext, useContext } from 'react';

/**
 * Shared context between HackingLoader (2D) and the 3D scene.
 *
 * canvasRef     — ref to the off-screen <canvas> that the terminal renders into
 * phase         — 'loading' | 'transferring' | 'zooming' | 'done'
 * setPhase      — setter
 */
export const LoaderContext = createContext({
  canvasRef: { current: null },
  phase: 'loading',
  setPhase: () => {},
});

export const useLoaderContext = () => useContext(LoaderContext);
