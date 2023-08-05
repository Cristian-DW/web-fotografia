
import './App.css';
import Hero from './components/hero';
import Nav from './components/nav';
import Social from './components/social';



function App() {
  return (
    <div className="App">
      <Nav />
      <Social/>
      <header className="App-header">
      <Hero/>
      </header>
    </div>
  );
}

export default App;


