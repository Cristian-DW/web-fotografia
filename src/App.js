
import './App.css';
import Background from './components/background';
import Hero from './components/hero';
import Nav from './components/nav';
import Social from './components/social';
import About from './components/about';




function App() {
  return (
    <div className="App">
      <Nav />
      <Social/>
      <header className="header fixed top-0 left-0 w-screen ">
      <Background/>
      <Hero/>
      </header>
      <main className=' top-main z-20  bg-black text-white'>
        <About/>
      </main>
      
    </div>
  );
}

export default App;


