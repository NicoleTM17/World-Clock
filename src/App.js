// import logo from './logo.svg';


// CSS:
import './App.css';

// Google fonts:
import WebFont from 'webfontloader';

// Imports:
import Map from './components/Map.js';
import CurrentData from './components/CurrentData';
import Cards from './components/Cards';
import Searchbar from './components/Searchbar';

WebFont.load({
  google: {
    families: [
      'Inter:200,600',
      'Montserrat:200',
      'Noto+Sans:ital,wght@0,200;0,600;1,300',
      'PT+Serif:700',
      'Playfair+Display:400,700',
      'Quicksand',
      'Space+Grotesk:wght@300;400;500;600'
    ],
  },
});



function App() {
  return (
    <div className='container'>
      <h1 className='title'>World clock</h1>
      <Searchbar/>
      <Map/>
      <CurrentData/>
      <Cards/>
      <footer>© Copyright 2023 Nicole Moncrieffe</footer>
    </div>
  );
}

export default App;
