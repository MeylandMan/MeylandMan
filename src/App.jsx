import NavBar from '@sections/NavBar';
import Hero from '@sections/Hero';
import About from '@sections/About';
import Formation from '@sections/Formation';
import Experience from '@sections/Experience';
import Projects from '@sections/Projects';
import DevTools from '@sections/DevTools';
import DevSkills from '@sections/DevSkills';
import Footer from '@sections/Footer';


/*
<About/>
<Experience />

<Footer />
*/

function App() {
  return (
    <>
    <NavBar />
    <Hero/>
    <Formation />
    <Experience />
    <Projects />
    <DevTools />
    <DevSkills />
    </>
  );
}

export default App;