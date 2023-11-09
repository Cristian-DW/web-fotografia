import './App.css'
import About from './components/about';
import Nav from './components/Nav';
import Hero from './components/hero'
import ContactForm from './components/contact';
import Services from './components/service';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';





function App() {
  return (
    <div className="App">
      <Nav />
      <header className="header fixed top-0 left-0 w-screen "> 
        <Hero/>
      </header>
      <main className=' top-main md:relative md:top-[70rem]  lg:top-mainz -20  bg-fondo'>
        <About/>
        <Services/>
        <Gallery/>
        <Testimonials/>
        <ContactForm/>
      </main>
    </div>
  );
}

export default App;


