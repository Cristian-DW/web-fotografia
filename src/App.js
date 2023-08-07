
import './App.css';
import Background from './components/background';

import Hero from './components/hero';
import Nav from './components/nav';
import Social from './components/social';



function App() {
  return (
    <div className="App">
      <Nav />
      <Social/>
      
      <header className="header">
      <Background/>
      <Hero/>
      </header>
      
    </div>
  );
}

export default App;


