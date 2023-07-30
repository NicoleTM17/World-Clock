import { useState } from 'react';

// CSS:
import '../styles/Searchbar.css';


function Searchbar({ addClockCard }) {
  const [city, setCity] = useState('');
  const [searchError, setSearchError] = useState(false);

    // Mapping of city names to timezone strings
    const cityToTimezoneMap = {
      Berlin: 'Europe/Berlin',
      // Add more mappings here as needed
    };


  async function handleClick(event) {
    event.preventDefault();
    setSearchError(false);

    try {
      // Check if the city name is present in the mapping
      const timezone = cityToTimezoneMap[city];
      if (timezone) {
        const response = await fetch(`https://worldtimeapi.org/api/timezone/${timezone}`);
        const data = await response.json();

        const newClockCard = {
          city: city,
          time: formatTime(data.datetime, data.utc_offset, data.timezone),
          timeDifference: data.utc_offset,
        };
        addClockCard(newClockCard);
        setCity('');
        console.log('successful get request');
      } else {
        setCity('');
        setSearchError(true);
      }
    } catch (error) {
      console.error('Error fetching city data:', error);
      setSearchError(true);
    }
  }

  function handleChange(event) {
    const inputValue = event.target.value;
    const capitalizedCity = inputValue.charAt(0).toUpperCase() + inputValue.slice(1).toLowerCase(); // regardless, city is always written like this 'Berlin'
    setCity(capitalizedCity);
  }

  const formatTime = (datetime, utc_offset, timezone) => {
    const date = new Date(datetime);

    // Check if the utc_offset is valid and not undefined
    if (!utc_offset || typeof utc_offset !== 'string') {
      return 'Invalid UTC offset';
    }

    // Parse the datetime and apply the utc_offset to get the correct local time
    const localTime = new Date(date.getTime() - parseInt(utc_offset) * 1000);

    // Get the formatted time based on the timezone without AM/PM
    const timeOptions = { hour: '2-digit', minute: '2-digit', timeZone: timezone, hour12: false };
    const formattedTime = new Intl.DateTimeFormat('en-US', timeOptions).format(localTime);

    return formattedTime;
  };

  return (
    <div className='searchbar'>
      <form className='search-bar'>
        <input
          onChange={handleChange}
          className='search'
          type='text'
          placeholder='Enter a city...'
          value={city} // Bind the input value to the city state
        />
        <button onClick={handleClick} className='submit-btn' type='submit'>
          Search
        </button>
      </form>
      {searchError && <p className='results'>No results.</p>}
    </div>
  );
}

export default Searchbar;
