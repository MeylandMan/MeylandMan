import { Leva } from 'leva';
import { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useMediaQuery } from 'react-responsive';
import { PerspectiveCamera } from '@react-three/drei';

import Button from '@components/Button';
import { calculateSizes } from '@constants/index';
import { Desk } from '@components/Desk.jsx';
import HeroCamera from '@components/HeroCamera.jsx';
import { useLoaderContext } from '@components/LoaderContext';

const DeskScene = ({ sizes, isMobile, onModelLoaded }) => {
  const deskPos   = sizes.deskPosition;
  const groundPos = [deskPos[0], deskPos[1] - 1.5, deskPos[2]];

  useEffect(() => { onModelLoaded?.(); }, []);

  return (
    <>
      <Leva hidden />
      <PerspectiveCamera makeDefault position={[0, 0, 30]} />
      <HeroCamera isMobile={isMobile}>
        <Desk
          scale={sizes.deskScale}
          position={sizes.deskPosition}
          rotation={[0.1, -Math.PI / 2, 0]}
        />
      </HeroCamera>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={groundPos} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <shadowMaterial transparent opacity={0.35} />
      </mesh>
      <ambientLight intensity={0.5} />
      <directionalLight
        castShadow
        position={[10, 20, 10]}
        intensity={0.8}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />
    </>
  );
};

const Hero = ({ onModelLoaded }) => {
  const { phase } = useLoaderContext();
  const isSmall   = useMediaQuery({ maxWidth: 440 });
  const isMobile  = useMediaQuery({ maxWidth: 768 });
  const isTablet  = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const sizes     = calculateSizes(isSmall, isMobile, isTablet);

  const isDone = phase === 'done';

  return (
    <section className="min-h-screen w-full flex flex-col relative" id="/">

      {/* Hero text — only shown after reveal */}
      {isDone && (
        <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3">
          <p className="sm:text-3xl text-xl font-medium text-white text-center">
            Hey, There !&nbsp;<br />I'm <strong>Meyland </strong>
            <span className="waving-hand">👋</span>
          </p>
          <h1 className="hero-tag text-gray-gradient">
            Learn more about my projects and skills
          </h1>
        </div>
      )}

      {/* 3D Canvas — always mounted */}
      <div className="w-full h-full absolute inset-0">
        <Canvas className="w-full h-full" shadows dpr={[1, 2]}>
          <Suspense fallback={null}>
            <DeskScene
              sizes={sizes}
              isMobile={isMobile}
              onModelLoaded={onModelLoaded}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Contact button */}
      {isDone && (
        <div className="absolute bottom-7 left-0 right-0 w-full z-10 c-space">
          <a href="#contact" className="w-fit">
            <Button name="Contact me !" isBeam containerClass="sm:w-fit w-full sm:min-w-96" />
          </a>
        </div>
      )}
    </section>
  );
};

export default Hero;
