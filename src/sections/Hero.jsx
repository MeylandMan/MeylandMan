import { Leva } from 'leva';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useMediaQuery } from 'react-responsive';
import { PerspectiveCamera } from '@react-three/drei';

import Button from '@components/Button';
import { Desk } from '@components/Desk.jsx';

const Hero = () => {
  return (
    <section>
      <div>
        <p>Hey, There ! <br/>I'm <strong>Meyland</strong></p>
        <h1>Discover my projects and skills in development.</h1>

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