import Button from '@components/Button';

const Hero = () => {
  return (
    <section>
      <div>
        <p>Hey, There ! <br/>I'm <strong>Meyland</strong></p>
        <h1>Discover my projects and skills in development.</h1>

        <Button
            href="#contact"
            label="Contact me"
            image=""
            alt="Comment icon"
        />
      </div>
    </section>
  );
}

export default Hero;