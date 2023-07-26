import { useState } from 'react';

// CSS:
import '../styles/Searchbar.css';

function Searchbar({cityValue}) {

  // When a user enters a city e.g. Berlin and clicks the search button, the api should fetch
  // the city, time difference and time, and store it all in a clock-card. The format should be the same as
  // the default cities.
  // Preferably, each fetched data would appear in a clock-card at the bottom of the clock-cards.
  // Optional: Eventually I would also like to include the ability to delete clock-cards.

  const [city, setCity] = useState(''); // state variable for city with empty string

  function handleClick(event) {
    event.preventDefault();
    // console.log('clicked!');
    cityValue(city); // cityValue is our prop passing the value of city e.g. Berlin

    setCity(''); // resets city to empty string so new city can be entered
  }

  function handleChange(event) {
    setCity(event.target.value); // city empty string updated with value typed in
  }


  return(
    <div className='searchbar'>

      <form className='search-bar'>
        <input onChange={handleChange}
          className='search'
          type='text'
          placeholder='Enter a city...'
        />
        <button onClick={handleClick}
        className='submit-btn'
        type='submit'
        >Search
        </button>
      </form>
      <p className='results results-hidden'>No results.</p>
    </div>
  );
}


export default Searchbar;
