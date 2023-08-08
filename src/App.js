
import './App.css';
import Background from './components/background';
import Hero from './components/hero';
import Nav from './components/nav';
import Social from './components/social';
import About from './components/about';
import Education from './components/education';
import Skills from './components/skills';




function App() {
  return (
    <div className="App">
      <Nav />
      <Social/>
      <header className="header fixed top-0 left-0 w-screen ">
      <Background/>
      <Hero/>
      </header>
      <main className=' top-main z-20  bg-fondo'>
        <About/>
        <Skills/>
        <Education/>
      </main>
      
    </div>
  );
}

export default App;


