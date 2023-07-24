// import logo from './logo.svg';


// CSS:
import './App.css';


// Imports:
import Map from './components/Map.js';
import CurrentData from './components/CurrentData';
import Cards from './components/Cards';


function App() {
  return (
    <div className='container'>
      <h1 className='title'>World clock</h1>
      <Map/>
      <CurrentData/>
      <Cards/>
      <footer>© Copyright 2023 Nicole Moncrieffe</footer>
    </div>
  );
}

export default App;
