
import './App.css';
import Hero from './components/hero';
import Nav from './components/nav';


function App() {
  return (
    <div className="App">
      <Nav />
      <header className="App-header">
      <Hero/>
      </header>
    </div>
  );
}

export default App;
