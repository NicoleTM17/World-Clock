import { useState } from 'react';

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

  const [clockCards, setClockCards] = useState([]);

  const addClockCard = (newCard) => {
    setClockCards((prevCards) => [...prevCards, newCard]);
  };

  return (
    <div className='container'>
      <h1 className='title'>World clock</h1>
      <Searchbar addClockCard={addClockCard}/>
      <Map/>
      <CurrentData/>
      <Cards clockCards={clockCards}/>
      <footer>© Copyright 2023 Nicole Moncrieffe</footer>
    </div>
  );
}

export default App;
