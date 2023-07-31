import { useState } from 'react';

// CSS:
import '../styles/Searchbar.css';


function Searchbar({ addNewClockCard, cityToTimezoneMap }) {
  const [city, setCity] = useState('');
  const [searchError, setSearchError] = useState(false);
  const [searchSuccess, setSearchSuccess] = useState(false);


  async function handleClick(event) {
    event.preventDefault();
    setSearchError(false);

    try {
      // Check if the city name is present in the mapping
      const timezone = cityToTimezoneMap[city];
      if (timezone) {
        const response = await fetch(`https://worldtimeapi.org/api/timezone/${timezone}`);
        const data = await response.json();
        // console.log('Fetched data:', data);

        const newCardData = {
          city: timezone.split('/').pop().replace('_', ' '),
          time: formatTime(data.datetime, data.utc_offset, data.timezone),
          timeDifference: data.utc_offset,
        };

        addNewClockCard(newCardData);
          // alert(`${city} added!`);
          setSearchSuccess(true);
          setCity('');
          // console.log(`https://worldtimeapi.org/api/timezone/${timezone}`);


      } else {
        setSearchError(true);
        setCity('');
      }
    } catch (error) {
      console.error('Error fetching city data:', error);
      setSearchError(true);
    }
  }

  function handleChange(event) {
    const inputValue = event.target.value;
    // const capitalizedCity = inputValue.replace(/(^|\s)\S/g, (match) => match.toUpperCase()); // regardless, city is always written like this 'Berlin'
    // setCity(capitalizedCity);
    const camelCaseCity = inputValue.replace(/(^|\s+)(\w)/g, (match, space, letter) => letter.toUpperCase());
    setCity(camelCaseCity);

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
    let formattedTime = new Intl.DateTimeFormat('en-US', timeOptions).format(localTime);

    if (formattedTime.slice(0, 2) === '24') {
      formattedTime = '00' + formattedTime.slice(2);
    }

    return formattedTime;
  };

  let results = '';

  if (searchError === true) {
    results = 'No results.';
  } else if (searchSuccess === true) {
    results = 'City added!';
  } else {
    results = '';
  };

  return (
    <div className='searchbar'>
      {/* {showAlert && (
        <CAlert color="dark" dismissible onClose={() => setShowAlert(false)}>
          <strong>Go right ahead</strong> and click that dismiss over there on the right.
        </CAlert>
      )} */}
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
      <p className='results'>{results}</p>
    </div>
  );
}

export default Searchbar;
