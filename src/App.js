
import './App.css'
import Hero from './components/hero';
import Nav from './components/nav';
import About from './components/about';
import Education  from './components/education';
import Skills from './components/skills';
import Project from './components/project';
import ContactForm from './components/contact';





function App() {
  return (
    <div className="App">
      <Nav />
      <header className="header fixed top-0 left-0 w-screen "> 
      <Hero/>
      </header>
      <main className=' top-main md:relative md:top-[70rem]  lg:top-mainz -20  bg-fondo'>
        <About/>
        <Skills/>
        <Education/>
        <Project/>
        <ContactForm/>
      </main>
    </div>
  );
}

export default App;


