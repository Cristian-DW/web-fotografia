import './App.css'
import Hero from './components/Hero';
import Nav from './components/Nav';
import About from './components/About';
import ContactForm from './components/Contact';
import Services from './components/Service';



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
        <ContactForm/>
      </main>
    </div>
  );
}

export default App;


