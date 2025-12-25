import { Leva } from 'leva';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useMediaQuery } from 'react-responsive';
import { PerspectiveCamera } from '@react-three/drei';

import Button from '@components/Button';
import { Desk } from '@components/Desk.jsx';

const Hero = () => {
  return (
    <section className="min-h-screen w-full flex flex-col relative" id="/">
      <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3">
        <p className="sm:text-3xl text-xl font-medium text-white text-center">
          Hey, There ! <br/>I'm <strong>Meyland </strong>
          <span className="waving-hand">👋</span>
        </p>
        <h1 className="hero-tag text-gray-gradient">
          Discover my projects and <br/>skills in development.
        </h1>

        <Button
            href="#contact"
            label="Contact me"
            image="/assets/comment-icon.svg"
            width={32}
            height={32}
            alt="Comment icon"
        />
      </div>
    </section>
  );
}

export default Hero;